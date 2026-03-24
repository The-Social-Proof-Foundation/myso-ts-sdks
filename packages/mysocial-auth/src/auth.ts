// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import { mitt, type Emitter } from '@socialproof/utils';
import type {
	MySocialAuthConfig,
	SignInOptions,
	Session,
	AuthStateChangeCallback,
} from './types.js';
import { createStorage, redirectStorage, SESSION_KEY, REDIRECT_STATE_PREFIX } from './storage.js';
import { openAuthPopup } from './popup.js';
import { refreshTokens, logout, fetchRequestId } from './exchange.js';
import { generateState, generateNonce } from './pkce.js';
import { SessionRevokedError } from './errors.js';
import { WALLET_ONLY_ACCESS_TOKEN } from './types.js';

type AuthEvents = { change: Session | null };

/** Refresh when token expires within this many ms (1-2 min buffer) */
const REFRESH_BUFFER_MS = 120_000;

export interface MySocialAuth {
	signIn(options?: SignInOptions): Promise<Session>;
	signOut(): Promise<void>;
	getSession(): Promise<Session | null>;
	refresh(): Promise<Session | null>;
	handleRedirectCallback(url?: string): Promise<Session>;
	onAuthStateChange(callback: AuthStateChangeCallback): () => void;
	/** Returns token for Authorization: Bearer. Refreshes if expired. Use for /salt and protected endpoints. */
	getAccessTokenForApi(): Promise<string | undefined>;
}

function getReturnOrigin(redirectUri: string): string {
	try {
		const u = new URL(redirectUri);
		return `${u.protocol}//${u.host}`;
	} catch {
		return '';
	}
}

/** Decode JWT payload (no signature verification). */
function parseJwtPayload(jwt: string): { sub?: string; exp?: number } | undefined {
	try {
		const parts = jwt.split('.');
		if (parts.length !== 3) return undefined;
		const payload = parts[1];
		if (!payload) return undefined;
		const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
		const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=');
		const decoded = atob(padded);
		const parsed = JSON.parse(decoded) as { sub?: string; exp?: number };
		return parsed;
	} catch {
		return undefined;
	}
}

/** Extract sub claim from JWT payload. No signature verification (auth server already validated). */
function extractSubFromJwt(jwt: string): string | undefined {
	return parseJwtPayload(jwt)?.sub;
}

/** Expiry time (ms) for API Bearer JWT from session_access_token `exp` claim, if decodable. */
function getSessionJwtExpiryMs(session: Session): number | undefined {
	const jwt = session.session_access_token;
	if (!jwt) return undefined;
	const exp = parseJwtPayload(jwt)?.exp;
	if (typeof exp !== 'number' || !Number.isFinite(exp)) return undefined;
	return exp * 1000;
}

/**
 * Earliest of session.expires_at and session JWT exp, when JWT exp is present.
 * Aligns refresh with actual Bearer validity when the server sends a longer expires_in than the JWT.
 */
function getEffectiveExpiryMs(session: Session): number {
	const jwtMs = getSessionJwtExpiryMs(session);
	if (jwtMs != null) {
		return Math.min(session.expires_at, jwtMs);
	}
	return session.expires_at;
}

