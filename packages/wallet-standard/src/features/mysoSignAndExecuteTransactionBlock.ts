// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import type {
	ExecuteTransactionRequestType,
	MySoTransactionBlockResponse,
	MySoTransactionBlockResponseOptions,
} from '@socialproof/myso/jsonRpc';

import type { MySoSignTransactionBlockInput } from './mysoSignTransactionBlock.js';

/** Name of the feature. */
export const MySoSignAndExecuteTransactionBlock = 'myso:signAndExecuteTransactionBlock';

/** The latest API version of the signAndExecuteTransactionBlock API. */
export type MySoSignAndExecuteTransactionBlockVersion = '1.0.0';

/**
 * @deprecated Use `myso:signAndExecuteTransaction` instead.
 *
 * A Wallet Standard feature for signing a transaction, and submitting it to the
 * network. The wallet is expected to submit the transaction to the network via RPC,
 * and return the transaction response.
 */
export type MySoSignAndExecuteTransactionBlockFeature = {
	/** Namespace for the feature. */
	[MySoSignAndExecuteTransactionBlock]: {
		/** Version of the feature API. */
		version: MySoSignAndExecuteTransactionBlockVersion;
		/** @deprecated Use `myso:signAndExecuteTransaction` instead. */
		signAndExecuteTransactionBlock: MySoSignAndExecuteTransactionBlockMethod;
	};
};

/** @deprecated Use `myso:signAndExecuteTransaction` instead. */
export type MySoSignAndExecuteTransactionBlockMethod = (
	input: MySoSignAndExecuteTransactionBlockInput,
) => Promise<MySoSignAndExecuteTransactionBlockOutput>;

/** Input for signing and sending transactions. */
export interface MySoSignAndExecuteTransactionBlockInput extends MySoSignTransactionBlockInput {
	/**
	 * @deprecated requestType will be ignored by JSON RPC in the future
	 */
	requestType?: ExecuteTransactionRequestType;
	/** specify which fields to return (e.g., transaction, effects, events, etc). By default, only the transaction digest will be returned. */
	options?: MySoTransactionBlockResponseOptions;
}

/** Output of signing and sending transactions. */
export interface MySoSignAndExecuteTransactionBlockOutput extends MySoTransactionBlockResponse {}
