// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createMySocialAuth } from '../src/createMySocialAuth.js';
import { redirectStorage, REDIRECT_STATE_PREFIX, SESSION_KEY } from '../src/storage.js';

/** Minimal JWT-shaped string with given exp (Unix seconds). */
function jwtPayloadExp(expUnixSec: number): string {
	const payload = btoa(JSON.stringify({ exp: expUnixSec }))
		.replace(/\+/g, '-')
		.replace(/\//g, '_')
		.replace(/=+$/, '');
	return `hdr.${payload}.sig`;
}

describe('createMySocialAuth', () => {
	beforeEach(() => {
		vi.stubGlobal('fetch', vi.fn());
		vi.stubGlobal('window', {
			open: vi.fn(() => null),
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
			location: { href: '' },
			screen: { width: 1920, height: 1080 },
		});
		if (typeof sessionStorage !== 'undefined') {
			sessionStorage.clear();
		}
	});

	afterEach(() => {
		vi.unstubAllGlobals();
	});

	it('creates auth instance with expected methods', () => {
		const auth = createMySocialAuth({
			apiBaseUrl: 'https://api.test',
			authOrigin: 'https://auth.test',
			clientId: 'c1',
			redirectUri: 'https://app.test/cb',
		});

		expect(auth.signIn).toBeDefined();
		expect(auth.signOut).toBeDefined();
		expect(auth.getSession).toBeDefined();
		expect(auth.refresh).toBeDefined();
		expect(auth.handleRedirectCallback).toBeDefined();
		expect(auth.onAuthStateChange).toBeDefined();
		expect(auth.getAccessTokenForApi).toBeDefined();
	});

	it('getSession returns null when no session', async () => {
		const auth = createMySocialAuth({
			apiBaseUrl: 'https://api.test',
			authOrigin: 'https://auth.test',
			clientId: 'c1',
			redirectUri: 'https://app.test/cb',
		});

		const session = await auth.getSession();
		expect(session).toBeNull();
	});

	it('onAuthStateChange returns unsubscribe', () => {
		const auth = createMySocialAuth({
			apiBaseUrl: 'https://api.test',
			authOrigin: 'https://auth.test',
			clientId: 'c1',
			redirectUri: 'https://app.test/cb',
		});

		const cb = vi.fn();
		const unsub = auth.onAuthStateChange(cb);
		expect(typeof unsub).toBe('function');
		unsub();
	});

	it('handleRedirectCallback builds session from URL params without calling exchange', async () => {
		const state = 'state-123';
		const nonce = 'nonce-456';
		redirectStorage.set(`${REDIRECT_STATE_PREFIX}${state}`, JSON.stringify({ state, nonce }));

		const auth = createMySocialAuth({
			apiBaseUrl: 'https://api.test',
			authOrigin: 'https://auth.test',
			clientId: 'c1',
			redirectUri: 'https://app.test/cb',
		});

		const url = `https://app.test/cb?code=token-abc&state=${state}&nonce=${nonce}`;
		const session = await auth.handleRedirectCallback(url);

		expect(session.access_token).toBe('token-abc');
		expect(session.user).toEqual({});
		expect(session.sub).toBe('');
		expect(session.expires_at).toBeGreaterThan(Date.now());
		expect(fetch).not.toHaveBeenCalled();
	});

	it('handleRedirectCallback sets sub from user param', async () => {
		const state = 'state-789';
		const nonce = 'nonce-012';
		redirectStorage.set(`${REDIRECT_STATE_PREFIX}${state}`, JSON.stringify({ state, nonce }));

		const auth = createMySocialAuth({
			apiBaseUrl: 'https://api.test',
			authOrigin: 'https://auth.test',
			clientId: 'c1',
			redirectUri: 'https://app.test/cb',
		});

		const userParam = encodeURIComponent(
			JSON.stringify({ id: 'u2', sub: 'sub-456', address: '0xabc' }),
		);
		const url = `https://app.test/cb?code=token-xyz&state=${state}&nonce=${nonce}&user=${userParam}`;
		const session = await auth.handleRedirectCallback(url);

		expect(session.access_token).toBe('token-xyz');
		expect(session.sub).toBe('sub-456');
		expect(session.user.id).toBe('u2');
		expect(session.user.address).toBe('0xabc');
	});

	it('handleRedirectCallback sets sub from user.id when sub is absent', async () => {
		const state = 'state-111';
		const nonce = 'nonce-222';
		redirectStorage.set(`${REDIRECT_STATE_PREFIX}${state}`, JSON.stringify({ state, nonce }));

		const auth = createMySocialAuth({
			apiBaseUrl: 'https://api.test',
			authOrigin: 'https://auth.test',
			clientId: 'c1',
			redirectUri: 'https://app.test/cb',
		});

		const userParam = encodeURIComponent(JSON.stringify({ id: 'u3' }));
		const url = `https://app.test/cb?code=token-def&state=${state}&nonce=${nonce}&user=${userParam}`;
		const session = await auth.handleRedirectCallback(url);

		expect(session.sub).toBe('u3');
	});

	it('handleRedirectCallback reads sub and address from query params when user param is missing (redirect mode)', async () => {
		const state = 'state-redirect';
		const nonce = 'nonce-redirect';
		redirectStorage.set(`${REDIRECT_STATE_PREFIX}${state}`, JSON.stringify({ state, nonce }));

		const auth = createMySocialAuth({
			apiBaseUrl: 'https://api.test',
			authOrigin: 'https://auth.test',
			clientId: 'c1',
			redirectUri: 'https://app.test/cb',
		});

		const url = `https://app.test/cb?code=token-xyz&state=${state}&nonce=${nonce}&sub=111631294628286022835&address=0x123abc`;
		const session = await auth.handleRedirectCallback(url);

		expect(session.sub).toBe('111631294628286022835');
		expect(session.user.sub).toBe('111631294628286022835');
		expect(session.user.address).toBe('0x123abc');
	});

	it('handleRedirectCallback sets sub from id_token when user/sub params are missing (redirect mode)', async () => {
		const state = 'state-jwt';
		const nonce = 'nonce-jwt';
		redirectStorage.set(`${REDIRECT_STATE_PREFIX}${state}`, JSON.stringify({ state, nonce }));

		const payload = btoa(JSON.stringify({ sub: 'oauth-sub-from-jwt' }))
			.replace(/\+/g, '-')
			.replace(/\//g, '_')
			.replace(/=+$/, '');
		const idToken = `header.${payload}.signature`;

		const auth = createMySocialAuth({
			apiBaseUrl: 'https://api.test',
			authOrigin: 'https://auth.test',
			clientId: 'c1',
			redirectUri: 'https://app.test/cb',
		});

		const url = `https://app.test/cb?code=token-xyz&state=${state}&nonce=${nonce}#access_token=at&id_token=${idToken}`;
		const session = await auth.handleRedirectCallback(url);

		expect(session.sub).toBe('oauth-sub-from-jwt');
		expect(session.user.sub).toBe('oauth-sub-from-jwt');
		expect(session.id_token).toBe(idToken);
	});

	it('handleRedirectCallback reads sub from hash when user has address but no sub', async () => {
		const state = 'state-hash-sub';
		const nonce = 'nonce-hash-sub';
		redirectStorage.set(`${REDIRECT_STATE_PREFIX}${state}`, JSON.stringify({ state, nonce }));

		const userParam = encodeURIComponent(JSON.stringify({ address: '0xabc', email: 'a@b.com' }));
		const auth = createMySocialAuth({
			apiBaseUrl: 'https://api.test',
			authOrigin: 'https://auth.test',
			clientId: 'c1',
			redirectUri: 'https://app.test/cb',
		});

		const url = `https://app.test/cb?code=token&state=${state}&nonce=${nonce}&user=${userParam}&sub=sub-from-query`;
		const session = await auth.handleRedirectCallback(url);

		expect(session.sub).toBe('sub-from-query');
		expect(session.user.sub).toBe('sub-from-query');
		expect(session.user.address).toBe('0xabc');
	});

	it('loadSession decodes sub from id_token when sub is empty (legacy redirect session)', async () => {
		const payload = btoa(JSON.stringify({ sub: 'legacy-sub-from-jwt' }))
			.replace(/\+/g, '-')
			.replace(/\//g, '_')
			.replace(/=+$/, '');
		const idToken = `header.${payload}.signature`;
		const storedSession = {
			access_token: 'at',
			expires_at: Date.now() + 3600_000,
			sub: '',
			user: {},
			id_token: idToken,
		};
		const customStorage = {
			get: (k: string) => (k === SESSION_KEY ? JSON.stringify(storedSession) : null),
			set: vi.fn(),
			remove: vi.fn(),
		};

		const auth = createMySocialAuth({
			apiBaseUrl: 'https://api.test',
			authOrigin: 'https://auth.test',
			clientId: 'c1',
			redirectUri: 'https://app.test/cb',
			storage: customStorage,
		});

		const session = await auth.getSession();
		expect(session).not.toBeNull();
		expect(session!.sub).toBe('legacy-sub-from-jwt');
	});

	it('handleRedirectCallback stores session_access_token, refresh_token, expires_in from URL', async () => {
		const state = 'state-session';
		const nonce = 'nonce-session';
		redirectStorage.set(`${REDIRECT_STATE_PREFIX}${state}`, JSON.stringify({ state, nonce }));

		const auth = createMySocialAuth({
			apiBaseUrl: 'https://api.test',
			authOrigin: 'https://auth.test',
			clientId: 'c1',
			redirectUri: 'https://app.test/cb',
		});

		const url = `https://app.test/cb?code=code&state=${state}&nonce=${nonce}&session_access_token=jwt-session&refresh_token=rt-long&expires_in=1800`;
		const session = await auth.handleRedirectCallback(url);

		expect(session.session_access_token).toBe('jwt-session');
		expect(session.refresh_token).toBe('rt-long');
		expect(session.access_token).toBe('jwt-session');
		expect(session.expires_at).toBeGreaterThan(Date.now());
		expect(session.expires_at).toBeLessThanOrEqual(Date.now() + 1801_000);
	});

	it('signOut passes refresh_token to logout when session has it', async () => {
		const state = 'state-logout';
		const nonce = 'nonce-logout';
		redirectStorage.set(`${REDIRECT_STATE_PREFIX}${state}`, JSON.stringify({ state, nonce }));

		const auth = createMySocialAuth({
			apiBaseUrl: 'https://api.test',
			authOrigin: 'https://auth.test',
			clientId: 'c1',
			redirectUri: 'https://app.test/cb',
		});

		const url = `https://app.test/cb?code=c&state=${state}&nonce=${nonce}&refresh_token=rt-to-revoke`;
		await auth.handleRedirectCallback(url);

		vi.mocked(fetch).mockResolvedValueOnce({ ok: true } as Response);

		await auth.signOut();

		expect(fetch).toHaveBeenCalledWith(
			'https://api.test/auth/logout',
			expect.objectContaining({
				body: JSON.stringify({ refresh_token: 'rt-to-revoke' }),
			}),
		);
	});

	it('getAccessTokenForApi returns session_access_token when present', async () => {
		const state = 'state-token';
		const nonce = 'nonce-token';
		redirectStorage.set(`${REDIRECT_STATE_PREFIX}${state}`, JSON.stringify({ state, nonce }));

		const auth = createMySocialAuth({
			apiBaseUrl: 'https://api.test',
			authOrigin: 'https://auth.test',
			clientId: 'c1',
			redirectUri: 'https://app.test/cb',
		});

		const url = `https://app.test/cb?code=c&state=${state}&nonce=${nonce}&session_access_token=jwt-for-api&expires_in=1800`;
		await auth.handleRedirectCallback(url);

		const token = await auth.getAccessTokenForApi();
		expect(token).toBe('jwt-for-api');
	});

	it('getSession refreshes when session JWT expires soon even if expires_at is long', async () => {
		const expSec = Math.floor(Date.now() / 1000) + 30;
		const sessionJwt = jwtPayloadExp(expSec);
		const storedSession = {
			access_token: 'oauth',
			session_access_token: sessionJwt,
			refresh_token: 'rt1',
			expires_at: Date.now() + 3600_000,
			sub: 'u1',
			user: { id: 'u1' },
		};
		const customStorage = {
			get: (k: string) => (k === SESSION_KEY ? JSON.stringify(storedSession) : null),
			set: vi.fn(),
			remove: vi.fn(),
		};

		vi.mocked(fetch).mockResolvedValueOnce({
			ok: true,
			json: async () => ({
				access_token: 'at-new',
				refresh_token: 'rt2',
				expires_in: 1800,
				user: { id: 'u1' },
			}),
		} as Response);

		const auth = createMySocialAuth({
			apiBaseUrl: 'https://api.test',
			authOrigin: 'https://auth.test',
			clientId: 'c1',
			redirectUri: 'https://app.test/cb',
			storage: customStorage,
		});

		const session = await auth.getSession();
		expect(fetch).toHaveBeenCalledWith(
			'https://api.test/auth/refresh',
			expect.objectContaining({
				method: 'POST',
				body: JSON.stringify({ refresh_token: 'rt1' }),
			}),
		);
		expect(session).not.toBeNull();
		expect(session!.access_token).toBe('at-new');
	});

	it('handleRedirectCallback ignores expires_at=0 and uses expires_in', async () => {
		const state = 'state-exp0';
		const nonce = 'nonce-exp0';
		redirectStorage.set(`${REDIRECT_STATE_PREFIX}${state}`, JSON.stringify({ state, nonce }));

		const auth = createMySocialAuth({
			apiBaseUrl: 'https://api.test',
			authOrigin: 'https://auth.test',
			clientId: 'c1',
			redirectUri: 'https://app.test/cb',
		});

		const url = `https://app.test/cb?code=c&state=${state}&nonce=${nonce}&expires_at=0&expires_in=1800`;
		const session = await auth.handleRedirectCallback(url);

		expect(session.expires_at).toBeGreaterThan(Date.now() + 1799_000);
		expect(session.expires_at).toBeLessThanOrEqual(Date.now() + 1801_000);
	});

	it('proactiveRefresh registers visibilitychange listener', () => {
		const addEventListener = vi.fn();
		vi.stubGlobal('document', {
			addEventListener,
			visibilityState: 'hidden',
		});
		createMySocialAuth({
			apiBaseUrl: 'https://api.test',
			authOrigin: 'https://auth.test',
			clientId: 'c1',
			redirectUri: 'https://app.test/cb',
			proactiveRefresh: true,
		});
		expect(addEventListener).toHaveBeenCalledWith('visibilitychange', expect.any(Function));
	});

	it('getAccessTokenForApi returns undefined when no session', async () => {
		const auth = createMySocialAuth({
			apiBaseUrl: 'https://api.test',
			authOrigin: 'https://auth.test',
			clientId: 'c1',
			redirectUri: 'https://app.test/cb',
		});

		const token = await auth.getAccessTokenForApi();
		expect(token).toBeUndefined();
	});

	it('getAccessTokenForApi returns undefined for wallet-only session', async () => {
		const walletOnlySession = {
			access_token: 'wallet-only',
			sub: '0x123',
			user: { address: '0x123' },
			expires_at: Date.now() + 3600_000,
		};
		const customStorage = {
			get: (k: string) => (k === SESSION_KEY ? JSON.stringify(walletOnlySession) : null),
			set: vi.fn(),
			remove: vi.fn(),
		};

		const auth = createMySocialAuth({
			apiBaseUrl: 'https://api.test',
			authOrigin: 'https://auth.test',
			clientId: 'c1',
			redirectUri: 'https://app.test/cb',
			storage: customStorage,
		});

		const token = await auth.getAccessTokenForApi();
		expect(token).toBeUndefined();
	});

	it('getSession clears session when refresh returns 401', async () => {
		const storedSession = {
			access_token: 'at-old',
			refresh_token: 'rt1',
			expires_at: Date.now() - 1000,
			sub: 'u1',
			user: { id: 'u1' },
		};
		const customStorage = {
			get: (k: string) => (k === SESSION_KEY ? JSON.stringify(storedSession) : null),
			set: vi.fn(),
			remove: vi.fn(),
		};

		vi.mocked(fetch).mockResolvedValueOnce({
			ok: false,
			status: 401,
			text: async () => 'Unauthorized',
		} as Response);

		const auth = createMySocialAuth({
			apiBaseUrl: 'https://api.test',
			authOrigin: 'https://auth.test',
			clientId: 'c1',
			redirectUri: 'https://app.test/cb',
			storage: customStorage,
		});

		const session = await auth.getSession();
		expect(session).toBeNull();
		expect(customStorage.remove).toHaveBeenCalled();
	});

	it('refresh preserves user when backend does not return it', async () => {
		const storedSession = {
			access_token: 'at-old',
			refresh_token: 'rt1',
			expires_at: Date.now() - 1000,
			sub: 'u1',
			user: { id: 'u1', address: '0xabc' },
		};
		const customStorage = {
			get: (k: string) => (k === SESSION_KEY ? JSON.stringify(storedSession) : null),
			set: vi.fn(),
			remove: vi.fn(),
		};

		vi.mocked(fetch).mockResolvedValueOnce({
			ok: true,
			json: async () => ({
				access_token: 'at-new',
				refresh_token: 'rt2',
				expires_in: 1800,
			}),
		} as Response);

		const auth = createMySocialAuth({
			apiBaseUrl: 'https://api.test',
			authOrigin: 'https://auth.test',
			clientId: 'c1',
			redirectUri: 'https://app.test/cb',
			storage: customStorage,
		});

		const session = await auth.getSession();
		expect(session).not.toBeNull();
		expect(session!.user.id).toBe('u1');
		expect(session!.user.address).toBe('0xabc');
		expect(session!.sub).toBe('u1');
	});

	it('refresh preserves id_token when backend does not return it', async () => {
		const idToken = 'eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJ1MSJ9.sig';
		const storedSession = {
			access_token: 'at-old',
			refresh_token: 'rt1',
			id_token: idToken,
			salt: 'salt-from-initial',
			expires_at: Date.now() - 1000,
			sub: 'u1',
			user: { id: 'u1' },
		};
		const customStorage = {
			get: (k: string) => (k === SESSION_KEY ? JSON.stringify(storedSession) : null),
			set: vi.fn(),
			remove: vi.fn(),
		};

		vi.mocked(fetch).mockResolvedValueOnce({
			ok: true,
			json: async () => ({
				access_token: 'at-new',
				refresh_token: 'rt2',
				expires_in: 3600,
				user: { id: 'u1' },
			}),
		} as Response);

		const auth = createMySocialAuth({
			apiBaseUrl: 'https://api.test',
			authOrigin: 'https://auth.test',
			clientId: 'c1',
			redirectUri: 'https://app.test/cb',
			storage: customStorage,
		});

		const session = await auth.getSession();
		expect(session).not.toBeNull();
		expect(session!.id_token).toBe(idToken);
		expect(session!.salt).toBe('salt-from-initial');
		expect(session!.access_token).toBe('at-new');
	});
});
