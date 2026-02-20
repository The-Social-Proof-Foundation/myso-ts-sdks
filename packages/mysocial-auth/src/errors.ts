// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

/** Base error for MySocial Auth SDK */
export class MySocialAuthError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'MySocialAuthError';
		Object.setPrototypeOf(this, MySocialAuthError.prototype);
	}
}

/** Popup was blocked by the browser */
export class PopupBlockedError extends MySocialAuthError {
	constructor() {
		super(
			'Popup was blocked by the browser. Call signIn() directly inside a user gesture (e.g. click handler).',
		);
		this.name = 'PopupBlockedError';
		Object.setPrototypeOf(this, PopupBlockedError.prototype);
	}
}

/** User closed the popup before completion */
export class PopupClosedError extends MySocialAuthError {
	constructor() {
		super('User closed the popup before completing authentication.');
		this.name = 'PopupClosedError';
		Object.setPrototypeOf(this, PopupClosedError.prototype);
	}
}

/** No postMessage received within timeout */
export class AuthTimeoutError extends MySocialAuthError {
	constructor() {
		super('Authentication timed out. No response received from the popup.');
		this.name = 'AuthTimeoutError';
		Object.setPrototypeOf(this, AuthTimeoutError.prototype);
	}
}

/** postMessage origin does not match expected authOrigin */
export class InvalidOriginError extends MySocialAuthError {
	constructor() {
		super('Invalid message origin. Expected message from auth.mysocial.network.');
		this.name = 'InvalidOriginError';
		Object.setPrototypeOf(this, InvalidOriginError.prototype);
	}
}

/** postMessage source is not the popup window */
export class InvalidSourceError extends MySocialAuthError {
	constructor() {
		super('Invalid message source. Message must come from the auth popup.');
		this.name = 'InvalidSourceError';
		Object.setPrototypeOf(this, InvalidSourceError.prototype);
	}
}

/** State or nonce mismatch (replay protection) */
export class InvalidStateError extends MySocialAuthError {
	constructor() {
		super('Invalid state or nonce. Possible replay attack.');
		this.name = 'InvalidStateError';
		Object.setPrototypeOf(this, InvalidStateError.prototype);
	}
}
