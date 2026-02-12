// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import type { DefaultExpectedDppKit } from '@socialproof/dapp-kit-core';
import { createContext } from 'react';
import type { PropsWithChildren } from 'react';

export const DAppKitContext = createContext<DefaultExpectedDppKit | null>(null);

export type DAppKitProviderProps = PropsWithChildren<{
	dAppKit: DefaultExpectedDppKit;
}>;

export function DAppKitProvider({ dAppKit, children }: DAppKitProviderProps) {
	return <DAppKitContext.Provider value={dAppKit}>{children}</DAppKitContext.Provider>;
}
