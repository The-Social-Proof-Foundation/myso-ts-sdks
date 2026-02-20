// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

/**
 * Generate a cryptographically random code verifier (32 bytes = 256 bits, base64url).
 * Used for PKCE in OAuth flows.
 */
export async function generateCodeVerifier(): Promise<string> {
	const array = new Uint8Array(32);
	crypto.getRandomValues(array);
	return base64UrlEncode(array);
}

/**
 * Generate code challenge from verifier using SHA-256 (S256 method).
 */
export async function generateCodeChallenge(verifier: string): Promise<string> {
	const encoder = new TextEncoder();
	const data = encoder.encode(verifier);
	const hash = await crypto.subtle.digest('SHA-256', data);
	return base64UrlEncode(new Uint8Array(hash));
}

/**
 * Generate a random state (128 bits+ entropy) for CSRF protection.
 */
export function generateState(): string {
	const array = new Uint8Array(16);
	crypto.getRandomValues(array);
	return base64UrlEncode(array);
}

/**
 * Generate a random nonce (128 bits+ entropy) for replay protection.
 */
export function generateNonce(): string {
	const array = new Uint8Array(16);
	crypto.getRandomValues(array);
	return base64UrlEncode(array);
}

function base64UrlEncode(array: Uint8Array): string {
	const base64 = btoa(String.fromCharCode(...array));
	return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
