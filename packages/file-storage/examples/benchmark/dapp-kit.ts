// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import { createDAppKit } from '@socialproof/dapp-kit-react';
import { MySoGrpcClient } from '@socialproof/myso/grpc';
import { fileStorage } from '../../src/index.js';

const GRPC_URLS = {
	testnet: 'https://fullnode.testnet.mysocial.network:443',
} as const;

export const dAppKit = createDAppKit({
	networks: ['testnet'],
	defaultNetwork: 'testnet',
	autoConnect: true,
	createClient(network) {
		return new MySoGrpcClient({ network, baseUrl: GRPC_URLS[network] }).$extend(
			fileStorage({
				name: 'fileStorageWithRelay',

				storageNodeClientOptions: {
					timeout: 600_000,
					onError: (error) => {
						console.error('Storage node client error:', error);
					},
				},
				uploadRelay: {
					host: 'https://upload-relay.testnet.file-storage.space',
					sendTip: {
						max: 1_000,
					},
					timeout: 600_000,
				},
			}),
			fileStorage({
				name: 'fileStorageWithoutRelay',
				storageNodeClientOptions: {
					timeout: 600_000,
				},
			}),
		);
	},
});

declare module '@socialproof/dapp-kit-react' {
	interface Register {
		dAppKit: typeof dAppKit;
	}
}
