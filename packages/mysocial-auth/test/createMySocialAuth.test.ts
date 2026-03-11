// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createMySocialAuth } from '../src/createMySocialAuth.js';
import { redirectStorage, REDIRECT_STATE_PREFIX } from '../src/storage.js';

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
			get: (k: string) => (k === 'mysocial_auth_session' ? JSON.stringify(storedSession) : null),
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
			get: (k: string) => (k === 'mysocial_auth_session' ? JSON.stringify(storedSession) : null),
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
