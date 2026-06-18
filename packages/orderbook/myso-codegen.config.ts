// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import type { MySoCodegenConfig } from '@socialproof/codegen';

// Local / custom chain (optional): add path-based packages and run `myso move summary` in each path.
// On-chain id entries can use `network: 'localnet'` when `@socialproof/codegen` ≥ version that supports
// it; configure the MySo CLI to talk to your local fullnode for `myso move summary --package-id …`.
// Example:
//   { package: '@local-pkg/pyth', path: '../../../orderbook-sandbox-main/sandbox/packages/pyth' },

const config: MySoCodegenConfig = {
	output: './src/contracts',
	packages: [
		{
			package: '@orderbook/core',
			path: '../../../orderbook/packages/orderbook',
		},
		{
			package: '0xabf837e98c26087cba0883c0a7a28326b1fa3c5e1e2c5abdb486f9e8f594c837',
			packageName: 'pyth',
			network: 'testnet',
		},
	],
};

export default config;
