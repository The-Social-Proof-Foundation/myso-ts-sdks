// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import { defineConfig } from 'tsdown';

export default defineConfig({
	entry: ['src/aws/index.ts', 'src/gcp/index.ts', 'src/ledger/index.ts', 'src/webcrypto/index.ts'],
	format: 'esm',
	dts: true,
	outDir: 'dist',
	unbundle: true,
});
