// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import { useContext } from 'react';
import { DAppKitContext } from '../components/DAppKitProvider.js';
import type { DAppKit, RegisteredDAppKit } from '@socialproof/dapp-kit-core';

export function useDAppKit<TDAppKit extends DAppKit<any> = RegisteredDAppKit>(dAppKit?: TDAppKit) {
	const contextValue = useContext(DAppKitContext);

	if (dAppKit) {
		return dAppKit;
	}

	if (!contextValue) {
		throw new Error(
			'Could not find DAppKitContext. Ensure that you have set up the `DAppKitProvider` component.',
		);
	}

	return contextValue as TDAppKit;
}
