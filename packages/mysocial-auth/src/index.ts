// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

export { createMySocialAuth } from './createMySocialAuth.js';
export type { MySocialAuth } from './auth.js';
export type {
	MySocialAuthConfig,
	SignInOptions,
	Session,
	AuthUser,
	AuthProvider,
	AuthMode,
	StorageAdapter,
	StorageOption,
	RefreshResponse,
	WalletResultMessage,
	WalletCredentials,
} from './types.js';
export { WALLET_ONLY_ACCESS_TOKEN, isWalletOnlySession } from './types.js';
export {
	MySocialAuthError,
	PopupBlockedError,
	PopupClosedError,
	AuthTimeoutError,
	InvalidOriginError,
	InvalidSourceError,
	InvalidStateError,
	SessionRevokedError,
	RateLimitError,
} from './errors.js';
export { getPopupFeatures } from './popup-utils.js';
