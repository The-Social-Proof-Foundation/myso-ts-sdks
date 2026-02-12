// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import type { IdentifierString, WalletAccount } from '@wallet-standard/core';

/** Name of the feature. */
export const MySoSignTransaction = 'myso:signTransaction';

/** The latest API version of the signTransaction API. */
export type MySoSignTransactionVersion = '2.0.0';

/**
 * A Wallet Standard feature for signing a transaction, and returning the
 * serialized transaction and transaction signature.
 */
export type MySoSignTransactionFeature = {
	/** Namespace for the feature. */
	[MySoSignTransaction]: {
		/** Version of the feature API. */
		version: MySoSignTransactionVersion;
		signTransaction: MySoSignTransactionMethod;
	};
};

export type MySoSignTransactionMethod = (
	input: MySoSignTransactionInput,
) => Promise<SignedTransaction>;

/** Input for signing transactions. */
export interface MySoSignTransactionInput {
	transaction: { toJSON: () => Promise<string> };
	account: WalletAccount;
	chain: IdentifierString;
	signal?: AbortSignal;
}

/** Output of signing transactions. */

export interface SignedTransaction {
	/** Transaction as base64 encoded bcs. */
	bytes: string;
	/** Base64 encoded signature */
	signature: string;
}
