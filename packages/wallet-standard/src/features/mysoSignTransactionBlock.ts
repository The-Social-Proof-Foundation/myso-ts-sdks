// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import type { Transaction } from '@socialproof/myso/transactions';
import type { IdentifierString, WalletAccount } from '@wallet-standard/core';

/** Name of the feature. */
export const MySoSignTransactionBlock = 'myso:signTransactionBlock';

/** The latest API version of the signTransactionBlock API. */
export type MySoSignTransactionBlockVersion = '1.0.0';

/**
 * @deprecated Use `myso:signTransaction` instead.
 *
 * A Wallet Standard feature for signing a transaction, and returning the
 * serialized transaction and transaction signature.
 */
export type MySoSignTransactionBlockFeature = {
	/** Namespace for the feature. */
	[MySoSignTransactionBlock]: {
		/** Version of the feature API. */
		version: MySoSignTransactionBlockVersion;
		/** @deprecated Use `myso:signTransaction` instead. */
		signTransactionBlock: MySoSignTransactionBlockMethod;
	};
};

/** @deprecated Use `myso:signTransaction` instead. */
export type MySoSignTransactionBlockMethod = (
	input: MySoSignTransactionBlockInput,
) => Promise<MySoSignTransactionBlockOutput>;

/** Input for signing transactions. */
export interface MySoSignTransactionBlockInput {
	transactionBlock: Transaction;
	account: WalletAccount;
	chain: IdentifierString;
}

/** Output of signing transactions. */
export interface MySoSignTransactionBlockOutput extends SignedTransactionBlock {}

export interface SignedTransactionBlock {
	/** Transaction as base64 encoded bcs. */
	transactionBlockBytes: string;
	/** Base64 encoded signature */
	signature: string;
}
