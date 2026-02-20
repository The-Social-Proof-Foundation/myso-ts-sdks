// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import { describe, it, expect } from 'vitest';
import {
	generateCodeVerifier,
	generateCodeChallenge,
	generateState,
	generateNonce,
} from '../src/pkce.js';

describe('PKCE', () => {
	it('generates unique code verifiers', async () => {
		const v1 = await generateCodeVerifier();
		const v2 = await generateCodeVerifier();
		expect(v1).not.toBe(v2);
		expect(v1.length).toBeGreaterThan(32);
		expect(v2.length).toBeGreaterThan(32);
	});

	it('generates base64url format (no +, /, =)', async () => {
		const v = await generateCodeVerifier();
		expect(v).not.toMatch(/[+/=]/);
	});

	it('generates code challenge from verifier', async () => {
		const verifier = await generateCodeVerifier();
		const challenge = await generateCodeChallenge(verifier);
		expect(challenge).not.toBe(verifier);
		expect(challenge.length).toBeGreaterThan(32);
		expect(challenge).not.toMatch(/[+/=]/);
	});

	it('generates same challenge for same verifier', async () => {
		const verifier = await generateCodeVerifier();
		const c1 = await generateCodeChallenge(verifier);
		const c2 = await generateCodeChallenge(verifier);
		expect(c1).toBe(c2);
	});

	it('generates unique states', () => {
		const s1 = generateState();
		const s2 = generateState();
		expect(s1).not.toBe(s2);
		expect(s1.length).toBeGreaterThan(16);
	});

	it('generates unique nonces', () => {
		const n1 = generateNonce();
		const n2 = generateNonce();
		expect(n1).not.toBe(n2);
		expect(n1.length).toBeGreaterThan(16);
	});
});
