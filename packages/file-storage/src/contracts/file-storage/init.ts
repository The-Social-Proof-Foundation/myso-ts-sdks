/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/
import { MoveStruct, normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
import { bcs } from '@socialproof/myso/bcs';
import { type Transaction } from '@socialproof/myso/transactions';
import * as _package from './deps/myso/package.js';
const $moduleName = '@local-pkg/file-storage::init';
export const INIT = new MoveStruct({
	name: `${$moduleName}::INIT`,
	fields: {
		dummy_field: bcs.bool(),
	},
});
export const InitCap = new MoveStruct({
	name: `${$moduleName}::InitCap`,
	fields: {
		id: bcs.Address,
		publisher: _package.Publisher,
	},
});
export interface InitializeFileStorageArguments {
	initCap: RawTransactionArgument<string>;
	upgradeCap: RawTransactionArgument<string>;
	epochZeroDuration: RawTransactionArgument<number | bigint>;
	epochDuration: RawTransactionArgument<number | bigint>;
	nShards: RawTransactionArgument<number>;
	maxEpochsAhead: RawTransactionArgument<number>;
}
export interface InitializeFileStorageOptions {
	package?: string;
	arguments:
		| InitializeFileStorageArguments
		| [
				initCap: RawTransactionArgument<string>,
				upgradeCap: RawTransactionArgument<string>,
				epochZeroDuration: RawTransactionArgument<number | bigint>,
				epochDuration: RawTransactionArgument<number | bigint>,
				nShards: RawTransactionArgument<number>,
				maxEpochsAhead: RawTransactionArgument<number>,
		  ];
}
/**
 * Initializes File Storage and shares the system and staking objects.
 *
 * This can only be called once, after which the `InitCap` is destroyed.
 */
export function initializeFileStorage(options: InitializeFileStorageOptions) {
	const packageAddress = options.package ?? '@local-pkg/file-storage';
	const argumentsTypes = [null, null, 'u64', 'u64', 'u16', 'u32', '0x2::clock::Clock'] satisfies (
		| string
		| null
	)[];
	const parameterNames = [
		'initCap',
		'upgradeCap',
		'epochZeroDuration',
		'epochDuration',
		'nShards',
		'maxEpochsAhead',
	];
	return (tx: Transaction) =>
		tx.moveCall({
			package: packageAddress,
			module: 'init',
			function: 'initialize_file-storage',
			arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
		});
}
export interface MigrateArguments {
	staking: RawTransactionArgument<string>;
	system: RawTransactionArgument<string>;
}
export interface MigrateOptions {
	package?: string;
	arguments:
		| MigrateArguments
		| [staking: RawTransactionArgument<string>, system: RawTransactionArgument<string>];
}
/**
 * Migrates the staking and system objects to the new package ID.
 *
 * This must be called in the new package after an upgrade is committed to emit an
 * event that informs all storage nodes and prevent previous package versions from
 * being used.
 *
 * Requires the migration epoch to be set first on the staking object, which then
 * enables the migration at the start of the next epoch.
 */
export function migrate(options: MigrateOptions) {
	const packageAddress = options.package ?? '@local-pkg/file-storage';
	const argumentsTypes = [null, null] satisfies (string | null)[];
	const parameterNames = ['staking', 'system'];
	return (tx: Transaction) =>
		tx.moveCall({
			package: packageAddress,
			module: 'init',
			function: 'migrate',
			arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
		});
}
