// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

/**
 * This example demonstrates how to use the getMarginManagerStates function
 * to retrieve comprehensive state information for multiple margin managers
 * in a single transaction.
 */

import { MySoGrpcClient } from '@socialproof/myso/grpc';

import { orderbook } from '../src/index.js';

const GRPC_URLS = {
	mainnet: 'https://fullnode.mainnet.mysocial.network:443',
	testnet: 'https://fullnode.testnet.mysocial.network:443',
} as const;

(async () => {
	const network = 'mainnet';

	const client = new MySoGrpcClient({ network, baseUrl: GRPC_URLS[network] }).$extend(
		orderbook({
			address: '0x0000000000000000000000000000000000000000000000000000000000000000',
		}),
	);

	console.log('Fetching states for multiple margin managers...\n');

	try {
		// Pass a map of marginManagerId -> poolKey
		const states = await client.orderbook.getMarginManagerStates({
			'0x206037fde5be6467ce077efee944e8cefdd6e2b6247982a0fae36bdec2a96076': 'MYSO_USDC',
			'0x14218d017d7e428236bd6876e081e018ec5b1cf9e7e430c2199df3c3c3596c9f': 'DEEP_USDC',
			'0xaf3142fc3791540b51f3cb6604b0daa2afd17b7fc3a368a80e8b0c3358e2584a': 'MYSO_USDC',
		});

		console.log(`Retrieved states for ${Object.keys(states).length} margin managers:\n`);

		// Results are keyed by managerId
		for (const [managerId, state] of Object.entries(states)) {
			console.log('Manager ID:', managerId);
			console.log('  Orderbook Pool ID:', state.orderbookPoolId);
			console.log('  Risk Ratio:', state.riskRatio);
			console.log('  Base Asset:', state.baseAsset);
			console.log('  Quote Asset:', state.quoteAsset);
			console.log('  Base Debt:', state.baseDebt);
			console.log('  Quote Debt:', state.quoteDebt);
			console.log('  Base Pyth Price:', state.basePythPrice);
			console.log('  Base Pyth Decimals:', state.basePythDecimals);
			console.log('  Quote Pyth Price:', state.quotePythPrice);
			console.log('  Quote Pyth Decimals:', state.quotePythDecimals);
			console.log('  Current Price:', state.currentPrice.toString());
			console.log('  Lowest Trigger Above Price:', state.lowestTriggerAbovePrice.toString());
			console.log('  Highest Trigger Below Price:', state.highestTriggerBelowPrice.toString());
			console.log('');
		}
	} catch (error) {
		console.error('Error fetching margin manager states:', error);
	}
})();
