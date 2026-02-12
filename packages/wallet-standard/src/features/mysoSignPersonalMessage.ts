// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import type { IdentifierString, WalletAccount } from '@wallet-standard/core';

/** Name of the feature. */
export const MySoSignPersonalMessage = 'myso:signPersonalMessage';

/** The latest API version of the signPersonalMessage API. */
export type MySoSignPersonalMessageVersion = '1.1.0';

/**
 * A Wallet Standard feature for signing a personal message, and returning the
 * message bytes that were signed, and message signature.
 */
export type MySoSignPersonalMessageFeature = {
	/** Namespace for the feature. */
	[MySoSignPersonalMessage]: {
		/** Version of the feature API. */
		version: MySoSignPersonalMessageVersion;
		signPersonalMessage: MySoSignPersonalMessageMethod;
	};
};

export type MySoSignPersonalMessageMethod = (
	input: MySoSignPersonalMessageInput,
) => Promise<MySoSignPersonalMessageOutput>;

/** Input for signing personal messages. */
export interface MySoSignPersonalMessageInput {
	message: Uint8Array;
	account: WalletAccount;
	chain?: IdentifierString;
}

/** Output of signing personal messages. */
export interface MySoSignPersonalMessageOutput extends SignedPersonalMessage {}

export interface SignedPersonalMessage {
	/** Base64 encoded message bytes */
	bytes: string;
	/** Base64 encoded signature */
	signature: string;
}
