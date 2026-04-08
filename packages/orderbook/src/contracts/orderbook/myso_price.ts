/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/

/**
 * MySo price module. This module maintains the conversion rate between MySo and
 * the base and quote assets.
 */

import { MoveStruct, normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
import { bcs } from '@socialproof/myso/bcs';
import { type Transaction } from '@socialproof/myso/transactions';
const $moduleName = '@orderbook/core::myso_price';
export const Price = new MoveStruct({
	name: `${$moduleName}::Price`,
	fields: {
		conversion_rate: bcs.u64(),
		timestamp: bcs.u64(),
	},
});
export const PriceAdded = new MoveStruct({
	name: `${$moduleName}::PriceAdded`,
	fields: {
		conversion_rate: bcs.u64(),
		timestamp: bcs.u64(),
		is_base_conversion: bcs.bool(),
		reference_pool: bcs.Address,
		target_pool: bcs.Address,
	},
});
export const MySoPrice = new MoveStruct({
	name: `${$moduleName}::MySoPrice`,
	fields: {
		base_prices: bcs.vector(Price),
		cumulative_base: bcs.u64(),
		quote_prices: bcs.vector(Price),
		cumulative_quote: bcs.u64(),
	},
});
export const OrderMySoPrice = new MoveStruct({
	name: `${$moduleName}::OrderMySoPrice`,
	fields: {
		asset_is_base: bcs.bool(),
		myso_per_asset: bcs.u64(),
	},
});
export interface AssetIsBaseArguments {
	self: RawTransactionArgument<string>;
}
export interface AssetIsBaseOptions {
	package?: string;
	arguments: AssetIsBaseArguments | [self: RawTransactionArgument<string>];
}
export function assetIsBase(options: AssetIsBaseOptions) {
	const packageAddress = options.package ?? '@orderbook/core';
	const argumentsTypes = [null] satisfies (string | null)[];
	const parameterNames = ['self'];
	return (tx: Transaction) =>
		tx.moveCall({
			package: packageAddress,
			module: 'myso_price',
			function: 'asset_is_base',
			arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
		});
}
export interface MySoPerAssetArguments {
	self: RawTransactionArgument<string>;
}
export interface MySoPerAssetOptions {
	package?: string;
	arguments: MySoPerAssetArguments | [self: RawTransactionArgument<string>];
}
export function mySoPerAsset(options: MySoPerAssetOptions) {
	const packageAddress = options.package ?? '@orderbook/core';
	const argumentsTypes = [null] satisfies (string | null)[];
	const parameterNames = ['self'];
	return (tx: Transaction) =>
		tx.moveCall({
			package: packageAddress,
			module: 'myso_price',
			function: 'myso_per_asset',
			arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
		});
}
