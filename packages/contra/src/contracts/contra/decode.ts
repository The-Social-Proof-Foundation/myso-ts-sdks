/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/

/**
 * Simple deserialization functions that build the composite crypto types from
 * their byte-encoded elements in a single Move call.
 */

import { type Transaction } from '@socialproof/myso/transactions';

import { normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';

export interface GVectorArguments {
	parts: RawTransactionArgument<number[][]>;
}
export interface GVectorOptions {
	package?: string;
	arguments: GVectorArguments | [parts: RawTransactionArgument<number[][]>];
}
export function gVector(options: GVectorOptions) {
	const packageAddress = options.package ?? '@local-pkg/contra';
	const argumentsTypes = ['vector<vector<u8>>'] satisfies (string | null)[];
	const parameterNames = ['parts'];
	return (tx: Transaction) =>
		tx.moveCall({
			package: packageAddress,
			module: 'decode',
			function: 'g_vector',
			arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
		});
}
export interface EncryptionArguments {
	parts: RawTransactionArgument<number[][]>;
}
export interface EncryptionOptions {
	package?: string;
	arguments: EncryptionArguments | [parts: RawTransactionArgument<number[][]>];
}
export function encryption(options: EncryptionOptions) {
	const packageAddress = options.package ?? '@local-pkg/contra';
	const argumentsTypes = ['vector<vector<u8>>'] satisfies (string | null)[];
	const parameterNames = ['parts'];
	return (tx: Transaction) =>
		tx.moveCall({
			package: packageAddress,
			module: 'decode',
			function: 'encryption',
			arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
		});
}
export interface EncryptedAmountArguments {
	parts: RawTransactionArgument<number[][]>;
}
export interface EncryptedAmountOptions {
	package?: string;
	arguments: EncryptedAmountArguments | [parts: RawTransactionArgument<number[][]>];
}
export function encryptedAmount(options: EncryptedAmountOptions) {
	const packageAddress = options.package ?? '@local-pkg/contra';
	const argumentsTypes = ['vector<vector<u8>>'] satisfies (string | null)[];
	const parameterNames = ['parts'];
	return (tx: Transaction) =>
		tx.moveCall({
			package: packageAddress,
			module: 'decode',
			function: 'encrypted_amount',
			arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
		});
}
export interface MultiRecipientEncryptionArguments {
	parts: RawTransactionArgument<number[][]>;
	m: RawTransactionArgument<number | bigint>;
}
export interface MultiRecipientEncryptionOptions {
	package?: string;
	arguments:
		| MultiRecipientEncryptionArguments
		| [parts: RawTransactionArgument<number[][]>, m: RawTransactionArgument<number | bigint>];
}
export function multiRecipientEncryption(options: MultiRecipientEncryptionOptions) {
	const packageAddress = options.package ?? '@local-pkg/contra';
	const argumentsTypes = ['vector<vector<u8>>', 'u64'] satisfies (string | null)[];
	const parameterNames = ['parts', 'm'];
	return (tx: Transaction) =>
		tx.moveCall({
			package: packageAddress,
			module: 'decode',
			function: 'multi_recipient_encryption',
			arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
		});
}
export interface DdhProofArguments {
	parts: RawTransactionArgument<number[][]>;
}
export interface DdhProofOptions {
	package?: string;
	arguments: DdhProofArguments | [parts: RawTransactionArgument<number[][]>];
}
export function ddhProof(options: DdhProofOptions) {
	const packageAddress = options.package ?? '@local-pkg/contra';
	const argumentsTypes = ['vector<vector<u8>>'] satisfies (string | null)[];
	const parameterNames = ['parts'];
	return (tx: Transaction) =>
		tx.moveCall({
			package: packageAddress,
			module: 'decode',
			function: 'ddh_proof',
			arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
		});
}
export interface ElgamalProofArguments {
	parts: RawTransactionArgument<number[][]>;
}
export interface ElgamalProofOptions {
	package?: string;
	arguments: ElgamalProofArguments | [parts: RawTransactionArgument<number[][]>];
}
export function elgamalProof(options: ElgamalProofOptions) {
	const packageAddress = options.package ?? '@local-pkg/contra';
	const argumentsTypes = ['vector<vector<u8>>'] satisfies (string | null)[];
	const parameterNames = ['parts'];
	return (tx: Transaction) =>
		tx.moveCall({
			package: packageAddress,
			module: 'decode',
			function: 'elgamal_proof',
			arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
		});
}
export interface ConsistencyProofArguments {
	parts: RawTransactionArgument<number[][]>;
}
export interface ConsistencyProofOptions {
	package?: string;
	arguments: ConsistencyProofArguments | [parts: RawTransactionArgument<number[][]>];
}
export function consistencyProof(options: ConsistencyProofOptions) {
	const packageAddress = options.package ?? '@local-pkg/contra';
	const argumentsTypes = ['vector<vector<u8>>'] satisfies (string | null)[];
	const parameterNames = ['parts'];
	return (tx: Transaction) =>
		tx.moveCall({
			package: packageAddress,
			module: 'decode',
			function: 'consistency_proof',
			arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
		});
}
export interface KeyConsistencyProofArguments {
	parts: RawTransactionArgument<number[][]>;
	m: RawTransactionArgument<number | bigint>;
}
export interface KeyConsistencyProofOptions {
	package?: string;
	arguments:
		| KeyConsistencyProofArguments
		| [parts: RawTransactionArgument<number[][]>, m: RawTransactionArgument<number | bigint>];
}
export function keyConsistencyProof(options: KeyConsistencyProofOptions) {
	const packageAddress = options.package ?? '@local-pkg/contra';
	const argumentsTypes = ['vector<vector<u8>>', 'u64'] satisfies (string | null)[];
	const parameterNames = ['parts', 'm'];
	return (tx: Transaction) =>
		tx.moveCall({
			package: packageAddress,
			module: 'decode',
			function: 'key_consistency_proof',
			arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
		});
}
