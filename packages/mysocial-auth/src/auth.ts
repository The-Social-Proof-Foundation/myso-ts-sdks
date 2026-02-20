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
import { exchangeCode, refreshTokens, logout, fetchRequestId } from './exchange.js';
import {
	generateCodeVerifier,
	generateCodeChallenge,
	generateState,
	generateNonce,
} from './pkce.js';

type AuthEvents = { change: Session | null };

export interface MySocialAuth {
	signIn(options?: SignInOptions): Promise<Session>;
	signOut(): Promise<void>;
	getSession(): Promise<Session | null>;
	refresh(): Promise<Session | null>;
	handleRedirectCallback(url?: string): Promise<Session>;
	onAuthStateChange(callback: AuthStateChangeCallback): () => void;
}

function getReturnOrigin(redirectUri: string): string {
	try {
		const u = new URL(redirectUri);
		return `${u.protocol}//${u.host}`;
	} catch {
		return '';
	}
}

export function createAuth(config: MySocialAuthConfig): MySocialAuth {
	const storage = createStorage(config.storage);
	const emitter: Emitter<AuthEvents> = mitt<AuthEvents>();

	let cachedSession: Session | null = null;

	async function loadSession(): Promise<Session | null> {
		const raw = storage.get(SESSION_KEY);
		if (!raw) return null;
		try {
			const session = JSON.parse(raw) as Session;
			if (session.expires_at && session.expires_at > Date.now()) {
				return session;
			}
			if (session.refresh_token) {
				const refreshed = await refreshTokens(config.apiBaseUrl, session.refresh_token);
				await saveSession(refreshed);
				emitter.emit('change', refreshed);
				return refreshed;
			}
			storage.remove(SESSION_KEY);
			cachedSession = null;
			emitter.emit('change', null);
			return null;
		} catch {
			storage.remove(SESSION_KEY);
			cachedSession = null;
			return null;
		}
	}

	async function saveSession(session: Session): Promise<void> {
		cachedSession = session;
		storage.set(SESSION_KEY, JSON.stringify(session));
	}

	async function clearSession(): Promise<void> {
		cachedSession = null;
		storage.remove(SESSION_KEY);
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
				});
				await saveSession(session);
				emitter.emit('change', session);
				return session;
			}

			// Redirect mode
			const state = generateState();
			const nonce = generateNonce();
			const codeVerifier = await generateCodeVerifier();
			const codeChallenge = await generateCodeChallenge(codeVerifier);
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
				codeVerifier,
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
				provider: provider ?? '',
				code_challenge: codeChallenge,
				code_challenge_method: 'S256',
			});
			if (requestId) params.set('request_id', requestId);

			const loginUrl = `${config.authOrigin.replace(/\/$/, '')}/login?${params.toString()}`;
			window.location.href = loginUrl;

			return new Promise<Session>(() => {}); // Never resolves; page navigates away
		},

		async signOut() {
			try {
				await logout(config.apiBaseUrl);
			} catch {
				// Best-effort; clear local state regardless
			}
			await clearSession();
			emitter.emit('change', null);
		},

		async getSession() {
			if (cachedSession && cachedSession.expires_at > Date.now()) {
				return cachedSession;
			}
			return loadSession();
		},

		async refresh() {
			const session = await loadSession();
			if (!session?.refresh_token) return null;
			const refreshed = await refreshTokens(config.apiBaseUrl, session.refresh_token);
			await saveSession(refreshed);
			emitter.emit('change', refreshed);
			return refreshed;
		},

		async handleRedirectCallback(url?: string) {
			const targetUrl = url ?? (typeof window !== 'undefined' ? window.location.href : '');
			const parsed = new URL(targetUrl);
			const code = parsed.searchParams.get('code');
			const state = parsed.searchParams.get('state');
			const nonce = parsed.searchParams.get('nonce');
			const requestId = parsed.searchParams.get('request_id') ?? undefined;

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
				codeVerifier: string;
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

			const session = await exchangeCode(config.apiBaseUrl, {
				code,
				code_verifier: redirectState.codeVerifier,
				redirect_uri: config.redirectUri,
				state,
				nonce,
				request_id: requestId ?? redirectState.requestId,
			});

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
