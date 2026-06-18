// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import { describe, it, expect } from 'vitest';
import {
	extractSubFromJwt,
	isJwtShape,
	resolveIdTokenFromCallback,
	resolveOAuthSubForSession,
} from '../src/session-build.js';

function jwtWithSub(sub: string): string {
	const payload = btoa(JSON.stringify({ sub }))
		.replace(/\+/g, '-')
		.replace(/\//g, '_')
		.replace(/=+$/, '');
	return `header.${payload}.signature`;
}

describe('session-build', () => {
	it('isJwtShape detects JWT-shaped strings', () => {
		expect(isJwtShape(jwtWithSub('123'))).toBe(true);
		expect(isJwtShape('not-a-jwt')).toBe(false);
		expect(isJwtShape('a.b')).toBe(false);
	});

	it('resolveIdTokenFromCallback promotes JWT-shaped code when hash id_token missing', () => {
		const idToken = jwtWithSub('google-sub');
		expect(
			resolveIdTokenFromCallback({
				idTokenFromUrl: null,
				code: idToken,
				accessToken: null,
			}),
		).toBe(idToken);
	});

	it('resolveOAuthSubForSession prefers id_token.sub over session sub', () => {
		const idToken = jwtWithSub('google-oauth-sub');
		expect(
			resolveOAuthSubForSession(
				{ sub: 'https://accounts.google.com:wrong' },
				{ idToken, accessToken: 'opaque' },
			),
		).toBe('google-oauth-sub');
	});

	it('resolveOAuthSubForSession uses access_token JWT when id_token absent', () => {
		const accessToken = jwtWithSub('from-access-token');
		expect(
			resolveOAuthSubForSession({}, { accessToken }),
		).toBe('from-access-token');
	});

	it('extractSubFromJwt returns trimmed sub', () => {
		expect(extractSubFromJwt(jwtWithSub(' 111631294628286022835 '))).toBe(
			'111631294628286022835',
		);
	});

	it('popup and redirect flows resolve identical sub for same Google id_token', () => {
		const googleSub = '111631294628286022835';
		const idToken = jwtWithSub(googleSub);
		const compositeSessionSub = 'https://accounts.google.com:111631294628286022835';

		const popupSub = resolveOAuthSubForSession(
			{ sub: googleSub, id: googleSub },
			{ idToken, accessToken: 'opaque-session-jwt' },
		);

		const redirectSub = resolveOAuthSubForSession(
			{ sub: compositeSessionSub },
			{ idToken, accessToken: jwtWithSub(compositeSessionSub) },
		);

		expect(popupSub).toBe(googleSub);
		expect(redirectSub).toBe(googleSub);
		expect(popupSub).toBe(redirectSub);
	});
});
