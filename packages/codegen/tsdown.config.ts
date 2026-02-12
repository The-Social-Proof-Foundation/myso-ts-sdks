// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import { defineConfig } from 'tsdown';

export default defineConfig({
	entry: ['src/index.ts', 'src/bin/cli.ts', 'src/bin/bash-complete.ts'],
	format: 'esm',
	dts: true,
	outDir: 'dist',
	unbundle: true,
});
