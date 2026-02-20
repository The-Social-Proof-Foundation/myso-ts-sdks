// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import type { AuthProvider, AuthResultMessage, AuthErrorMessage } from './types.js';
import {
	AuthTimeoutError,
	InvalidStateError,
	PopupBlockedError,
	PopupClosedError,
} from './errors.js';
import {
	generateCodeChallenge,
	generateCodeVerifier,
	generateNonce,
	generateState,
} from './pkce.js';
import { getPopupFeatures } from './popup-utils.js';
import { exchangeCode, fetchRequestId } from './exchange.js';
import type { Session } from './types.js';

/** Get return_origin from redirectUri (e.g. https://dripdrop.social/auth/callback -> https://dripdrop.social) */
function getReturnOrigin(redirectUri: string): string {
	try {
		const u = new URL(redirectUri);
		return `${u.protocol}//${u.host}`;
	} catch {
		return '';
	}
}

export interface OpenPopupOptions {
	apiBaseUrl: string;
	authOrigin: string;
	clientId: string;
	redirectUri: string;
	provider?: AuthProvider;
	timeout?: number;
	useRequestId?: boolean;
}

/**
 * Open auth popup and wait for postMessage. Safari: open with about:blank first, then set location.
 * Returns session on success. Rejects on error, timeout, or user close.
 */
export async function openAuthPopup(options: OpenPopupOptions): Promise<Session> {
	const {
		apiBaseUrl,
		authOrigin,
		clientId,
		redirectUri,
		provider,
		timeout = 120_000,
		useRequestId = false,
	} = options;

	const state = generateState();
	const nonce = generateNonce();
	const returnOrigin = getReturnOrigin(redirectUri);

	let requestId: string | undefined;
	if (useRequestId) {
		requestId = await fetchRequestId(apiBaseUrl, {
			client_id: clientId,
			redirect_uri: redirectUri,
			return_origin: returnOrigin,
		});
	}

	const { codeVerifier, codeChallenge } = await (async () => {
		const verifier = await generateCodeVerifier();
		const challenge = await generateCodeChallenge(verifier);
		return { codeVerifier: verifier, codeChallenge: challenge };
	})();

	// Open popup immediately (Safari requires user gesture). Use about:blank, then set location.
	const features = getPopupFeatures(420, 720);
	const popup = window.open('about:blank', '_blank', features);

	if (!popup || popup.closed) {
		throw new PopupBlockedError();
	}

	const params = new URLSearchParams({
		client_id: clientId,
		redirect_uri: redirectUri,
		state,
		nonce,
		return_origin: returnOrigin,
		mode: 'popup',
		provider: provider ?? '',
		code_challenge: codeChallenge,
		code_challenge_method: 'S256',
	});
	if (requestId) params.set('request_id', requestId);

	const loginUrl = `${authOrigin.replace(/\/$/, '')}/login?${params.toString()}`;

	// Set location after popup is open (Safari-safe)
	popup.location.href = loginUrl;

	return new Promise<Session>((resolve, reject) => {
		let timeoutId: ReturnType<typeof setTimeout> | null = null;
		let closedCheckId: ReturnType<typeof setInterval> | null = null;

		const cleanup = () => {
			if (timeoutId) clearTimeout(timeoutId);
			if (closedCheckId) clearInterval(closedCheckId);
			window.removeEventListener('message', handler);
		};

		const handler = (event: MessageEvent) => {
			if (event.origin !== authOrigin) return;
			if (event.source !== popup) return;

			const data = event.data;
			if (!data || typeof data !== 'object' || !data.type) return;

			if (data.type === 'MYSOCIAL_AUTH_RESULT') {
				const msg = data as AuthResultMessage;
				if (msg.state !== state || msg.nonce !== nonce) {
					cleanup();
					reject(new InvalidStateError());
					return;
				}
				if (msg.clientId !== clientId) {
					cleanup();
					reject(new InvalidStateError());
					return;
				}
				if (requestId && msg.requestId !== requestId) {
					cleanup();
					reject(new InvalidStateError());
					return;
				}

				cleanup();
				popup.close();

				exchangeCode(apiBaseUrl, {
					code: msg.code,
					code_verifier: codeVerifier,
					redirect_uri: redirectUri,
					state,
					nonce,
					request_id: requestId,
				})
					.then(resolve)
					.catch(reject);
			} else if (data.type === 'MYSOCIAL_AUTH_ERROR') {
				const msg = data as AuthErrorMessage;
				cleanup();
				popup.close();
				reject(new Error(msg.error ?? 'Authentication failed'));
			}
		};

		window.addEventListener('message', handler);

		timeoutId = setTimeout(() => {
			cleanup();
			popup.close();
			reject(new AuthTimeoutError());
		}, timeout);

		closedCheckId = setInterval(() => {
			if (popup.closed) {
				cleanup();
				reject(new PopupClosedError());
			}
		}, 200);
	});
}
