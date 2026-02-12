// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

'use client';

import {
	ConnectButton,
	ConnectModal,
	MySoClientProvider,
	useCurrentAccount,
	WalletProvider,
} from '@socialproof/dapp-kit';
import { getJsonRpcFullnodeUrl } from '@socialproof/myso/jsonRpc';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

import '@socialproof/dapp-kit/dist/index.css';

export const ConnectButtonExample = withProviders(() => {
	return <ConnectButton />;
});

export const ControlledConnectModalExample = withProviders(() => {
	const currentAccount = useCurrentAccount();
	const [open, setOpen] = useState(false);

	return (
		<ConnectModal
			trigger={
				<button disabled={!!currentAccount}> {currentAccount ? 'Connected' : 'Connect'}</button>
			}
			open={open}
			onOpenChange={(isOpen) => setOpen(isOpen)}
		/>
	);
});

export const UncontrolledConnectModalExample = withProviders(() => {
	const currentAccount = useCurrentAccount();

	return (
		<ConnectModal
			trigger={
				<button disabled={!!currentAccount}> {currentAccount ? 'Connected' : 'Connect'}</button>
			}
		/>
	);
});

function withProviders(Component: React.FunctionComponent<object>) {
	const networks = {
		mainnet: { url: getJsonRpcFullnodeUrl('mainnet'), network: 'mainnet' as const },
	};

	return function WrappedComponent() {
		const [queryClient] = useState(
			() =>
				new QueryClient({
					defaultOptions: {
						queries: {
							staleTime: 60 * 1000,
						},
					},
				}),
		);

		return (
			<QueryClientProvider client={queryClient}>
				<MySoClientProvider networks={networks}>
					<WalletProvider
						slushWallet={{
							name: 'dApp Kit Docs',
						}}
					>
						<Component />
					</WalletProvider>
				</MySoClientProvider>
			</QueryClientProvider>
		);
	};
}
