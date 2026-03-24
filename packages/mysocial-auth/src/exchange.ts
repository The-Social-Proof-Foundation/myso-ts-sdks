// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import type {
	AuthRequestRequest,
	AuthRequestResponse,
	ExchangeRequest,
	ExchangeResponse,
	RefreshResponse,
	Session,
} from './types.js';
import { RateLimitError, SessionRevokedError } from './errors.js';

/** Fetch request_id from backend (optional flow). Backend validates return_origin against allowlist. */
export async function fetchRequestId(
	apiBaseUrl: string,
	body: AuthRequestRequest,
): Promise<string> {
	const url = `${apiBaseUrl.replace(/\/$/, '')}/auth/request`;
	const res = await fetch(url, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body),
	});
	if (!res.ok) {
		const text = await res.text();
		throw new Error(`Auth request failed: ${res.status} ${text}`);
	}
	const data = (await res.json()) as AuthRequestResponse;
	return data.request_id;
}

/** Exchange auth code for tokens */
export async function exchangeCode(apiBaseUrl: string, body: ExchangeRequest): Promise<Session> {
	const url = `${apiBaseUrl.replace(/\/$/, '')}/auth/exchange`;
	const res = await fetch(url, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body),
	});
	if (!res.ok) {
		const text = await res.text();
		throw new Error(`Token exchange failed: ${res.status} ${text}`);
	}
	const data = (await res.json()) as ExchangeResponse;
	const expires_at = Date.now() + data.expires_in * 1000;
	const user = data.user ?? {};
	return {
		access_token: data.access_token,
		refresh_token: data.refresh_token,
		expires_at,
		sub: user.sub ?? user.id ?? '',
		user,
	};
}

/** Refresh access token using refresh_token */
export async function refreshTokens(apiBaseUrl: string, refreshToken: string): Promise<Session> {
	const url = `${apiBaseUrl.replace(/\/$/, '')}/auth/refresh`;
	const res = await fetch(url, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ refresh_token: refreshToken }),
	});
	if (res.status === 401) {
		throw new SessionRevokedError();
	}
	if (res.status === 429) {
		throw new RateLimitError();
	}
	if (!res.ok) {
		const text = await res.text();
		throw new Error(`Token refresh failed: ${res.status} ${text}`);
	}
	const data = (await res.json()) as RefreshResponse;
	const expires_at = Date.now() + data.expires_in * 1000;
	const user = data.user ?? {};
	const sessionAccess = data.session_access_token ?? data.access_token;
	return {
		access_token: data.access_token,
		session_access_token: sessionAccess,
		refresh_token: data.refresh_token ?? refreshToken,
		...(data.id_token != null && { id_token: data.id_token }),
		expires_at,
		sub: user.sub ?? user.id ?? '',
		user,
	};
}

/** Logout / invalidate session on backend */
export async function logout(apiBaseUrl: string, refreshToken?: string): Promise<void> {
	const url = `${apiBaseUrl.replace(/\/$/, '')}/auth/logout`;
	const body = refreshToken != null ? { refresh_token: refreshToken } : undefined;
	const res = await fetch(url, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		...(body != null && { body: JSON.stringify(body) }),
	});
	if (!res.ok) {
		const text = await res.text();
		throw new Error(`Logout failed: ${res.status} ${text}`);
	}
}
