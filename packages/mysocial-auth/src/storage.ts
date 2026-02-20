// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import type { StorageAdapter, StorageOption } from './types.js';

const SESSION_KEY = 'mysocial_auth_session';
const REDIRECT_STATE_PREFIX = 'mysocial_auth_redirect_';

/** In-memory storage (default, most secure) */
function createMemoryStorage(): StorageAdapter {
	const store = new Map<string, string>();
	return {
		get: (k) => store.get(k) ?? null,
		set: (k, v) => store.set(k, v),
		remove: (k) => store.delete(k),
	};
}

/** sessionStorage adapter (persists across reloads in same tab) */
function createSessionStorage(): StorageAdapter {
	return {
		get: (k) => (typeof sessionStorage !== 'undefined' ? sessionStorage.getItem(k) : null),
		set: (k, v) => sessionStorage?.setItem(k, v),
		remove: (k) => sessionStorage?.removeItem(k),
	};
}

/** sessionStorage for redirect state (always used for redirect flow; memory not viable across navigation) */
export const redirectStorage: StorageAdapter =
	typeof sessionStorage !== 'undefined' ? createSessionStorage() : createMemoryStorage();

export function createStorage(option?: StorageOption): StorageAdapter {
	if (option === 'session') return createSessionStorage();
	if (
		option &&
		typeof option === 'object' &&
		typeof (option as StorageAdapter).get === 'function' &&
		typeof (option as StorageAdapter).set === 'function' &&
		typeof (option as StorageAdapter).remove === 'function'
	) {
		return option as StorageAdapter;
	}
	return createMemoryStorage();
}

export { SESSION_KEY, REDIRECT_STATE_PREFIX };
