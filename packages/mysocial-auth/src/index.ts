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
} from './types.js';
export {
	MySocialAuthError,
	PopupBlockedError,
	PopupClosedError,
	AuthTimeoutError,
	InvalidOriginError,
	InvalidSourceError,
	InvalidStateError,
} from './errors.js';
export { getPopupFeatures } from './popup-utils.js';
