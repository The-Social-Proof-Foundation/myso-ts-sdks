// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import type { IGraphQLConfig } from 'graphql-config';

const config: IGraphQLConfig = {
	projects: {
		tsSDK: {
			schema: './packages/myso/src/graphql/generated/latest/schema.graphql',
			documents: ['./packages/myso/src/graphql/queries/**/*.graphql'],
			include: ['./packages/myso/src/graphql/queries/**/*.graphql'],
		},
	},
};

export default config;
