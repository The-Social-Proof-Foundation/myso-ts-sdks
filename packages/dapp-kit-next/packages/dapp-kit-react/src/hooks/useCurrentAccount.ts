// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import type { DAppKit, RegisteredDAppKit } from '@socialproof/dapp-kit-core';
import { useWalletConnection } from './useWalletConnection.js';

export type UseCurrentAccountOptions<TDAppKit extends DAppKit> = {
	dAppKit?: TDAppKit;
};

export function useCurrentAccount<TDAppKit extends DAppKit<any> = RegisteredDAppKit>({
	dAppKit,
}: UseCurrentAccountOptions<TDAppKit> = {}) {
	const connection = useWalletConnection({ dAppKit });
	return connection.account;
}
