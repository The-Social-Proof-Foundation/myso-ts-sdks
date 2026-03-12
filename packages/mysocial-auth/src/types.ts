// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

/** OAuth provider options for Login with MySocial. Use 'none' for home screen (user picks provider). */
export type AuthProvider = 'google' | 'apple' | 'facebook' | 'twitch' | 'none';

/** Auth flow mode: popup (opens window) or redirect (navigates away) */
export type AuthMode = 'popup' | 'redirect';

/** User object returned from auth. Use user.address for the wallet address (0x...). */
export interface AuthUser {
	id?: string;
	/** Stable OAuth/OIDC subject identifier for keypair derivation. Falls back to id when absent. */
	sub?: string;
	email?: string;
	name?: string;
	address?: string;
	[key: string]: unknown;
}

/** Session object after successful auth */
export interface Session {
	/**
	 * OAuth provider token or WALLET_ONLY_ACCESS_TOKEN for wallet-only sessions.
	 * Never use directly for Authorization: Bearer. Use getAccessTokenForApi() or session_access_token.
	 */
	access_token: string;
	/** Our JWT (30 min) for API calls. Use for Authorization: Bearer on /salt and protected endpoints. */
	session_access_token?: string;
	refresh_token?: string;
	/** OAuth id_token (JWT). */
	id_token?: string;
	expires_at: number;
	/** Stable user ID for keypair derivation (user.sub ?? user.id). Use for salt + sub derivation. */
	sub: string;
	user: AuthUser;
	salt?: string;
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

/** Ephemeral wallet credentials; never persisted. Handle immediately and do not store. */
export interface WalletCredentials {
	address: string;
	mnemonic?: string;
	privateKey?: string;
}

/** Sign-in options */
export interface SignInOptions {
	/** Provider to use. Default 'none' shows auth home screen. */
	provider?: AuthProvider;
	mode?: AuthMode;
	/**
	 * Opt-in callback for Create/Import Wallet flow. Receives mnemonic/privateKey ephemerally.
	 * SECURITY: Never persist. Handle immediately (e.g. derive keypair, show backup UI) and discard.
	 */
	onWalletCredentials?: (credentials: WalletCredentials) => void;
}

/** Auth state change callback */
export type AuthStateChangeCallback = (session: Session | null) => void;

/** PostMessage success payload from auth.mysocial.network popup */
export interface AuthResultMessage {
	type: 'MYSOCIAL_AUTH_RESULT';
	code: string;
	state: string;
	nonce: string;
	clientId?: string;
	requestId?: string;
	salt?: string;
	user?: AuthUser;
	access_token?: string;
	/** Our JWT (30 min) for API auth. Use for Authorization: Bearer. */
	session_access_token?: string;
	id_token?: string;
	refresh_token?: string;
	expires_at?: number;
	/** Token expiry in seconds (e.g. 1800). Used when session_access_token is present. */
	expires_in?: number;
}

/** PostMessage error payload from auth.mysocial.network popup */
export interface AuthErrorMessage {
	type: 'MYSOCIAL_AUTH_ERROR';
	error: string;
	state: string;
	clientId?: string;
	requestId?: string;
}

/** PostMessage payload from Create/Import Wallet flow (fallback when backend lacks wallet auth) */
export interface WalletResultMessage {
	type: 'MYSOCIAL_WALLET_RESULT';
	address: string;
	source: 'create' | 'import';
	/** Ephemeral; never persisted. Use onWalletCredentials callback if needed. */
	mnemonic?: string;
	/** Ephemeral; never persisted. Use onWalletCredentials callback if needed. */
	privateKey?: string;
}

/** Sentinel for wallet-only sessions. access_token is this value; never use as Bearer token. */
export const WALLET_ONLY_ACCESS_TOKEN = 'wallet-only' as const;

/** True when session has no API token (session_access_token or refresh_token). Do not call protected endpoints. */
export function isWalletOnlySession(session: Session): boolean {
	return !session.session_access_token && !session.refresh_token;
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
	id_token?: string;
	expires_in: number;
	user?: AuthUser;
}

/** Refresh response - user optional; preserve from existing session when omitted */
export interface RefreshResponse {
	access_token: string;
	refresh_token?: string;
	id_token?: string;
	expires_in: number;
	user?: AuthUser;
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
