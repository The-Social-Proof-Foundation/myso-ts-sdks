// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

export const MySoGetCapabilities = 'myso:getCapabilities';

/** The latest API version of the getCapabilities API. */
export type MySoGetCapabilitiesVersion = '1.0.0';

/**
 * A Wallet Standard feature for reporting intents supported by the wallet.
 */
export type MySoGetCapabilitiesFeature = {
	[MySoGetCapabilities]: {
		version: MySoGetCapabilitiesVersion;
		getCapabilities: MySoGetCapabilitiesMethod;
	};
};

export type MySoGetCapabilitiesMethod = () => Promise<{
	supportedIntents?: string[];
}>;
