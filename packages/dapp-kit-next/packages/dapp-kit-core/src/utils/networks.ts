// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import type { MySoClientTypes } from '@socialproof/myso/client';
import type { IdentifierString } from '@socialproof/wallet-standard';
import { DAppKitError } from './errors.js';
import type { DAppKitCompatibleClient } from '../core/types.js';

export type Networks = MySoClientTypes.Network[];

export function getChain(network: MySoClientTypes.Network): IdentifierString {
	return `myso:${network}`;
}

export function createNetworkConfig<
	TNetworks extends Networks,
	Client extends DAppKitCompatibleClient,
>(networks: TNetworks, createClient: (network: TNetworks[number]) => Client) {
	if (networks.length === 0) {
		throw new DAppKitError('You must specify at least one MySo network for your application.');
	}

	const networkConfig = new Map<TNetworks[number], Client>();
	function getClient<T extends TNetworks[number]>(network: T | TNetworks[number]) {
		if (networkConfig.has(network)) {
			return networkConfig.get(network)!;
		}

		const client = createClient(network);
		networkConfig.set(network, client);
		return client;
	}

	return { networkConfig: Object.freeze(networkConfig), getClient };
}
