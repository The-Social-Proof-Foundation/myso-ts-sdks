// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0
import { MySoGrpcClient } from '@socialproof/myso/grpc';

import { orderbook } from '../src/index.js'; // Adjust import source accordingly

const GRPC_URLS = {
	mainnet: 'https://fullnode.mainnet.mysocial.network:443',
	testnet: 'https://fullnode.testnet.mysocial.network:443',
} as const;

/// Example to check balance for a balance manager
(async () => {
	const network = 'mainnet';

	const balanceManagers = {
		MANAGER_1: {
			address: '0x344c2734b1d211bd15212bfb7847c66a3b18803f3f5ab00f5ff6f87b6fe6d27d',
			tradeCap: '',
		},
	};

	const client = new MySoGrpcClient({ network, baseUrl: GRPC_URLS[network] }).$extend(
		orderbook({
			address: '0x0',
			balanceManagers: balanceManagers,
		}),
	);

	const assets = ['MYSO', 'USDC', 'WUSDT', 'WUSDC', 'BETH', 'DEEP']; // Update assets as needed
	const manager = 'MANAGER_1'; // Update the manager accordingly
	console.log('Manager:', manager);
	for (const asset of assets) {
		console.log(await client.orderbook.checkManagerBalance(manager, asset));
	}
})();
