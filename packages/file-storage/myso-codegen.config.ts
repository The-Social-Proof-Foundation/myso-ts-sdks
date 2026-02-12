// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import type { MySoCodegenConfig } from '@socialproof/codegen';

const config: MySoCodegenConfig = {
	output: './src/contracts',
	packages: [
		{
			package: '@local-pkg/wal_exchange',
			path: '../../../file-storage/contracts/wal_exchange',
		},
		{
			package: '@local-pkg/file-storage',
			path: '../../../file-storage/contracts/file-storage',
		},
	],
};

export default config;
