// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0
import type { MySoClientTypes } from '@socialproof/myso/client';
import { normalizeMySoAddress } from '@socialproof/myso/utils';

import { BalanceManagerContract } from '../transactions/balanceManager.js';
import type { BalanceManager, MarginManager, Coin, Pool, MarginPool } from '../types/index.js';
import type {
	CoinMap,
	PoolMap,
	MarginPoolMap,
	OrderbookDeployment,
	OrderbookPackageIds,
	OrderbookPythConfig,
} from './constants.js';
import { ResourceNotFoundError, ErrorMessages } from './errors.js';
import {
	localnetCoins,
	localnetMarginPools,
	localnetPackageIds,
	localnetPools,
	localnetPythConfigs,
	mainnetCoins,
	mainnetMarginPools,
	mainnetPackageIds,
	mainnetPools,
	mainnetPythConfigs,
	testnetCoins,
	testnetMarginPools,
	testnetPackageIds,
	testnetPools,
	testnetPythConfigs,
} from './constants.js';

type OrderbookProfile = 'mainnet' | 'testnet' | 'localnet';

function orderbookNetworkProfile(network: MySoClientTypes.Network): OrderbookProfile {
	if (network === 'mainnet') {
		return 'mainnet';
	}

	if (network === 'testnet') {
		return 'testnet';
	}

	if (network === 'localnet' || network === 'devnet') {
		return 'localnet';
	}

	throw new Error(
		`Orderbook supports 'mainnet', 'testnet', 'localnet', and 'devnet' networks, got '${network}'`,
	);
}

function mergePackageIds(
	base: OrderbookPackageIds,
	partial?: Partial<OrderbookPackageIds>,
): OrderbookPackageIds {
	return partial ? { ...base, ...partial } : base;
}

function mergePythConfig(
	base: OrderbookPythConfig,
	partial?: Partial<OrderbookPythConfig>,
): OrderbookPythConfig {
	return partial ? { ...base, ...partial } : base;
}

// Constants for numerical precision and scaling
export const FLOAT_SCALAR = 1_000_000_000; // 10^9 - Used for floating point representation
export const MYSO_SCALAR = 1_000_000_000; // 10^9 - MYSO token decimal places
export const MYUSD_SCALAR = 1_000_000; // 10^6 - MYUSD (MYSO_USDE) decimal places

// Time-related constants
export const MAX_TIMESTAMP = 1_844_674_407_370_955_161n; // Maximum Unix timestamp (approximately year 2554)
export const PRICE_INFO_OBJECT_MAX_AGE_MS = 30_000; // 30 seconds in milliseconds

// Transaction and fee constants
export const GAS_BUDGET = 250_000_000; // 0.25 MYSO (0.5 * 500M MIST)
export const POOL_CREATION_FEE_MYUSD = 500_000_000; // 500 MYUSD (500 * 10^6)

export const PYTH_HERMES_MAINNET = 'https://hermes.pyth.network';
export const PYTH_HERMES_NON_MAINNET = 'https://hermes-beta.pyth.network';

/**
 * Hermes URL for Pyth price updates. Precedence: explicitUrl, PYTH_HERMES_URL env, then network (mainnet → prod Hermes, else beta).
 */
export function resolvePythHermesBaseUrl(
	network: MySoClientTypes.Network,
	options?: { explicitUrl?: string },
): string {
	if (options?.explicitUrl) {
		return options.explicitUrl;
	}

	if (typeof process !== 'undefined' && process.env.PYTH_HERMES_URL) {
		return process.env.PYTH_HERMES_URL;
	}

	return network === 'mainnet' ? PYTH_HERMES_MAINNET : PYTH_HERMES_NON_MAINNET;
}

export class OrderbookConfig {
	#coins: CoinMap;
	#pools: PoolMap;
	#marginPools: MarginPoolMap;
	network: MySoClientTypes.Network;
	balanceManagers: { [key: string]: BalanceManager };
	marginManagers: { [key: string]: MarginManager };
	address: string;
	pyth: OrderbookPythConfig;

	ORDERBOOK_PACKAGE_ID: string;
	REGISTRY_ID: string;
	MYUSD_TREASURY_ID: string;
	MARGIN_PACKAGE_ID: string;
	MARGIN_REGISTRY_ID: string;
	LIQUIDATION_PACKAGE_ID: string;
	adminCap?: string;
	marginAdminCap?: string;
	marginMaintainerCap?: string;

