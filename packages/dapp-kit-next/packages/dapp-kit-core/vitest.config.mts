// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
	test: {
		environment: 'node',
		globals: true,
		restoreMocks: true,
		testTimeout: 30000,
		hookTimeout: 30000,
	},
	resolve: {
		alias: {
			'@dappkit/core': resolve(__dirname, './src'),
			'@dappkit/core/test-utils': resolve(__dirname, './test/test-utils'),
			'@socialproof/myso': resolve(__dirname, '../../../myso/src'),
			'@socialproof/wallet-standard': resolve(__dirname, '../../../wallet-standard/src'),
		},
	},
});
