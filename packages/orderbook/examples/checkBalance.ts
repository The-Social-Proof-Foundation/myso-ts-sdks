// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

/**
 * Check USDC balance for a balance manager on mainnet using a direct address.
 *
 * Usage:
 *   npx tsx examples/checkBalance.ts
 */

import { MySoGrpcClient } from '@socialproof/myso/grpc';

import { orderbook } from '../src/index.js';

const GRPC_URL = 'https://fullnode.mainnet.mysocial.network:443';

(async () => {
	const client = new MySoGrpcClient({ network: 'mainnet', baseUrl: GRPC_URL }).$extend(
		orderbook({ address: '0x0' }),
	);

	const result = await client.orderbook.checkManagerBalanceWithAddress(
		'0x344c2734b1d211bd15212bfb7847c66a3b18803f3f5ab00f5ff6f87b6fe6d27d',
		'USDC',
	);
	console.log(result);
})();
