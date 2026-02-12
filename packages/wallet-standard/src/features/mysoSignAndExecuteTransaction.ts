// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import type { SignedTransaction, MySoSignTransactionInput } from './mysoSignTransaction.js';

/** Name of the feature. */
export const MySoSignAndExecuteTransaction = 'myso:signAndExecuteTransaction';

/** The latest API version of the signAndExecuteTransactionBlock API. */
export type MySoSignAndExecuteTransactionVersion = '2.0.0';

/**
 * A Wallet Standard feature for signing a transaction, and submitting it to the
 * network. The wallet is expected to submit the transaction to the network via RPC,
 * and return the transaction response.
 */
export type MySoSignAndExecuteTransactionFeature = {
	/** Namespace for the feature. */
	[MySoSignAndExecuteTransaction]: {
		/** Version of the feature API. */
		version: MySoSignAndExecuteTransactionVersion;
		signAndExecuteTransaction: MySoSignAndExecuteTransactionMethod;
	};
};

export type MySoSignAndExecuteTransactionMethod = (
	input: MySoSignAndExecuteTransactionInput,
) => Promise<MySoSignAndExecuteTransactionOutput>;

/** Input for signing and sending transactions. */
export interface MySoSignAndExecuteTransactionInput extends MySoSignTransactionInput {}

/** Output of signing and sending transactions. */
export interface MySoSignAndExecuteTransactionOutput extends SignedTransaction {
	digest: string;
	/** Transaction effects as base64 encoded bcs. */
	effects: string;
}
