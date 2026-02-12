// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import { createDAppKit } from '@socialproof/dapp-kit-core';
import { MySoGrpcClient } from '@socialproof/myso/grpc';

const GRPC_URLS = {
	mainnet: 'https://fullnode.mainnet.mysocial.network:443',
	testnet: 'https://fullnode.testnet.mysocial.network:443',
};

export const dAppKit = createDAppKit({
	enableBurnerWallet: import.meta.env.DEV,
	networks: ['mainnet', 'testnet'],
	defaultNetwork: 'testnet',
	createClient(network) {
		return new MySoGrpcClient({ network, baseUrl: GRPC_URLS[network] });
	},
});
