// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import type { DAppKitStores } from '../store.js';
import type { Networks } from '../../utils/networks.js';

export function switchNetworkCreator<TNetworks extends Networks>({
	$currentNetwork,
}: DAppKitStores<TNetworks>) {
	/**
	 * Switches the currently selected network to the specified network.
	 */
	return function switchNetwork<T extends TNetworks[number]>(network: T | TNetworks[number]) {
		$currentNetwork.set(network);
	};
}
