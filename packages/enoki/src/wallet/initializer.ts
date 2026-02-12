// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import type { ClientWithCoreApi, MySoClientTypes } from '@socialproof/myso/client';
import { registerEnokiWallets } from './register.js';
import type { RegisterEnokiWalletsOptions } from './types.js';

export function enokiWalletsInitializer(
	options: Omit<RegisterEnokiWalletsOptions, 'clients' | 'getCurrentNetwork'>,
) {
	return {
		id: 'enoki-wallets-initializer',
		async initialize({
			networks,
			getClient,
		}: {
			networks: readonly MySoClientTypes.Network[];
			getClient: (network?: MySoClientTypes.Network) => ClientWithCoreApi;
		}) {
			const { unregister } = registerEnokiWallets({
				...options,
				getCurrentNetwork: () => getClient().network,
				clients: networks.map(getClient),
			});

			return { unregister };
		},
	};
}
