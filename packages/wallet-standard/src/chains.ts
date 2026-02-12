// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import type { IdentifierString } from '@wallet-standard/core';

/** MySo Devnet */
export const MYSO_DEVNET_CHAIN = 'myso:devnet';

/** MySo Testnet */
export const MYSO_TESTNET_CHAIN = 'myso:testnet';

/** MySo Localnet */
export const MYSO_LOCALNET_CHAIN = 'myso:localnet';

/** MySo Mainnet */
export const MYSO_MAINNET_CHAIN = 'myso:mainnet';

export const MYSO_CHAINS = [
	MYSO_DEVNET_CHAIN,
	MYSO_TESTNET_CHAIN,
	MYSO_LOCALNET_CHAIN,
	MYSO_MAINNET_CHAIN,
] as const;

export type MySoChain = (typeof MYSO_CHAINS)[number];

/**
 * Utility that returns whether or not a chain identifier is a valid MySo chain.
 * @param chain a chain identifier in the form of `${string}:{$string}`
 */
export function isMySoChain(chain: IdentifierString): chain is MySoChain {
	return MYSO_CHAINS.includes(chain as MySoChain);
}
