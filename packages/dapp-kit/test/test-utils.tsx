// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import { getJsonRpcFullnodeUrl, MySoJsonRpcClient } from '@socialproof/myso/jsonRpc';
import type { IdentifierRecord, ReadonlyWalletAccount } from '@socialproof/wallet-standard';
import { getWallets } from '@socialproof/wallet-standard';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ComponentProps } from 'react';

import { WalletProvider } from '../src/components/WalletProvider.js';
import { MySoClientProvider } from '../src/index.js';
import { createMockAccount } from './mocks/mockAccount.js';
import { MockWallet } from './mocks/mockWallet.js';

export function createMySoClientContextWrapper(client: MySoJsonRpcClient) {
	return function MySoClientContextWrapper({ children }: { children: React.ReactNode }) {
		return <MySoClientProvider networks={{ test: client }}>{children}</MySoClientProvider>;
	};
}

export function createWalletProviderContextWrapper(
	providerProps: Omit<ComponentProps<typeof WalletProvider>, 'children'> = {},
	mysoClient: MySoJsonRpcClient = new MySoJsonRpcClient({
		url: getJsonRpcFullnodeUrl('localnet'),
		network: 'localnet',
	}),
) {
	const queryClient = new QueryClient();
	return function WalletProviderContextWrapper({ children }: { children: React.ReactNode }) {
		return (
			<MySoClientProvider networks={{ test: mysoClient }}>
				<QueryClientProvider client={queryClient}>
					<WalletProvider {...providerProps}>{children}</WalletProvider>;
				</QueryClientProvider>
			</MySoClientProvider>
		);
	};
}

export function registerMockWallet({
	id,
	walletName,
	accounts = [createMockAccount()],
	features = {},
}: {
	id?: string | null;
	walletName: string;
	accounts?: ReadonlyWalletAccount[];
	features?: IdentifierRecord<unknown>;
}) {
	const walletsApi = getWallets();
	const mockWallet = new MockWallet(id ?? crypto.randomUUID(), walletName, accounts, features);

	return {
		unregister: walletsApi.register(mockWallet),
		mockWallet,
	};
}
