// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import type { MySoWalletFeatures, WalletWithRequiredFeatures } from '@socialproof/wallet-standard';
import { SLUSH_WALLET_NAME } from '@socialproof/slush-wallet';

import { createInMemoryStore } from '../utils/stateStorage.js';

export const MYSO_WALLET_NAME = 'MySo Wallet';

export const DEFAULT_STORAGE =
	typeof window !== 'undefined' && window.localStorage ? localStorage : createInMemoryStore();

export const DEFAULT_STORAGE_KEY = 'myso-dapp-kit:wallet-connection-info';

const SIGN_FEATURES = [
	'myso:signTransaction',
	'myso:signTransactionBlock',
] satisfies (keyof MySoWalletFeatures)[];

export const DEFAULT_WALLET_FILTER = (wallet: WalletWithRequiredFeatures) =>
	SIGN_FEATURES.some((feature) => wallet.features[feature]);

export const DEFAULT_PREFERRED_WALLETS = [MYSO_WALLET_NAME, SLUSH_WALLET_NAME];
