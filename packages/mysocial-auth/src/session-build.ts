// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import type { Session } from './types.js';

/** True when value looks like a JWT (three base64url segments). */
export function isJwtShape(value: string | null | undefined): boolean {
	if (!value || typeof value !== 'string') return false;
	const parts = value.trim().split('.');
	return parts.length === 3 && parts.every((p) => p.length > 0);
}

/** Decode JWT payload (no signature verification). */
export function parseJwtPayload(jwt: string): { sub?: string; exp?: number } | undefined {
	try {
		const parts = jwt.split('.');
		if (parts.length !== 3) return undefined;
		const payload = parts[1];
		if (!payload) return undefined;
		const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
		const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=');
		const decoded = atob(padded);
		const parsed = JSON.parse(decoded) as { sub?: string; exp?: number };
		return parsed;
	} catch {
		return undefined;
	}
}

/** Extract sub claim from JWT payload. No signature verification (auth server already validated). */
export function extractSubFromJwt(jwt: string): string | undefined {
	const sub = parseJwtPayload(jwt)?.sub;
	if (typeof sub !== 'string') return undefined;
	const trimmed = sub.trim();
	return trimmed.length > 0 ? trimmed : undefined;
}

function isWalletSessionSub(sub: string | null | undefined): boolean {
	return Boolean(sub?.toString().trim().startsWith('wallet:'));
}

/** Session JWT sub is iss:sub composite — not valid for OAuth wallet derivation. */
function isCompositeUserIdentifierSub(sub: string): boolean {
	return sub.includes('://') || sub.includes(':');
}

/**
 * Resolve OAuth provider sub for wallet derivation.
 * Prefer id_token.sub, then access_token JWT sub, over session/user fields.
 */
export function resolveOAuthSubForSession(
	user: Session['user'] | undefined,
	options: {
		idToken?: string;
		accessToken?: string;
		sessionSub?: string;
	},
): string {
	const { idToken, accessToken, sessionSub } = options;

	if (idToken) {
		const idTokenSub = extractSubFromJwt(idToken);
		if (idTokenSub && !isWalletSessionSub(idTokenSub) && !isCompositeUserIdentifierSub(idTokenSub)) {
			return idTokenSub;
		}
	}

	if (accessToken && isJwtShape(accessToken)) {
		const accessSub = extractSubFromJwt(accessToken);
		if (accessSub && !isWalletSessionSub(accessSub) && !isCompositeUserIdentifierSub(accessSub)) {
			return accessSub;
		}
	}

	const userCandidates = [user?.sub, user?.id];
	for (const candidate of userCandidates) {
		const value = candidate?.toString().trim();
		if (value && !isWalletSessionSub(value) && !isCompositeUserIdentifierSub(value)) {
			return value;
		}
	}

	if (!idToken) {
		const sessionCandidates = [sessionSub, user?.sub, user?.id];
		for (const candidate of sessionCandidates) {
			const value = candidate?.toString().trim();
			if (value && !isWalletSessionSub(value) && !isCompositeUserIdentifierSub(value)) {
				return value;
			}
		}
	}

	return '';
}

/** Auth redirect passes Google id_token as query `code` when hash is stripped (iOS). */
export function resolveIdTokenFromCallback(options: {
	idTokenFromUrl?: string | null;
	code?: string | null;
	accessToken?: string | null;
}): string | undefined {
	if (options.idTokenFromUrl && isJwtShape(options.idTokenFromUrl)) {
		return options.idTokenFromUrl;
	}
	if (options.code && isJwtShape(options.code)) {
		return options.code;
	}
	if (options.accessToken && isJwtShape(options.accessToken)) {
		return options.accessToken;
	}
	return undefined;
}
