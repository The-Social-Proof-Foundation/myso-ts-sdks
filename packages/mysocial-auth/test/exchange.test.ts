// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { exchangeCode, refreshTokens, logout, fetchRequestId } from '../src/exchange.js';

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
	});

	it('logout calls backend', async () => {
		vi.mocked(fetch).mockResolvedValueOnce({ ok: true } as Response);

		await logout('https://api.test');

		expect(fetch).toHaveBeenCalledWith(
			'https://api.test/auth/logout',
			expect.objectContaining({ method: 'POST' }),
		);
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
