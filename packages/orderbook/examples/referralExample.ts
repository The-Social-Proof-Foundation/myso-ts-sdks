// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0
import { execSync } from 'child_process';
import { MySoGrpcClient } from '@socialproof/myso/grpc';
import { Transaction } from '@socialproof/myso/transactions';

import { orderbook } from '../src/index.js';

const MYSO = process.env.MYSO_BINARY ?? `myso`;

export const getActiveAddress = () => {
	return execSync(`${MYSO} client active-address`, { encoding: 'utf8' }).trim();
};

const GRPC_URLS = {
	mainnet: 'https://fullnode.mainnet.mysocial.network:443',
	testnet: 'https://fullnode.testnet.mysocial.network:443',
} as const;

(async () => {
	// Update constant for network
	const network = 'testnet';
	const adminCap = '0x29a62a5385c549dd8e9565312265d2bda0b8700c1560b3e34941671325daae77';
	const marginAdminCap = '0x42a2e769541d272e624c54fff72b878fb0be670776c2b34ef07be5308480650e';
	const marginMaintainerCap = '0xc4bc2b7a2b1f317b8a664294c5cc8501520289c3a6e9b9cc04eef668415b59bf';

	// Initialize with balance managers if needed
	const balanceManagers = {
		BALANCE_MANAGER_1: {
			address: '0x81fd9e1eb2a86643fc84c1e90b908f8a1d30896613c1afede985c041d1e34224',
			tradeCap: '0x46d0afbc50a3af2ee36359ed0624dddf9b7d08807ce96c2d8e65a4c38e3a7e5f',
		},
	};
	const marginManagers = {
		MARGIN_MANAGER_1: {
			address: '0x70a5f28a2400fca515adce1262da0b45ba8f3d1e48f1f2a9568aa29642b5c104',
			poolKey: 'MYSO_DBUSDC',
		},
	};

	const mysoDbusdcOrderbookReferral =
		'0x35db71e6431935bde42803fdad7f69d4688bc92abb5e1522bbb8aa3db33c5169';
	const deepMySoOrderbookReferral =
		'0x1f6fbf3ecaa948df7b448c932f9f72a604477be63de199d37cee8a9a863c31eb';

	const client = new MySoGrpcClient({ network, baseUrl: GRPC_URLS[network] }).$extend(
		orderbook({
			address: getActiveAddress(),
			adminCap,
			marginAdminCap,
			balanceManagers,
			marginManagers,
			marginMaintainerCap,
		}),
	);

	const tx = new Transaction();

	// --- Orderbook Pool Referral Functions ---

	// // 1. Mint a new referral for a pool (multiplier determines fee share)
	client.orderbook.orderbook.mintReferral('MYSO_DBUSDC', 1)(tx);
	client.orderbook.orderbook.mintReferral('DEEP_MYSO', 0.5)(tx);

	// // 2. Update the multiplier for an existing referral
	client.orderbook.orderbook.updatePoolReferralMultiplier(
		'MYSO_DBUSDC',
		mysoDbusdcOrderbookReferral,
		0.75,
	)(tx);

	// // 3. Claim referral rewards (returns base, quote, and deep coins)
	const { baseRewards, quoteRewards, deepRewards } =
		client.orderbook.orderbook.claimPoolReferralRewards('MYSO_DBUSDC', mysoDbusdcOrderbookReferral)(tx);
	tx.transferObjects([baseRewards, quoteRewards, deepRewards], getActiveAddress());

	// --- Balance Manager Referral Functions ---

	// // 4. Set a referral for a balance manager (requires tradeCap)
	client.orderbook.balanceManager.setBalanceManagerReferral(
		'BALANCE_MANAGER_1',
		mysoDbusdcOrderbookReferral,
		tx.object(balanceManagers.BALANCE_MANAGER_1.tradeCap),
	)(tx);

	// // 5. Unset a referral for a balance manager (requires poolKey and tradeCap)
	client.orderbook.balanceManager.unsetBalanceManagerReferral(
		'BALANCE_MANAGER_1',
		'MYSO_DBUSDC',
		tx.object(balanceManagers.BALANCE_MANAGER_1.tradeCap),
	)(tx);

	// --- Margin Manager Referral Functions ---

	// // 6. Set a referral for a margin manager (OrderbookPoolReferral)
	client.orderbook.marginManager.setMarginManagerReferral(
		'MARGIN_MANAGER_1',
		mysoDbusdcOrderbookReferral,
	)(tx);

	// // 7. Unset a referral for a margin manager
	client.orderbook.marginManager.unsetMarginManagerReferral('MARGIN_MANAGER_1', 'MYSO_DBUSDC')(tx);

	// // 8. Mint a supply referral for a margin pool
	client.orderbook.marginPool.mintSupplyReferral('MYSO')(tx);

	// // 9. Withdraw referral fees from a margin pool (requires SupplyReferral object)
	const mysoSupplyReferral = '0xaed597fe1a05b9838b198a3dfa2cdd191b6fa7b319f4c3fc676c7b7348cec194';
	const referralFees = client.orderbook.marginPool.withdrawReferralFees(
		'MYSO',
		mysoSupplyReferral,
	)(tx);
	tx.transferObjects([referralFees], getActiveAddress());

	// ==========================================
	// Read-only Functions
	// ==========================================

	// --- Orderbook Pool Referral Read-only Functions ---

	// 1. Get referral balances for each pool
	console.log('\n--- Orderbook Pool Referral: getPoolReferralBalances ---');
	const mysoDbusdcReferralBalances = await client.orderbook.getPoolReferralBalances(
		'MYSO_DBUSDC',
		mysoDbusdcOrderbookReferral,
	);
	console.log('MYSO_DBUSDC Referral Balances:', mysoDbusdcReferralBalances);

	const deepMySoReferralBalances = await client.orderbook.getPoolReferralBalances(
		'DEEP_MYSO',
		deepMySoOrderbookReferral,
	);
	console.log('DEEP_MYSO Referral Balances:', deepMySoReferralBalances);

	// 2. Get multiplier for referrals
	console.log('\n--- Orderbook Pool Referral: poolReferralMultiplier ---');
	console.log(
		'MYSO_DBUSDC Multiplier:',
		await client.orderbook.poolReferralMultiplier('MYSO_DBUSDC', mysoDbusdcOrderbookReferral),
	);
	console.log(
		'DEEP_MYSO Multiplier:',
		await client.orderbook.poolReferralMultiplier('DEEP_MYSO', deepMySoOrderbookReferral),
	);

	// --- Balance Manager Referral Read-only Functions ---

	// 3. Get owner of the referrals
	console.log('\n--- Balance Manager Referral: balanceManagerReferralOwner ---');
	const mysoDbusdcReferralOwner =
		await client.orderbook.balanceManagerReferralOwner(mysoDbusdcOrderbookReferral);
	console.log('MYSO_DBUSDC Referral Owner:', mysoDbusdcReferralOwner);

	const deepMySoReferralOwner =
		await client.orderbook.balanceManagerReferralOwner(deepMySoOrderbookReferral);
	console.log('DEEP_MYSO Referral Owner:', deepMySoReferralOwner);

	// 4. Get pool ID from referral
	console.log('\n--- Balance Manager Referral: balanceManagerReferralPoolId ---');
	console.log(
		'MYSO_DBUSDC Pool ID:',
		await client.orderbook.balanceManagerReferralPoolId(mysoDbusdcOrderbookReferral),
	);
	console.log(
		'DEEP_MYSO Pool ID:',
		await client.orderbook.balanceManagerReferralPoolId(deepMySoOrderbookReferral),
	);

	// 5. Get the referral ID set on the balance manager
	console.log('\n--- Balance Manager Referral: getBalanceManagerReferralId ---');
	const mysoDbusdcReferralId = await client.orderbook.getBalanceManagerReferralId(
		'BALANCE_MANAGER_1',
		'MYSO_DBUSDC',
	);
	console.log('MYSO_DBUSDC Referral ID on BALANCE_MANAGER_1:', mysoDbusdcReferralId);

	const deepMySoReferralId = await client.orderbook.getBalanceManagerReferralId(
		'BALANCE_MANAGER_1',
		'DEEP_MYSO',
	);
	console.log('DEEP_MYSO Referral ID on BALANCE_MANAGER_1:', deepMySoReferralId);
})();
