// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import { describe, it, expect } from 'vitest';
import { createStorage } from '../src/storage.js';

describe('storage', () => {
	it('memory storage persists within same instance', () => {
		const storage = createStorage('memory');
		storage.set('k1', 'v1');
		expect(storage.get('k1')).toBe('v1');
		storage.remove('k1');
		expect(storage.get('k1')).toBeNull();
	});

	it('memory is default when no option', () => {
		const storage = createStorage();
		storage.set('k', 'v');
		expect(storage.get('k')).toBe('v');
	});

	it('accepts custom StorageAdapter', () => {
		const custom = {
			store: new Map<string, string>(),
			get: function (k: string) {
				return this.store.get(k) ?? null;
			},
			set: function (k: string, v: string) {
				this.store.set(k, v);
			},
			remove: function (k: string) {
				this.store.delete(k);
			},
		};
		const storage = createStorage(custom);
		storage.set('x', 'y');
		expect(storage.get('x')).toBe('y');
		expect(custom.store.get('x')).toBe('y');
	});
});
