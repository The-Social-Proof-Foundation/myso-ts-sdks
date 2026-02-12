// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import { createDAppKit } from '@socialproof/dapp-kit-react';
import { MySoGrpcClient } from '@socialproof/myso/grpc';

const GRPC_URLS = {
	testnet: 'https://fullnode.testnet.mysocial.network:443',
	localnet: 'http://localhost:8000',
};

export const dAppKit = createDAppKit({
	networks: ['testnet', 'localnet'],
	defaultNetwork: 'testnet',
	createClient(network) {
		return new MySoGrpcClient({ network, baseUrl: GRPC_URLS[network] });
	},
});

declare module '@socialproof/dapp-kit-react' {
	interface Register {
		dAppKit: typeof dAppKit;
	}
}
