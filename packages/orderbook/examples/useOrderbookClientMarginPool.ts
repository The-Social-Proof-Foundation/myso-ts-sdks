// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0
import { orderbook } from '../src/client.js';
import { MySoGrpcClient } from '@socialproof/myso/grpc';

const GRPC_URLS = {
	mainnet: 'https://fullnode.mainnet.mysocial.network:443',
	testnet: 'https://fullnode.testnet.mysocial.network:443',
} as const;

(async () => {
	const network = 'testnet';
	const client = new MySoGrpcClient({ network, baseUrl: GRPC_URLS[network] }).$extend(
		orderbook({
			address: '0x0',
		}),
	);

	console.log('=== Testing Orderbook Client Functions ===\n');

	// Original read-only calls
	console.log('--- Original Functions ---');
	try {
		console.log(
			'Manager Balance (MYSO):',
			await client.orderbook.checkManagerBalance('MANAGER_1', 'MYSO'),
		);
		console.log(
			'Level 2 Range (MYSO_DBUSDC):',
			await client.orderbook.getLevel2Range('MYSO_DBUSDC', 0.1, 100, true),
		);
	} catch (error) {
		console.log('Error with original functions:', (error as Error).message);
	}

	console.log('\n--- Testing New Margin Pool Functions ---');

	// Test margin pool functions for MYSO
	const coinKey = 'MYSO';
	const testSupplierCapId = '0x2e0d4a8deabf642108f4492134f72b7e14e327adbaf57db83f9ba5e7ed2a0fc4'; // Example supplier cap ID
	const testOrderbookPoolId = '0x1c19362ca52b8ffd7a33cee805a67d40f31e6ba303753fd3a4cfdfacea7163a5'; // Example orderbook pool ID

	try {
		// Test basic margin pool info
		console.log('\n1. Basic Margin Pool Information:');
		const marginPoolId = await client.orderbook.getMarginPoolId(coinKey);
		console.log(`Margin Pool ID (${coinKey}):`, marginPoolId);

		const isAllowed = await client.orderbook.isOrderbookPoolAllowed(coinKey, testOrderbookPoolId);
		console.log(`Orderbook Pool Allowed (${coinKey}):`, isAllowed);

		// Test supply/borrow statistics
		console.log('\n2. Supply/Borrow Statistics:');
		const totalSupply = await client.orderbook.getMarginPoolTotalSupply(coinKey, 6);
		console.log(`Total Supply (${coinKey}):`, totalSupply);

		const supplyShares = await client.orderbook.getMarginPoolSupplyShares(coinKey, 6);
		console.log(`Supply Shares (${coinKey}):`, supplyShares);

		const totalBorrow = await client.orderbook.getMarginPoolTotalBorrow(coinKey, 6);
		console.log(`Total Borrow (${coinKey}):`, totalBorrow);

		const borrowShares = await client.orderbook.getMarginPoolBorrowShares(coinKey, 6);
		console.log(`Borrow Shares (${coinKey}):`, borrowShares);

		// Test timestamps and configuration
		console.log('\n3. Timestamps and Configuration:');
		const lastUpdate = await client.orderbook.getMarginPoolLastUpdateTimestamp(coinKey);
		console.log(`Last Update Timestamp (${coinKey}):`, new Date(lastUpdate).toISOString());

		const supplyCap = await client.orderbook.getMarginPoolSupplyCap(coinKey, 6);
		console.log(`Supply Cap (${coinKey}):`, supplyCap);

		const maxUtilization = await client.orderbook.getMarginPoolMaxUtilizationRate(coinKey);
		console.log(`Max Utilization Rate (${coinKey}):`, `${(maxUtilization * 100).toFixed(2)}%`);

		const protocolSpread = await client.orderbook.getMarginPoolProtocolSpread(coinKey);
		console.log(`Protocol Spread (${coinKey}):`, `${(protocolSpread * 100).toFixed(4)}%`);

		const minBorrow = await client.orderbook.getMarginPoolMinBorrow(coinKey, 6);
		console.log(`Min Borrow (${coinKey}):`, minBorrow);

		const interestRate = await client.orderbook.getMarginPoolInterestRate(coinKey);
		console.log(`Interest Rate (${coinKey}):`, `${(interestRate * 100).toFixed(4)}%`);

		// Test user-specific functions (these might fail if supplier cap doesn't exist)
		console.log("\n4. User-Specific Functions (may fail if supplier cap doesn't exist):");
		try {
			const userSupplyShares = await client.orderbook.getUserSupplyShares(
				coinKey,
				testSupplierCapId,
				6,
			);
			console.log(`User Supply Shares (${coinKey}):`, userSupplyShares);

			const userSupplyAmount = await client.orderbook.getUserSupplyAmount(
				coinKey,
				testSupplierCapId,
				6,
			);
			console.log(`User Supply Amount (${coinKey}):`, userSupplyAmount);
		} catch (userError) {
			console.log(
				"User-specific functions failed (expected if supplier cap doesn't exist):",
				(userError as Error).message,
			);
		}

		// Test with DBUSDC as well
		console.log('\n5. Testing with DBUSDC:');
		const dbusdcCoinKey = 'DBUSDC';
		try {
			// Basic information
			const dbusdcMarginPoolId = await client.orderbook.getMarginPoolId(dbusdcCoinKey);
			console.log(`Margin Pool ID (${dbusdcCoinKey}):`, dbusdcMarginPoolId);

			const dbusdcIsAllowed = await client.orderbook.isOrderbookPoolAllowed(
				dbusdcCoinKey,
				testOrderbookPoolId,
			);
			console.log(`Orderbook Pool Allowed (${dbusdcCoinKey}):`, dbusdcIsAllowed);

			// Supply/Borrow Statistics
			const dbusdcTotalSupply = await client.orderbook.getMarginPoolTotalSupply(dbusdcCoinKey, 6);
			console.log(`Total Supply (${dbusdcCoinKey}):`, dbusdcTotalSupply);

			const dbusdcSupplyShares = await client.orderbook.getMarginPoolSupplyShares(dbusdcCoinKey, 6);
			console.log(`Supply Shares (${dbusdcCoinKey}):`, dbusdcSupplyShares);

			const dbusdcTotalBorrow = await client.orderbook.getMarginPoolTotalBorrow(dbusdcCoinKey, 6);
			console.log(`Total Borrow (${dbusdcCoinKey}):`, dbusdcTotalBorrow);

			const dbusdcBorrowShares = await client.orderbook.getMarginPoolBorrowShares(dbusdcCoinKey, 6);
			console.log(`Borrow Shares (${dbusdcCoinKey}):`, dbusdcBorrowShares);

			// Timestamps and Configuration
			const dbusdcLastUpdate =
				await client.orderbook.getMarginPoolLastUpdateTimestamp(dbusdcCoinKey);
			console.log(
				`Last Update Timestamp (${dbusdcCoinKey}):`,
				new Date(dbusdcLastUpdate).toISOString(),
			);

			const dbusdcSupplyCap = await client.orderbook.getMarginPoolSupplyCap(dbusdcCoinKey, 6);
			console.log(`Supply Cap (${dbusdcCoinKey}):`, dbusdcSupplyCap);

			const dbusdcMaxUtilization =
				await client.orderbook.getMarginPoolMaxUtilizationRate(dbusdcCoinKey);
			console.log(
				`Max Utilization Rate (${dbusdcCoinKey}):`,
				`${(dbusdcMaxUtilization * 100).toFixed(2)}%`,
			);

			const dbusdcProtocolSpread = await client.orderbook.getMarginPoolProtocolSpread(dbusdcCoinKey);
			console.log(
				`Protocol Spread (${dbusdcCoinKey}):`,
				`${(dbusdcProtocolSpread * 100).toFixed(4)}%`,
			);

			const dbusdcMinBorrow = await client.orderbook.getMarginPoolMinBorrow(dbusdcCoinKey, 6);
			console.log(`Min Borrow (${dbusdcCoinKey}):`, dbusdcMinBorrow);

			const dbusdcInterestRate = await client.orderbook.getMarginPoolInterestRate(dbusdcCoinKey);
			console.log(`Interest Rate (${dbusdcCoinKey}):`, `${(dbusdcInterestRate * 100).toFixed(4)}%`);

			// User-specific functions (may fail if supplier cap doesn't exist)
			try {
				const dbusdcUserSupplyShares = await client.orderbook.getUserSupplyShares(
					dbusdcCoinKey,
					testSupplierCapId,
					6,
				);
				console.log(`User Supply Shares (${dbusdcCoinKey}):`, dbusdcUserSupplyShares);

				const dbusdcUserSupplyAmount = await client.orderbook.getUserSupplyAmount(
					dbusdcCoinKey,
					testSupplierCapId,
					6,
				);
				console.log(`User Supply Amount (${dbusdcCoinKey}):`, dbusdcUserSupplyAmount);
			} catch (userError) {
				console.log(
					`DBUSDC user-specific functions failed (expected if supplier cap doesn't exist):`,
					(userError as Error).message,
				);
			}
		} catch (dbusdcError) {
			console.log(`DBUSDC margin pool functions failed:`, (dbusdcError as Error).message);
		}
	} catch (error) {
		console.error('Error testing margin pool functions:', (error as Error).message);
		console.error('Stack trace:', (error as Error).stack);
	}
})();
