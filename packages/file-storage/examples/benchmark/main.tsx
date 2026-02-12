// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import { createRoot } from 'react-dom/client';
import { DAppKitProvider, ConnectButton } from '@socialproof/dapp-kit-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { dAppKit } from './dapp-kit.js';
import { BenchmarkPage } from './benchmark.js';

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<DAppKitProvider dAppKit={dAppKit}>
				<div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
					<h1>File Storage Examples</h1>
					<div style={{ marginBottom: '20px' }}>
						<ConnectButton />
					</div>

					<BenchmarkPage />
				</div>
			</DAppKitProvider>
		</QueryClientProvider>
	);
}

createRoot(document.getElementById('root')!).render(<App />);
