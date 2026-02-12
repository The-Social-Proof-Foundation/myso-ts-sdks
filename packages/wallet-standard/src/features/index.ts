// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import type {
	IdentifierRecord,
	StandardConnectFeature,
	StandardDisconnectFeature,
	StandardEventsFeature,
	WalletWithFeatures,
} from '@wallet-standard/core';

import type { MySoSignAndExecuteTransactionFeature } from './mysoSignAndExecuteTransaction.js';
import type { MySoSignAndExecuteTransactionBlockFeature } from './mysoSignAndExecuteTransactionBlock.js';
import type { MySoSignMessageFeature } from './mysoSignMessage.js';
import type { MySoSignPersonalMessageFeature } from './mysoSignPersonalMessage.js';
import type { MySoSignTransactionFeature } from './mysoSignTransaction.js';
import type { MySoSignTransactionBlockFeature } from './mysoSignTransactionBlock.js';
import type { MySoGetCapabilitiesFeature } from './mysoGetCapabilities.js';

/**
 * Wallet Standard features that are unique to MySo, and that all MySo wallets are expected to implement.
 */
export type MySoFeatures = Partial<MySoSignTransactionBlockFeature> &
	Partial<MySoSignAndExecuteTransactionBlockFeature> &
	MySoSignPersonalMessageFeature &
	MySoSignAndExecuteTransactionFeature &
	MySoSignTransactionFeature &
	// This deprecated feature should be removed once wallets update to the new method:
	Partial<MySoSignMessageFeature> &
	Partial<MySoGetCapabilitiesFeature>;

export type MySoWalletFeatures = StandardConnectFeature &
	StandardEventsFeature &
	MySoFeatures &
	// Disconnect is an optional feature:
	Partial<StandardDisconnectFeature>;

export type WalletWithMySoFeatures = WalletWithFeatures<MySoWalletFeatures>;

/**
 * Represents a wallet with the absolute minimum feature set required to function in the MySo ecosystem.
 */
export type WalletWithRequiredFeatures = WalletWithFeatures<
	MinimallyRequiredFeatures &
		Partial<MySoFeatures> &
		Partial<StandardDisconnectFeature> &
		IdentifierRecord<unknown>
>;

export type MinimallyRequiredFeatures = StandardConnectFeature & StandardEventsFeature;

export * from './mysoSignMessage.js';
export * from './mysoSignTransactionBlock.js';
export * from './mysoSignTransaction.js';
export * from './mysoSignAndExecuteTransactionBlock.js';
export * from './mysoSignAndExecuteTransaction.js';
export * from './mysoSignPersonalMessage.js';
export * from './mysoGetCapabilities.js';
