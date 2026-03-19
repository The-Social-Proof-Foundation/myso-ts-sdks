// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import { defineConfig } from 'tsdown';

export default defineConfig({
	entry: ['src/MySo.ts'],
	format: 'esm',
	dts: true,
	outDir: 'dist',
	// Bundle all dependencies
	external: [],
});
