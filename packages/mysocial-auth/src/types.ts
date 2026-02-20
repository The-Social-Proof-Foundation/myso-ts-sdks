// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

/** OAuth provider options for Login with MySocial */
export type AuthProvider = 'google' | 'apple' | 'facebook' | 'twitch';

/** Auth flow mode: popup (opens window) or redirect (navigates away) */
export type AuthMode = 'popup' | 'redirect';

/** User object returned from exchange/refresh */
export interface AuthUser {
	id?: string;
	email?: string;
	name?: string;
	[key: string]: unknown;
}

/** Session object after successful auth */
export interface Session {
	access_token: string;
	refresh_token?: string;
	expires_at: number;
	user: AuthUser;
}

/** Storage adapter for persisting session (memory, sessionStorage, or custom) */
export interface StorageAdapter {
	get(key: string): string | null;
	set(key: string, value: string): void;
	remove(key: string): void;
}

/** Storage option: 'memory' (default), 'session', or custom adapter */
export type StorageOption = 'memory' | 'session' | StorageAdapter;

/** MySocial Auth SDK configuration */
export interface MySocialAuthConfig {
	apiBaseUrl: string;
	authOrigin: string;
	clientId: string;
	redirectUri: string;
	storage?: StorageOption;
	/** Popup timeout in ms (default 120000 = 2 min) */
	popupTimeout?: number;
	/** Use request_id flow: call /auth/request before opening popup (requires backend support) */
	useRequestId?: boolean;
}

/** Sign-in options */
export interface SignInOptions {
	provider?: AuthProvider;
	mode?: AuthMode;
}

/** Auth state change callback */
export type AuthStateChangeCallback = (session: Session | null) => void;

/** PostMessage success payload from auth.mysocial.network popup */
export interface AuthResultMessage {
	type: 'MYSOCIAL_AUTH_RESULT';
	code: string;
	state: string;
	nonce: string;
	clientId: string;
	requestId?: string;
}

/** PostMessage error payload from auth.mysocial.network popup */
export interface AuthErrorMessage {
	type: 'MYSOCIAL_AUTH_ERROR';
	error: string;
	state: string;
	nonce?: string;
	clientId?: string;
	requestId?: string;
}

/** Exchange request body */
export interface ExchangeRequest {
	code: string;
	code_verifier?: string;
	redirect_uri: string;
	state?: string;
	nonce?: string;
	request_id?: string;
}

/** Exchange response */
export interface ExchangeResponse {
	access_token: string;
	refresh_token?: string;
	expires_in: number;
	user: AuthUser;
}

/** Request request body (for request_id flow) */
export interface AuthRequestRequest {
	client_id: string;
	redirect_uri: string;
	return_origin: string;
}

/** Request response */
export interface AuthRequestResponse {
	request_id: string;
}
