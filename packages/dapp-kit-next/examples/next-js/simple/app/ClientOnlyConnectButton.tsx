// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import { DAppKitProvider, ConnectButton } from '@socialproof/dapp-kit-react';
import { dAppKit } from './dApp-kit.ts';

export default function ClientOnlyConnectButton() {
	return (
		<DAppKitProvider dAppKit={dAppKit}>
			<ConnectButton />
		</DAppKitProvider>
	);
}