export function createAuth(config: MySocialAuthConfig): MySocialAuth {
	const storage = createStorage(config.storage);
	const emitter: Emitter<AuthEvents> = mitt<AuthEvents>();

	let cachedSession: Session | null = null;
	let refreshPromise: Promise<Session | null> | null = null;
	let proactiveRefreshTimer: number | null = null;

	function clearProactiveRefreshTimer() {
		if (proactiveRefreshTimer != null) {
			clearTimeout(proactiveRefreshTimer);
			proactiveRefreshTimer = null;
		}
	}

	function scheduleProactiveRefresh() {
		clearProactiveRefreshTimer();
		if (!config.proactiveRefresh || typeof window === 'undefined') return;
		const raw = storage.get(SESSION_KEY);
		if (!raw) return;
		let session: Session;
		try {
			session = JSON.parse(raw) as Session;
		} catch {
			return;
		}
		if (!session.refresh_token) return;
		const effective = getEffectiveExpiryMs(session);
		const delay = effective - Date.now() - REFRESH_BUFFER_MS;
		const run = () => {
			proactiveRefreshTimer = null;
			void loadSession().then((s) => {
				if (s && config.proactiveRefresh) {
					scheduleProactiveRefresh();
				}
			});
		};
		proactiveRefreshTimer = window.setTimeout(run, Math.max(0, delay));
	}

	async function doRefresh(session: Session): Promise<Session | null> {
		try {
			const refreshed = await refreshTokens(config.apiBaseUrl, session.refresh_token!);
			const merged = mergeRefreshedSession(refreshed, session);
			await saveSession(merged);
			emitter.emit('change', merged);
			return merged;
		} catch (err) {
			if (err instanceof SessionRevokedError) {
				clearProactiveRefreshTimer();
				storage.remove(SESSION_KEY);
				cachedSession = null;
				emitter.emit('change', null);
				return null;
			}
			throw err;
		} finally {
			refreshPromise = null;
		}
	}

	async function loadSession(): Promise<Session | null> {
		const raw = storage.get(SESSION_KEY);
		if (!raw) return null;
		try {
			const session = JSON.parse(raw) as Session;
			// Ensure sub is present (handles legacy sessions saved before sub was added)
			if (session.sub === undefined) {
				session.sub = session.user?.sub ?? session.user?.id ?? '';
			}
			if (!session.sub && session.id_token) {
				const subFromJwt = extractSubFromJwt(session.id_token);
				if (subFromJwt) {
					session.sub = subFromJwt;
					if (session.user) session.user.sub = subFromJwt;
					await saveSession(session);
				}
			}
			const now = Date.now();
			const effective = getEffectiveExpiryMs(session);
			const expiresWithinBuffer = effective - now < REFRESH_BUFFER_MS;
			if (effective > now && !expiresWithinBuffer) {
				if (config.proactiveRefresh) {
					scheduleProactiveRefresh();
				}
				return session;
			}
			if (session.refresh_token) {
				if (refreshPromise) {
					return refreshPromise;
				}
				refreshPromise = doRefresh(session);
				return refreshPromise;
			}
			clearProactiveRefreshTimer();
			storage.remove(SESSION_KEY);
			cachedSession = null;
			emitter.emit('change', null);
			return null;
		} catch {
			clearProactiveRefreshTimer();
			storage.remove(SESSION_KEY);
			cachedSession = null;
			refreshPromise = null;
			return null;
		}
	}

	/** Preserve id_token, salt, user, sub, session_access_token when refresh response omits them. */
	function mergeRefreshedSession(refreshed: Session, existing: Session): Session {
		return {
			...refreshed,
			id_token: refreshed.id_token ?? existing.id_token,
			salt: refreshed.salt ?? existing.salt,
			user:
				refreshed.user && Object.keys(refreshed.user).length > 0 ? refreshed.user : existing.user,
			sub: refreshed.sub || existing.sub,
			session_access_token: refreshed.session_access_token ?? existing.session_access_token,
		};
	}

	async function saveSession(session: Session): Promise<void> {
		cachedSession = session;
		storage.set(SESSION_KEY, JSON.stringify(session));
		if (config.proactiveRefresh) {
			scheduleProactiveRefresh();
		}
	}

	async function clearSession(): Promise<void> {
		cachedSession = null;
		storage.remove(SESSION_KEY);
	}

	if (config.proactiveRefresh && typeof document !== 'undefined') {
		document.addEventListener('visibilitychange', () => {
			if (document.visibilityState !== 'visible') return;
			void loadSession().then((s) => {
				if (s && config.proactiveRefresh) {
					scheduleProactiveRefresh();
				}
			});
		});
	}

	return {
		async signIn(options: SignInOptions = {}) {
			const mode = options.mode ?? 'popup';
			const provider = options.provider;

			if (mode === 'popup') {
				const session = await openAuthPopup({
					apiBaseUrl: config.apiBaseUrl,
					authOrigin: config.authOrigin,
					clientId: config.clientId,
					redirectUri: config.redirectUri,
					provider,
					timeout: config.popupTimeout ?? 120_000,
					useRequestId: config.useRequestId ?? false,
					onWalletCredentials: options.onWalletCredentials,
				});
				await saveSession(session);
				emitter.emit('change', session);
				return session;
			}

			// Redirect mode
			const state = generateState();
			const nonce = generateNonce();
			const returnOrigin = getReturnOrigin(config.redirectUri);

			let requestId: string | undefined;
			if (config.useRequestId) {
				requestId = await fetchRequestId(config.apiBaseUrl, {
					client_id: config.clientId,
					redirect_uri: config.redirectUri,
					return_origin: returnOrigin,
				});
			}

			const redirectState = {
				state,
				nonce,
				requestId,
			};
			const key = `${REDIRECT_STATE_PREFIX}${state}`;
			redirectStorage.set(key, JSON.stringify(redirectState));

			const params = new URLSearchParams({
				client_id: config.clientId,
				redirect_uri: config.redirectUri,
				state,
				nonce,
				return_origin: returnOrigin,
				mode: 'redirect',
				provider: provider ?? 'none',
				code_challenge_method: 'S256',
			});
			if (requestId) params.set('request_id', requestId);

			const loginUrl = `${config.authOrigin.replace(/\/$/, '')}/login?${params.toString()}`;
			window.location.href = loginUrl;

			return new Promise<Session>(() => {}); // Never resolves; page navigates away
		},

		async signOut() {
			let refreshToken: string | undefined;
			try {
				const raw = storage.get(SESSION_KEY);
				if (raw) {
					const session = JSON.parse(raw) as Session;
					refreshToken = session.refresh_token;
				}
			} catch {
				// Ignore parse errors
			}
			try {
				await logout(config.apiBaseUrl, refreshToken);
			} catch {
				// Best-effort; clear local state regardless
			}
			clearProactiveRefreshTimer();
			await clearSession();
			refreshPromise = null;
			emitter.emit('change', null);
		},

		async getSession() {
			const now = Date.now();
			if (cachedSession) {
				const effective = getEffectiveExpiryMs(cachedSession);
				if (effective > now && effective - now >= REFRESH_BUFFER_MS) {
					return cachedSession;
				}
			}
			return loadSession();
		},

		async refresh() {
			const session = await loadSession();
			if (!session?.refresh_token) return null;
			if (refreshPromise) return refreshPromise;
			refreshPromise = doRefresh(session);
			return refreshPromise;
		},

		async getAccessTokenForApi() {
			const session = await this.getSession();
			if (!session) return undefined;
			// Never return wallet-only sentinel or address as Bearer token
			if (session.access_token === WALLET_ONLY_ACCESS_TOKEN) return undefined;
			return (
				session.session_access_token ?? (session.refresh_token ? session.access_token : undefined)
			);
		},

		async handleRedirectCallback(url?: string) {
			const targetUrl = url ?? (typeof window !== 'undefined' ? window.location.href : '');
			const parsed = new URL(targetUrl);
			const code = parsed.searchParams.get('code');
			const state = parsed.searchParams.get('state');
			const nonce = parsed.searchParams.get('nonce');
			const requestId = parsed.searchParams.get('request_id') ?? undefined;
			const salt = parsed.searchParams.get('salt') ?? undefined;
			const userParam = parsed.searchParams.get('user');

			// Tokens are in hash fragment (#access_token=...&id_token=...), not query params
			const hashParams = new URLSearchParams(parsed.hash?.slice(1) || '');
			const accessToken = hashParams.get('access_token') ?? parsed.searchParams.get('access_token');
			const sessionAccessToken =
				hashParams.get('session_access_token') ?? parsed.searchParams.get('session_access_token');
			const idToken = hashParams.get('id_token') ?? parsed.searchParams.get('id_token');
			const refreshToken =
				hashParams.get('refresh_token') ?? parsed.searchParams.get('refresh_token');
			const expiresAtParam = hashParams.get('expires_at') ?? parsed.searchParams.get('expires_at');
			const expiresInParam = hashParams.get('expires_in') ?? parsed.searchParams.get('expires_in');

			if (!code || !state || !nonce) {
				throw new Error('Missing code, state, or nonce in callback URL');
			}

			const key = `${REDIRECT_STATE_PREFIX}${state}`;
			const raw = redirectStorage.get(key);
			if (!raw) {
				throw new Error('No matching redirect state found. Session may have expired.');
			}

			const redirectState = JSON.parse(raw) as {
				state: string;
				nonce: string;
				requestId?: string;
			};

			if (redirectState.state !== state || redirectState.nonce !== nonce) {
				redirectStorage.remove(key);
				throw new Error('State or nonce mismatch');
			}
			if (requestId && redirectState.requestId !== requestId) {
				redirectStorage.remove(key);
				throw new Error('Request ID mismatch');
			}

			redirectStorage.remove(key);

			let user: Session['user'] = {};
			if (userParam) {
				try {
					user = JSON.parse(decodeURIComponent(userParam)) as Session['user'];
				} catch {
					// Ignore invalid user param
				}
			}
			// Fallback: auth callback sets sub/address as individual params (query or hash)
			if (!user.sub && !user.id) {
				const subParam = parsed.searchParams.get('sub') ?? hashParams.get('sub');
				if (subParam) user.sub = subParam;
			}
			if (!user.address) {
				const addressParam = parsed.searchParams.get('address') ?? hashParams.get('address');
				if (addressParam) user.address = addressParam;
			}

			let sub = user?.sub ?? user?.id ?? '';
			if (!sub && idToken) {
				const subFromJwt = extractSubFromJwt(idToken);
				if (subFromJwt) {
					sub = subFromJwt;
					user.sub = subFromJwt;
				}
			}

			const effectiveToken = sessionAccessToken ?? accessToken ?? code;
			const expiresAtNum = expiresAtParam != null ? Number(expiresAtParam) : NaN;
			const expiresAt =
				Number.isFinite(expiresAtNum) && expiresAtNum > 0
					? expiresAtNum
					: expiresInParam
						? Date.now() + Number(expiresInParam) * 1000
						: Date.now() + 3600_000;

			const session: Session = {
				access_token: effectiveToken,
				...(sessionAccessToken && { session_access_token: sessionAccessToken }),
				refresh_token: refreshToken ?? undefined,
				...(idToken && { id_token: idToken }),
				sub,
				user,
				expires_at: expiresAt,
				...(salt && { salt }),
			};

			await saveSession(session);
			emitter.emit('change', session);
			return session;
		},

		onAuthStateChange(callback: AuthStateChangeCallback) {
			emitter.on('change', callback);
			return () => emitter.off('change', callback);
		},
	};
}