	balanceManager: BalanceManagerContract;

	constructor({
		network,
		address,
		adminCap,
		marginAdminCap,
		marginMaintainerCap,
		balanceManagers,
		marginManagers,
		coins,
		pools,
		marginPools,
		deployment,
	}: {
		network: MySoClientTypes.Network;
		address: string;
		adminCap?: string;
		marginAdminCap?: string;
		marginMaintainerCap?: string;
		balanceManagers?: { [key: string]: BalanceManager };
		marginManagers?: { [key: string]: MarginManager };
		coins?: CoinMap;
		pools?: PoolMap;
		marginPools?: MarginPoolMap;
		deployment?: OrderbookDeployment;
	}) {
		this.network = network;
		this.address = normalizeMySoAddress(address);
		this.adminCap = adminCap;
		this.marginAdminCap = marginAdminCap;
		this.marginMaintainerCap = marginMaintainerCap;
		this.balanceManagers = balanceManagers || {};
		this.marginManagers = marginManagers || {};

		const profile = orderbookNetworkProfile(network);

		let defaultCoins: CoinMap;
		let defaultPools: PoolMap;
		let defaultMarginPools: MarginPoolMap;
		let basePackageIds: OrderbookPackageIds;
		let basePyth: OrderbookPythConfig;

		if (profile === 'mainnet') {
			defaultCoins = mainnetCoins;
			defaultPools = mainnetPools;
			defaultMarginPools = mainnetMarginPools;
			basePackageIds = mainnetPackageIds;
			basePyth = mainnetPythConfigs;
		} else if (profile === 'testnet') {
			defaultCoins = testnetCoins;
			defaultPools = testnetPools;
			defaultMarginPools = testnetMarginPools;
			basePackageIds = testnetPackageIds;
			basePyth = testnetPythConfigs;
		} else {
			defaultCoins = localnetCoins;
			defaultPools = localnetPools;
			defaultMarginPools = localnetMarginPools;
			basePackageIds = localnetPackageIds;
			basePyth = localnetPythConfigs;
		}

		const packageIds = mergePackageIds(basePackageIds, deployment?.packageIds);
		this.ORDERBOOK_PACKAGE_ID = packageIds.ORDERBOOK_PACKAGE_ID;
		this.REGISTRY_ID = packageIds.REGISTRY_ID;
		this.MYUSD_TREASURY_ID = packageIds.MYUSD_TREASURY_ID;
		this.MARGIN_PACKAGE_ID = packageIds.MARGIN_PACKAGE_ID;
		this.MARGIN_REGISTRY_ID = packageIds.MARGIN_REGISTRY_ID;
		this.LIQUIDATION_PACKAGE_ID = packageIds.LIQUIDATION_PACKAGE_ID;
		this.pyth = mergePythConfig(basePyth, deployment?.pyth);
		this.#coins = coins || defaultCoins;
		this.#pools = pools || defaultPools;
		this.#marginPools = marginPools || defaultMarginPools;

		this.balanceManager = new BalanceManagerContract(this);
	}

	// Getters
	getCoin(key: string): Coin {
		const coin = this.#coins[key];
		if (!coin) {
			throw new ResourceNotFoundError('Coin', key);
		}

		return coin;
	}

	getPool(key: string): Pool {
		const pool = this.#pools[key];
		if (!pool) {
			throw new ResourceNotFoundError('Pool', key);
		}

		return pool;
	}

	getMarginPool(key: string): MarginPool {
		const pool = this.#marginPools[key];
		if (!pool) {
			throw new ResourceNotFoundError('Margin pool', key);
		}

		return pool;
	}

	/**
	 * @description Get the balance manager by key
	 * @param managerKey Key of the balance manager
	 * @returns The BalanceManager object
	 */
	getBalanceManager(managerKey: string): BalanceManager {
		if (!Object.hasOwn(this.balanceManagers, managerKey)) {
			throw new Error(ErrorMessages.BALANCE_MANAGER_NOT_FOUND(managerKey));
		}

		return this.balanceManagers[managerKey];
	}

	/**
	 * @description Get the margin manager by key
	 * @param managerKey Key of the margin manager
	 * @returns The MarginManager object
	 */
	getMarginManager(managerKey: string): MarginManager {
		if (!Object.hasOwn(this.marginManagers, managerKey)) {
			throw new Error(ErrorMessages.MARGIN_MANAGER_NOT_FOUND(managerKey));
		}

		return this.marginManagers[managerKey];
	}
}
