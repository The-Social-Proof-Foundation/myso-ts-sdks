// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as pkce from '../src/pkce.js';
import { openAuthPopup } from '../src/popup.js';

describe('openAuthPopup', () => {
	const authOrigin = 'https://auth.test';
	const state = 'state-fixed';
	const nonce = 'nonce-fixed';
	const clientId = 'c1';

	let mockPopup: { closed: boolean; location: { href: string }; close: ReturnType<typeof vi.fn> };
	beforeEach(() => {
		vi.stubGlobal('fetch', vi.fn());
		vi.spyOn(pkce, 'generateState').mockReturnValue(state);
		vi.spyOn(pkce, 'generateNonce').mockReturnValue(nonce);
		mockPopup = {
			closed: false,
			location: { href: '' },
			close: vi.fn(),
		};
		vi.stubGlobal('window', {
			open: vi.fn(() => mockPopup),
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
			location: { origin: 'https://app.test' },
			screen: { width: 1920, height: 1080 },
		});
	});

	afterEach(() => {
		vi.unstubAllGlobals();
		vi.restoreAllMocks();
	});

	it('sets session.sub from msg.user.sub when present', async () => {
		const sessionPromise = openAuthPopup({
			apiBaseUrl: 'https://api.test',
			authOrigin,
			clientId,
			redirectUri: 'https://app.test/cb',
		});

		await new Promise((r) => setTimeout(r, 0));

		const addListenerCalls = vi.mocked(window.addEventListener).mock.calls;
		const messageHandler = addListenerCalls.find((c) => c[0] === 'message')?.[1] as (
			e: MessageEvent,
		) => void;
		expect(messageHandler).toBeDefined();

		messageHandler({
			origin: authOrigin,
			source: mockPopup,
			data: {
				type: 'MYSOCIAL_AUTH_RESULT',
				code: 'code-1',
				state,
				nonce,
				clientId,
				user: { id: 'u1', sub: 'sub-oauth-xyz' },
				access_token: 'at',
				expires_at: Date.now() + 3600_000,
			},
		} as unknown as MessageEvent);

		const session = await sessionPromise;
		expect(session.sub).toBe('sub-oauth-xyz');
		expect(session.user.id).toBe('u1');
	});

	it('sets session.sub from msg.user.id when sub is absent', async () => {
		const sessionPromise = openAuthPopup({
			apiBaseUrl: 'https://api.test',
			authOrigin,
			clientId,
			redirectUri: 'https://app.test/cb',
		});

		await new Promise((r) => setTimeout(r, 0));

		const addListenerCalls = vi.mocked(window.addEventListener).mock.calls;
		const messageHandler = addListenerCalls.find((c) => c[0] === 'message')?.[1] as (
			e: MessageEvent,
		) => void;

		messageHandler({
			origin: authOrigin,
			source: mockPopup,
			data: {
				type: 'MYSOCIAL_AUTH_RESULT',
				code: 'code-2',
				state,
				nonce,
				clientId,
				user: { id: 'u2' },
				access_token: 'at2',
				expires_at: Date.now() + 3600_000,
			},
		} as unknown as MessageEvent);

		const session = await sessionPromise;
		expect(session.sub).toBe('u2');
	});
});
