// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import type { DAppKit, RegisteredDAppKit } from '@socialproof/dapp-kit-core';
import { useDAppKit } from './useDAppKit.js';
import { useStore } from '@nanostores/react';

export type UseCurrentNetworkOptions<TDAppKit extends DAppKit> = {
	dAppKit?: TDAppKit;
};

export function useCurrentNetwork<TDAppKit extends DAppKit<any> = RegisteredDAppKit>({
	dAppKit,
}: UseCurrentNetworkOptions<TDAppKit> = {}) {
	const instance = useDAppKit(dAppKit);
	return useStore<TDAppKit['stores']['$currentNetwork']>(instance.stores.$currentNetwork);
}
