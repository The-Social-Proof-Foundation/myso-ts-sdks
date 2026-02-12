// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import { getJsonRpcFullnodeUrl, isMySoJsonRpcClient, MySoJsonRpcClient } from '@socialproof/myso/jsonRpc';
import type { MySoJsonRpcClientOptions } from '@socialproof/myso/jsonRpc';
import { createContext, useMemo, useState } from 'react';

import type { NetworkConfig } from '../hooks/networkConfig.js';

type NetworkConfigs<T extends NetworkConfig | MySoJsonRpcClient = NetworkConfig | MySoJsonRpcClient> =
	Record<string, T>;

export interface MySoClientProviderContext {
	client: MySoJsonRpcClient;
	networks: NetworkConfigs;
	network: string;
	config: NetworkConfig | null;
	selectNetwork: (network: string) => void;
}

export const MySoClientContext = createContext<MySoClientProviderContext | null>(null);

export type MySoClientProviderProps<T extends NetworkConfigs> = {
	createClient?: (name: keyof T, config: T[keyof T]) => MySoJsonRpcClient;
	children: React.ReactNode;
	networks?: T;
	onNetworkChange?: (network: keyof T & string) => void;
} & (
	| {
			defaultNetwork?: keyof T & string;
			network?: never;
	  }
	| {
			defaultNetwork?: never;
			network?: keyof T & string;
	  }
);

const DEFAULT_NETWORKS = {
	localnet: { url: getJsonRpcFullnodeUrl('localnet') },
};

const DEFAULT_CREATE_CLIENT = function createClient(
	_name: string,
	config: NetworkConfig | MySoJsonRpcClient,
) {
	if (isMySoJsonRpcClient(config)) {
		return config;
	}

	return new MySoJsonRpcClient(config);
};

export function MySoClientProvider<T extends NetworkConfigs>(props: MySoClientProviderProps<T>) {
	const { onNetworkChange, network, children } = props;
	const networks = (props.networks ?? DEFAULT_NETWORKS) as T;
	const createClient =
		(props.createClient as typeof DEFAULT_CREATE_CLIENT) ?? DEFAULT_CREATE_CLIENT;

	const [selectedNetwork, setSelectedNetwork] = useState<keyof T & string>(
		props.network ?? props.defaultNetwork ?? (Object.keys(networks)[0] as keyof T & string),
	);

	const currentNetwork = props.network ?? selectedNetwork;

	const client = useMemo(() => {
		return createClient(currentNetwork, networks[currentNetwork]);
	}, [createClient, currentNetwork, networks]);

	const ctx = useMemo((): MySoClientProviderContext => {
		return {
			client,
			networks,
			network: currentNetwork,
			config:
				networks[currentNetwork] instanceof MySoJsonRpcClient
					? null
					: (networks[currentNetwork] as MySoJsonRpcClientOptions),
			selectNetwork: (newNetwork) => {
				if (currentNetwork === newNetwork) {
					return;
				}

				if (!network && newNetwork !== selectedNetwork) {
					setSelectedNetwork(newNetwork);
				}

				onNetworkChange?.(newNetwork);
			},
		};
	}, [client, networks, selectedNetwork, currentNetwork, network, onNetworkChange]);

	return <MySoClientContext.Provider value={ctx}>{children}</MySoClientContext.Provider>;
}
