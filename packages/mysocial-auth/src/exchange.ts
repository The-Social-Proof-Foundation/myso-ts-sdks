// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import type {
	AuthRequestRequest,
	AuthRequestResponse,
	ExchangeRequest,
	ExchangeResponse,
	Session,
} from './types.js';

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
	return {
		access_token: data.access_token,
		refresh_token: data.refresh_token,
		expires_at,
		user: data.user,
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
	if (!res.ok) {
		const text = await res.text();
		throw new Error(`Token refresh failed: ${res.status} ${text}`);
	}
	const data = (await res.json()) as ExchangeResponse;
	const expires_at = Date.now() + data.expires_in * 1000;
	return {
		access_token: data.access_token,
		refresh_token: data.refresh_token ?? refreshToken,
		expires_at,
		user: data.user,
	};
}

/** Logout / invalidate session on backend */
export async function logout(apiBaseUrl: string): Promise<void> {
	const url = `${apiBaseUrl.replace(/\/$/, '')}/auth/logout`;
	const res = await fetch(url, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
	});
	if (!res.ok) {
		const text = await res.text();
		throw new Error(`Logout failed: ${res.status} ${text}`);
	}
}
