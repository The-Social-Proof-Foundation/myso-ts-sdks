// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import type { WalletAccount } from '@wallet-standard/core';

/**
 * Name of the feature.
 * @deprecated Wallets can still implement this method for compatibility, but this has been replaced by the `myso:signPersonalMessage` feature
 **/
export const MySoSignMessage = 'myso:signMessage';

/**
 * The latest API version of the signMessage API.
 * @deprecated Wallets can still implement this method for compatibility, but this has been replaced by the `myso:signPersonalMessage` feature
 */
export type MySoSignMessageVersion = '1.0.0';

/**
 * A Wallet Standard feature for signing a personal message, and returning the
 * message bytes that were signed, and message signature.
 *
 * @deprecated Wallets can still implement this method for compatibility, but this has been replaced by the `myso:signPersonalMessage` feature
 */
export type MySoSignMessageFeature = {
	/** Namespace for the feature. */
	[MySoSignMessage]: {
		/** Version of the feature API. */
		version: MySoSignMessageVersion;
		signMessage: MySoSignMessageMethod;
	};
};

/** @deprecated Wallets can still implement this method for compatibility, but this has been replaced by the `myso:signPersonalMessage` feature */
export type MySoSignMessageMethod = (input: MySoSignMessageInput) => Promise<MySoSignMessageOutput>;

/**
 * Input for signing messages.
 * @deprecated Wallets can still implement this method for compatibility, but this has been replaced by the `myso:signPersonalMessage` feature
 */
export interface MySoSignMessageInput {
	message: Uint8Array;
	account: WalletAccount;
}

/**
 * Output of signing messages.
 * @deprecated Wallets can still implement this method for compatibility, but this has been replaced by the `myso:signPersonalMessage` feature
 */
export interface MySoSignMessageOutput {
	/** Base64 message bytes. */
	messageBytes: string;
	/** Base64 encoded signature */
	signature: string;
}
