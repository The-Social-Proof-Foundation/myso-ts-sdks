/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/

/** Module: wal_exchange */

import { MoveStruct, normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
import { bcs } from '@socialproof/myso/bcs';
import { type Transaction } from '@socialproof/myso/transactions';
import * as balance from './deps/myso/balance.js';
const $moduleName = '@local-pkg/wal_exchange::wal_exchange';
export const ExchangeRate = new MoveStruct({
	name: `${$moduleName}::ExchangeRate`,
	fields: {
		wal: bcs.u64(),
		myso: bcs.u64(),
	},
});
export const Exchange = new MoveStruct({
	name: `${$moduleName}::Exchange`,
	fields: {
		id: bcs.Address,
		wal: balance.Balance,
		myso: balance.Balance,
		rate: ExchangeRate,
		admin: bcs.Address,
	},
});
export const AdminCap = new MoveStruct({
	name: `${$moduleName}::AdminCap`,
	fields: {
		id: bcs.Address,
	},
});
export interface NewExchangeRateArguments {
	wal: RawTransactionArgument<number | bigint>;
	myso: RawTransactionArgument<number | bigint>;
}
export interface NewExchangeRateOptions {
	package?: string;
	arguments:
		| NewExchangeRateArguments
		| [wal: RawTransactionArgument<number | bigint>, myso: RawTransactionArgument<number | bigint>];
}
/** Creates a new exchange rate, making sure it is valid. */
export function newExchangeRate(options: NewExchangeRateOptions) {
	const packageAddress = options.package ?? '@local-pkg/wal_exchange';
	const argumentsTypes = ['u64', 'u64'] satisfies (string | null)[];
	const parameterNames = ['wal', 'myso'];
	return (tx: Transaction) =>
		tx.moveCall({
			package: packageAddress,
			module: 'wal_exchange',
			function: 'new_exchange_rate',
			arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
		});
}
export interface NewOptions {
	package?: string;
	arguments?: [];
}
/**
 * Creates a new shared exchange with a 1:1 exchange rate and returns the
 * associated `AdminCap`.
 */
export function _new(options: NewOptions = {}) {
	const packageAddress = options.package ?? '@local-pkg/wal_exchange';
	return (tx: Transaction) =>
		tx.moveCall({
			package: packageAddress,
			module: 'wal_exchange',
			function: 'new',
		});
}
export interface NewFundedArguments {
	wal: RawTransactionArgument<string>;
	amount: RawTransactionArgument<number | bigint>;
}
export interface NewFundedOptions {
	package?: string;
	arguments:
		| NewFundedArguments
		| [wal: RawTransactionArgument<string>, amount: RawTransactionArgument<number | bigint>];
}
/**
 * Creates a new shared exchange with a 1:1 exchange rate, funds it with WAL, and
 * returns the associated `AdminCap`.
 */
export function newFunded(options: NewFundedOptions) {
	const packageAddress = options.package ?? '@local-pkg/wal_exchange';
	const argumentsTypes = [null, 'u64'] satisfies (string | null)[];
	const parameterNames = ['wal', 'amount'];
	return (tx: Transaction) =>
		tx.moveCall({
			package: packageAddress,
			module: 'wal_exchange',
			function: 'new_funded',
			arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
		});
}
export interface AddWalArguments {
	self: RawTransactionArgument<string>;
	wal: RawTransactionArgument<string>;
	amount: RawTransactionArgument<number | bigint>;
}
export interface AddWalOptions {
	package?: string;
	arguments:
		| AddWalArguments
		| [
				self: RawTransactionArgument<string>,
				wal: RawTransactionArgument<string>,
				amount: RawTransactionArgument<number | bigint>,
		  ];
}
/** Adds WAL to the balance stored in the exchange. */
export function addWal(options: AddWalOptions) {
	const packageAddress = options.package ?? '@local-pkg/wal_exchange';
	const argumentsTypes = [null, null, 'u64'] satisfies (string | null)[];
	const parameterNames = ['self', 'wal', 'amount'];
	return (tx: Transaction) =>
		tx.moveCall({
			package: packageAddress,
			module: 'wal_exchange',
			function: 'add_wal',
			arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
		});
}
export interface AddMySoArguments {
	self: RawTransactionArgument<string>;
	myso: RawTransactionArgument<string>;
	amount: RawTransactionArgument<number | bigint>;
}
export interface AddMySoOptions {
	package?: string;
	arguments:
		| AddMySoArguments
		| [
				self: RawTransactionArgument<string>,
				myso: RawTransactionArgument<string>,
				amount: RawTransactionArgument<number | bigint>,
		  ];
}
/** Adds MYSO to the balance stored in the exchange. */
export function addMySo(options: AddMySoOptions) {
	const packageAddress = options.package ?? '@local-pkg/wal_exchange';
	const argumentsTypes = [null, null, 'u64'] satisfies (string | null)[];
	const parameterNames = ['self', 'myso', 'amount'];
	return (tx: Transaction) =>
		tx.moveCall({
			package: packageAddress,
			module: 'wal_exchange',
			function: 'add_myso',
			arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
		});
}
export interface AddAllWalArguments {
	self: RawTransactionArgument<string>;
	wal: RawTransactionArgument<string>;
}
export interface AddAllWalOptions {
	package?: string;
	arguments:
		| AddAllWalArguments
		| [self: RawTransactionArgument<string>, wal: RawTransactionArgument<string>];
}
/** Adds WAL to the balance stored in the exchange. */
export function addAllWal(options: AddAllWalOptions) {
	const packageAddress = options.package ?? '@local-pkg/wal_exchange';
	const argumentsTypes = [null, null] satisfies (string | null)[];
	const parameterNames = ['self', 'wal'];
	return (tx: Transaction) =>
		tx.moveCall({
			package: packageAddress,
			module: 'wal_exchange',
			function: 'add_all_wal',
			arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
		});
}
export interface AddAllMySoArguments {
	self: RawTransactionArgument<string>;
	myso: RawTransactionArgument<string>;
}
export interface AddAllMySoOptions {
	package?: string;
	arguments:
		| AddAllMySoArguments
		| [self: RawTransactionArgument<string>, myso: RawTransactionArgument<string>];
}
/** Adds MYSO to the balance stored in the exchange. */
export function addAllMySo(options: AddAllMySoOptions) {
	const packageAddress = options.package ?? '@local-pkg/wal_exchange';
	const argumentsTypes = [null, null] satisfies (string | null)[];
	const parameterNames = ['self', 'myso'];
	return (tx: Transaction) =>
		tx.moveCall({
			package: packageAddress,
			module: 'wal_exchange',
			function: 'add_all_myso',
			arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
		});
}
export interface WithdrawWalArguments {
	self: RawTransactionArgument<string>;
	amount: RawTransactionArgument<number | bigint>;
	adminCap: RawTransactionArgument<string>;
}
export interface WithdrawWalOptions {
	package?: string;
	arguments:
		| WithdrawWalArguments
		| [
				self: RawTransactionArgument<string>,
				amount: RawTransactionArgument<number | bigint>,
				adminCap: RawTransactionArgument<string>,
		  ];
}
/** Withdraws WAL from the balance stored in the exchange. */
export function withdrawWal(options: WithdrawWalOptions) {
	const packageAddress = options.package ?? '@local-pkg/wal_exchange';
	const argumentsTypes = [null, 'u64', null] satisfies (string | null)[];
	const parameterNames = ['self', 'amount', 'adminCap'];
	return (tx: Transaction) =>
		tx.moveCall({
			package: packageAddress,
			module: 'wal_exchange',
			function: 'withdraw_wal',
			arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
		});
}
export interface WithdrawMySoArguments {
	self: RawTransactionArgument<string>;
	amount: RawTransactionArgument<number | bigint>;
	adminCap: RawTransactionArgument<string>;
}
export interface WithdrawMySoOptions {
	package?: string;
	arguments:
		| WithdrawMySoArguments
		| [
				self: RawTransactionArgument<string>,
				amount: RawTransactionArgument<number | bigint>,
				adminCap: RawTransactionArgument<string>,
		  ];
}
/** Withdraws MYSO from the balance stored in the exchange. */
export function withdrawMySo(options: WithdrawMySoOptions) {
	const packageAddress = options.package ?? '@local-pkg/wal_exchange';
	const argumentsTypes = [null, 'u64', null] satisfies (string | null)[];
	const parameterNames = ['self', 'amount', 'adminCap'];
	return (tx: Transaction) =>
		tx.moveCall({
			package: packageAddress,
			module: 'wal_exchange',
			function: 'withdraw_myso',
			arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
		});
}
export interface SetExchangeRateArguments {
	self: RawTransactionArgument<string>;
	wal: RawTransactionArgument<number | bigint>;
	myso: RawTransactionArgument<number | bigint>;
	adminCap: RawTransactionArgument<string>;
}
export interface SetExchangeRateOptions {
	package?: string;
	arguments:
		| SetExchangeRateArguments
		| [
				self: RawTransactionArgument<string>,
				wal: RawTransactionArgument<number | bigint>,
				myso: RawTransactionArgument<number | bigint>,
				adminCap: RawTransactionArgument<string>,
		  ];
}
/** Sets the exchange rate of the exchange to `wal` WAL = `myso` MYSO. */
export function setExchangeRate(options: SetExchangeRateOptions) {
	const packageAddress = options.package ?? '@local-pkg/wal_exchange';
	const argumentsTypes = [null, 'u64', 'u64', null] satisfies (string | null)[];
	const parameterNames = ['self', 'wal', 'myso', 'adminCap'];
	return (tx: Transaction) =>
		tx.moveCall({
			package: packageAddress,
			module: 'wal_exchange',
			function: 'set_exchange_rate',
			arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
		});
}
export interface ExchangeAllForWalArguments {
	self: RawTransactionArgument<string>;
	myso: RawTransactionArgument<string>;
}
export interface ExchangeAllForWalOptions {
	package?: string;
	arguments:
		| ExchangeAllForWalArguments
		| [self: RawTransactionArgument<string>, myso: RawTransactionArgument<string>];
}
/** Exchanges the provided MYSO coin for WAL at the exchange's rate. */
export function exchangeAllForWal(options: ExchangeAllForWalOptions) {
	const packageAddress = options.package ?? '@local-pkg/wal_exchange';
	const argumentsTypes = [null, null] satisfies (string | null)[];
	const parameterNames = ['self', 'myso'];
	return (tx: Transaction) =>
		tx.moveCall({
			package: packageAddress,
			module: 'wal_exchange',
			function: 'exchange_all_for_wal',
			arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
		});
}
export interface ExchangeForWalArguments {
	self: RawTransactionArgument<string>;
	myso: RawTransactionArgument<string>;
	amountMySo: RawTransactionArgument<number | bigint>;
}
export interface ExchangeForWalOptions {
	package?: string;
	arguments:
		| ExchangeForWalArguments
		| [
				self: RawTransactionArgument<string>,
				myso: RawTransactionArgument<string>,
				amountMySo: RawTransactionArgument<number | bigint>,
		  ];
}
/**
 * Exchanges `amount_myso` out of the provided MYSO coin for WAL at the exchange's
 * rate.
 */
export function exchangeForWal(options: ExchangeForWalOptions) {
	const packageAddress = options.package ?? '@local-pkg/wal_exchange';
	const argumentsTypes = [null, null, 'u64'] satisfies (string | null)[];
	const parameterNames = ['self', 'myso', 'amountMySo'];
	return (tx: Transaction) =>
		tx.moveCall({
			package: packageAddress,
			module: 'wal_exchange',
			function: 'exchange_for_wal',
			arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
		});
}
export interface ExchangeAllForMySoArguments {
	self: RawTransactionArgument<string>;
	wal: RawTransactionArgument<string>;
}
export interface ExchangeAllForMySoOptions {
	package?: string;
	arguments:
		| ExchangeAllForMySoArguments
		| [self: RawTransactionArgument<string>, wal: RawTransactionArgument<string>];
}
/** Exchanges the provided WAL coin for MYSO at the exchange's rate. */
export function exchangeAllForMySo(options: ExchangeAllForMySoOptions) {
	const packageAddress = options.package ?? '@local-pkg/wal_exchange';
	const argumentsTypes = [null, null] satisfies (string | null)[];
	const parameterNames = ['self', 'wal'];
	return (tx: Transaction) =>
		tx.moveCall({
			package: packageAddress,
			module: 'wal_exchange',
			function: 'exchange_all_for_myso',
			arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
		});
}
export interface ExchangeForMySoArguments {
	self: RawTransactionArgument<string>;
	wal: RawTransactionArgument<string>;
	amountWal: RawTransactionArgument<number | bigint>;
}
export interface ExchangeForMySoOptions {
	package?: string;
	arguments:
		| ExchangeForMySoArguments
		| [
				self: RawTransactionArgument<string>,
				wal: RawTransactionArgument<string>,
				amountWal: RawTransactionArgument<number | bigint>,
		  ];
}
/**
 * Exchanges `amount_wal` out of the provided WAL coin for MYSO at the exchange's
 * rate.
 */
export function exchangeForMySo(options: ExchangeForMySoOptions) {
	const packageAddress = options.package ?? '@local-pkg/wal_exchange';
	const argumentsTypes = [null, null, 'u64'] satisfies (string | null)[];
	const parameterNames = ['self', 'wal', 'amountWal'];
	return (tx: Transaction) =>
		tx.moveCall({
			package: packageAddress,
			module: 'wal_exchange',
			function: 'exchange_for_myso',
			arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
		});
}
