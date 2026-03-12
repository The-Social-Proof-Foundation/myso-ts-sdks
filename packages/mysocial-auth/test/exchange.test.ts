// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { exchangeCode, refreshTokens, logout, fetchRequestId } from '../src/exchange.js';
import { RateLimitError, SessionRevokedError } from '../src/errors.js';

describe('exchange', () => {
	beforeEach(() => {
		vi.stubGlobal('fetch', vi.fn());
	});

	afterEach(() => {
		vi.unstubAllGlobals();
	});

	it('exchangeCode sends correct body and returns session', async () => {
		const mockSession = {
			access_token: 'at',
			refresh_token: 'rt',
			expires_in: 3600,
			user: { id: 'u1' },
		};
		vi.mocked(fetch).mockResolvedValueOnce({
			ok: true,
			json: async () => mockSession,
		} as Response);

		const session = await exchangeCode('https://api.test', {
			code: 'c1',
			code_verifier: 'cv',
			redirect_uri: 'https://app.test/cb',
			state: 's1',
			nonce: 'n1',
		});

		expect(fetch).toHaveBeenCalledWith(
			'https://api.test/auth/exchange',
			expect.objectContaining({
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					code: 'c1',
					code_verifier: 'cv',
					redirect_uri: 'https://app.test/cb',
					state: 's1',
					nonce: 'n1',
				}),
			}),
		);
		expect(session.access_token).toBe('at');
		expect(session.refresh_token).toBe('rt');
		expect(session.expires_at).toBeGreaterThan(Date.now());
		expect(session.user.id).toBe('u1');
		expect(session.sub).toBe('u1');
	});

	it('refreshTokens sends refresh_token and returns session', async () => {
		const mockSession = {
			access_token: 'at2',
			refresh_token: 'rt2',
			expires_in: 3600,
			user: { id: 'u1' },
		};
		vi.mocked(fetch).mockResolvedValueOnce({
			ok: true,
			json: async () => mockSession,
		} as Response);

		const session = await refreshTokens('https://api.test', 'rt1');

		expect(fetch).toHaveBeenCalledWith(
			'https://api.test/auth/refresh',
			expect.objectContaining({
				method: 'POST',
				body: JSON.stringify({ refresh_token: 'rt1' }),
			}),
		);
		expect(session.access_token).toBe('at2');
		expect(session.sub).toBe('u1');
	});

	it('refreshTokens returns id_token when backend includes it', async () => {
		const mockSession = {
			access_token: 'at2',
			refresh_token: 'rt2',
			id_token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1MSJ9.sig',
			expires_in: 3600,
			user: { id: 'u1' },
		};
		vi.mocked(fetch).mockResolvedValueOnce({
			ok: true,
			json: async () => mockSession,
		} as Response);

		const session = await refreshTokens('https://api.test', 'rt1');

		expect(session.id_token).toBe(mockSession.id_token);
	});

	it('exchangeCode sets sub from user.sub when present', async () => {
		const mockSession = {
			access_token: 'at',
			refresh_token: 'rt',
			expires_in: 3600,
			user: { id: 'u1', sub: 'sub-oauth-123' },
		};
		vi.mocked(fetch).mockResolvedValueOnce({
			ok: true,
			json: async () => mockSession,
		} as Response);

		const session = await exchangeCode('https://api.test', {
			code: 'c1',
			redirect_uri: 'https://app.test/cb',
		});

		expect(session.sub).toBe('sub-oauth-123');
	});

	it('exchangeCode falls back to user.id when user.sub is absent', async () => {
		const mockSession = {
			access_token: 'at',
			expires_in: 3600,
			user: { id: 'u1' },
		};
		vi.mocked(fetch).mockResolvedValueOnce({
			ok: true,
			json: async () => mockSession,
		} as Response);

		const session = await exchangeCode('https://api.test', {
			code: 'c1',
			redirect_uri: 'https://app.test/cb',
		});

		expect(session.sub).toBe('u1');
	});

	it('logout calls backend', async () => {
		vi.mocked(fetch).mockResolvedValueOnce({ ok: true } as Response);

		await logout('https://api.test');

		expect(fetch).toHaveBeenCalledWith(
			'https://api.test/auth/logout',
			expect.objectContaining({ method: 'POST' }),
		);
	});

	it('logout sends refresh_token in body when provided', async () => {
		vi.mocked(fetch).mockResolvedValueOnce({ ok: true } as Response);

		await logout('https://api.test', 'rt-123');

		expect(fetch).toHaveBeenCalledWith(
			'https://api.test/auth/logout',
			expect.objectContaining({
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ refresh_token: 'rt-123' }),
			}),
		);
	});

	it('refreshTokens throws SessionRevokedError on 401', async () => {
		vi.mocked(fetch).mockResolvedValueOnce({
			ok: false,
			status: 401,
			text: async () => 'Unauthorized',
		} as Response);

		await expect(refreshTokens('https://api.test', 'rt1')).rejects.toThrow(SessionRevokedError);
	});

	it('refreshTokens throws RateLimitError on 429', async () => {
		vi.mocked(fetch).mockResolvedValueOnce({
			ok: false,
			status: 429,
			text: async () => 'Too Many Requests',
		} as Response);

		await expect(refreshTokens('https://api.test', 'rt1')).rejects.toThrow(RateLimitError);
	});

	it('refreshTokens handles response without user', async () => {
		vi.mocked(fetch).mockResolvedValueOnce({
			ok: true,
			json: async () => ({
				access_token: 'at2',
				refresh_token: 'rt2',
				expires_in: 1800,
			}),
		} as Response);

		const session = await refreshTokens('https://api.test', 'rt1');

		expect(session.access_token).toBe('at2');
		expect(session.session_access_token).toBe('at2');
		expect(session.refresh_token).toBe('rt2');
		expect(session.expires_at).toBeGreaterThan(Date.now());
		expect(session.user).toEqual({});
		expect(session.sub).toBe('');
	});

	it('fetchRequestId returns request_id', async () => {
		vi.mocked(fetch).mockResolvedValueOnce({
			ok: true,
			json: async () => ({ request_id: 'req-123' }),
		} as Response);

		const requestId = await fetchRequestId('https://api.test', {
			client_id: 'c1',
			redirect_uri: 'https://app.test/cb',
			return_origin: 'https://app.test',
		});

		expect(fetch).toHaveBeenCalledWith(
			'https://api.test/auth/request',
			expect.objectContaining({
				method: 'POST',
				body: JSON.stringify({
					client_id: 'c1',
					redirect_uri: 'https://app.test/cb',
					return_origin: 'https://app.test',
				}),
			}),
		);
		expect(requestId).toBe('req-123');
	});

	it('exchangeCode works without code_verifier when auth frontend already exchanged', async () => {
		const mockSession = {
			access_token: 'at',
			refresh_token: 'rt',
			expires_in: 3600,
			user: { id: 'u1' },
		};
		vi.mocked(fetch).mockResolvedValueOnce({
			ok: true,
			json: async () => mockSession,
		} as Response);

		const session = await exchangeCode('https://api.test', {
			code: 'c1',
			redirect_uri: 'https://app.test/cb',
			state: 's1',
			nonce: 'n1',
		});

		expect(fetch).toHaveBeenCalledWith(
			'https://api.test/auth/exchange',
			expect.objectContaining({
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					code: 'c1',
					redirect_uri: 'https://app.test/cb',
					state: 's1',
					nonce: 'n1',
				}),
			}),
		);
		expect(session.access_token).toBe('at');
		expect(session.user.id).toBe('u1');
		expect(session.sub).toBe('u1');
	});

	it('exchangeCode throws on non-ok response', async () => {
		vi.mocked(fetch).mockResolvedValueOnce({
			ok: false,
			status: 400,
			text: async () => 'Bad request',
		} as Response);

		await expect(
			exchangeCode('https://api.test', {
				code: 'c1',
				redirect_uri: 'https://app.test/cb',
			}),
		).rejects.toThrow('Token exchange failed');
	});
});
