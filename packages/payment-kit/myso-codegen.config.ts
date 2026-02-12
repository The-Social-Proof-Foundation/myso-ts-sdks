// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import type { MySoCodegenConfig } from '@socialproof/codegen';

const config: MySoCodegenConfig = {
	output: './src/contracts',
	packages: [
		{
			package: '@socialproof/payment-kit',
			path: '../../../myso-payment-kit',
		},
	],
};

export default config;
