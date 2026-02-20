// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import type { MySocialAuthConfig } from './types.js';
import type { MySocialAuth } from './auth.js';
import { createAuth } from './auth.js';

/**
 * Create a MySocial Auth instance for "Login with MySocial".
 *
 * @param config - SDK configuration (apiBaseUrl, authOrigin, clientId, redirectUri, etc.)
 * @returns MySocialAuth instance with signIn, signOut, getSession, refresh, handleRedirectCallback, onAuthStateChange
 */
export function createMySocialAuth(config: MySocialAuthConfig): MySocialAuth {
	return createAuth(config);
}
