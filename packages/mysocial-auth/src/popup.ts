// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import type { AuthProvider, AuthResultMessage, AuthErrorMessage } from './types.js';
import {
	AuthTimeoutError,
	InvalidStateError,
	PopupBlockedError,
	PopupClosedError,
} from './errors.js';
import { generateNonce, generateState } from './pkce.js';
import { getPopupFeatures } from './popup-utils.js';
import { fetchRequestId } from './exchange.js';
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
	const returnOrigin =
		typeof window !== 'undefined' ? window.location.origin : getReturnOrigin(redirectUri);

	let requestId: string | undefined;
	if (useRequestId) {
		requestId = await fetchRequestId(apiBaseUrl, {
			client_id: clientId,
			redirect_uri: redirectUri,
			return_origin: returnOrigin,
		});
	}

	// Open popup immediately (Safari requires user gesture). Use about:blank, then set location.
	const features = getPopupFeatures(420, 720);
	const popup = window.open('about:blank', '_blank', features);

	if (!popup) {
		throw new PopupBlockedError();
	}
	try {
		if (popup.closed) throw new PopupBlockedError();
	} catch (err) {
		if (err instanceof PopupBlockedError) throw err;
		// COOP blocks popup.closed; proceed, setInterval will handle or timeout
	}

	const params = new URLSearchParams({
		client_id: clientId,
		redirect_uri: redirectUri,
		state,
		nonce,
		return_origin: returnOrigin,
		mode: 'popup',
		provider: provider ?? 'none',
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
				try {
					popup.close();
				} catch {
					// Popup may already be closed by auth server
				}

				const user = msg.user ?? {};
				const session: Session = {
					access_token: msg.access_token ?? msg.code,
					refresh_token: msg.refresh_token,
					sub: user.sub ?? user.id ?? '',
					user,
					expires_at: msg.expires_at ?? Date.now() + 3600_000,
					...(msg.salt && { salt: msg.salt }),
				};
				resolve(session);
			} else if (data.type === 'MYSOCIAL_AUTH_ERROR') {
				const msg = data as AuthErrorMessage;
				cleanup();
				try {
					popup.close();
				} catch {
					// Popup may already be closed
				}
				reject(new Error(msg.error ?? 'Authentication failed'));
			}
		};

		window.addEventListener('message', handler);

		timeoutId = setTimeout(() => {
			cleanup();
			try {
				popup.close();
			} catch {
				// Popup may already be closed
			}
			reject(new AuthTimeoutError());
		}, timeout);

		closedCheckId = setInterval(() => {
			try {
				if (popup.closed) {
					cleanup();
					reject(new PopupClosedError());
				}
			} catch {
				// COOP blocks access to popup.closed; treat as unknown, rely on timeout
			}
		}, 200);
	});
}
