// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import type { MySoCodegenConfig } from './src/config.js';

const config: MySoCodegenConfig = {
	output: './tests/generated',
	packages: [
		{
			package: '@local-pkg/file_storage_subsidies',
			path: './tests/move/subsidies',
		},
		{
			package: '@local-pkg/wal',
			path: './tests/move/wal',
		},
		{
			package: '@local-pkg/wal_exchange',
			path: './tests/move/wal_exchange',
		},
		{
			package: '@local-pkg/file-storage',
			path: './tests/move/file-storage',
		},
		{
			package: '@local-pkg/conflict_test',
			path: './tests/move/conflict_test',
		},
	],
};

export default config;
