// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		testTimeout: 30000,
	},
	resolve: {
		alias: {
			'@socialproof/bcs': new URL('../bcs/src', import.meta.url).pathname,
			'@socialproof/myso': new URL('../myso/src', import.meta.url).pathname,
			'@socialproof/utils': new URL('../utils/src', import.meta.url).pathname,
			'@socialproof/file-storage-wasm': new URL('../file-storage-wasm', import.meta.url).pathname,
		},
	},
});
