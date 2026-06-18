// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import type { MySoCodegenConfig } from '@socialproof/codegen';

const config: MySoCodegenConfig = {
	output: './src/contracts',
	packages: [
		{
			package: '@local-pkg/contra',
			path: '../../../myso-core/crates/myso-framework/packages/contra',
		},
		{
			package: '0x2',
			packageName: 'myso',
			path: '../../../myso-core/crates/myso-framework/packages/myso-framework/myso-framework',
			generate: {
				modules: ['dynamic_field'],
				functions: false,
			},
		},
	],
};

export default config;
