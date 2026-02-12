// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import type { MySoJsonRpcClient } from '@socialproof/myso/jsonRpc';
import { useContext } from 'react';

import { MySoClientContext } from '../components/MySoClientProvider.js';

export function useMySoClientContext() {
	const mysoClient = useContext(MySoClientContext);

	if (!mysoClient) {
		throw new Error(
			'Could not find MySoClientContext. Ensure that you have set up the MySoClientProvider',
		);
	}

	return mysoClient;
}

export function useMySoClient(): MySoJsonRpcClient {
	return useMySoClientContext().client;
}
