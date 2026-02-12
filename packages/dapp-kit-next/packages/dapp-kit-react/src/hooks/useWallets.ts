// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import type { DAppKit, RegisteredDAppKit } from '@socialproof/dapp-kit-core';
import { useStore } from '@nanostores/react';
import { useDAppKit } from './useDAppKit.js';

export type UseWalletsOptions<TDAppKit extends DAppKit> = {
	dAppKit?: TDAppKit;
};

export function useWallets<TDAppKit extends DAppKit<any> = RegisteredDAppKit>({
	dAppKit,
}: UseWalletsOptions<TDAppKit> = {}) {
	const instance = useDAppKit(dAppKit);
	return useStore(instance.stores.$wallets);
}
