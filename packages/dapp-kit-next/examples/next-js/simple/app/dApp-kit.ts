// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import { createDAppKit } from '@socialproof/dapp-kit-react';
import { MySoGrpcClient } from '@socialproof/myso/grpc';

const GRPC_URLS = {
	mainnet: 'https://fullnode.mainnet.mysocial.network:443',
	testnet: 'https://fullnode.testnet.mysocial.network:443',
} as const;

export const dAppKit = createDAppKit({
	enableBurnerWallet: process.env.NODE_ENV === 'development',
	networks: ['mainnet', 'testnet'],
	defaultNetwork: 'testnet',
	createClient(network) {
		return new MySoGrpcClient({ network, baseUrl: GRPC_URLS[network] });
	},
});

// global type registration necessary for the hooks to work correctly
declare module '@socialproof/dapp-kit-react' {
	interface Register {
		dAppKit: typeof dAppKit;
	}
}
