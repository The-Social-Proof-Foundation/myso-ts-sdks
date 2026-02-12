// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import { MySoJsonRpcClient } from '@socialproof/myso/jsonRpc';
import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';

import { MySoClientProvider } from '../../src/components/MySoClientProvider.js';
import { useMySoClient, useMySoClientContext } from '../../src/index.js';

describe('MySoClientProvider', () => {
	it('renders without crashing', () => {
		render(
			<MySoClientProvider>
				<div>Test</div>
			</MySoClientProvider>,
		);
		expect(screen.getByText('Test')).toBeInTheDocument();
	});

	it('provides a MySoJsonRpcClient instance to its children', () => {
		const ChildComponent = () => {
			const client = useMySoClient();
			expect(client).toBeInstanceOf(MySoJsonRpcClient);
			return <div>Test</div>;
		};

		render(
			<MySoClientProvider>
				<ChildComponent />
			</MySoClientProvider>,
		);
	});

	it('can accept pre-configured MySoClients', () => {
		const mysoClient = new MySoJsonRpcClient({ url: 'http://localhost:8080', network: 'localnet' });
		const ChildComponent = () => {
			const client = useMySoClient();
			expect(client).toBeInstanceOf(MySoJsonRpcClient);
			expect(client).toBe(mysoClient);
			return <div>Test</div>;
		};

		render(
			<MySoClientProvider networks={{ localnet: mysoClient }}>
				<ChildComponent />
			</MySoClientProvider>,
		);

		expect(screen.getByText('Test')).toBeInTheDocument();
	});

	test('can create myso clients with custom options', async () => {
		function NetworkSelector() {
			const ctx = useMySoClientContext();

			return (
				<div>
					{Object.keys(ctx.networks).map((network) => (
						<button key={network} onClick={() => ctx.selectNetwork(network)}>
							{`select ${network}`}
						</button>
					))}
				</div>
			);
		}
		function CustomConfigProvider() {
			const [selectedNetwork, setSelectedNetwork] = useState<string>();

			return (
				<MySoClientProvider
					networks={{
						a: {
							url: 'http://localhost:8080',
							network: 'localnet',
							custom: setSelectedNetwork,
						},
						b: {
							url: 'http://localhost:8080',
							network: 'localnet',
							custom: setSelectedNetwork,
						},
					}}
					createClient={(name, { custom, ...config }) => {
						custom(name);
						return new MySoJsonRpcClient(config);
					}}
				>
					<div>{`selected network: ${selectedNetwork}`}</div>
					<NetworkSelector />
				</MySoClientProvider>
			);
		}

		const user = userEvent.setup();

		render(<CustomConfigProvider />);

		expect(screen.getByText('selected network: a')).toBeInTheDocument();

		await user.click(screen.getByText('select b'));

		expect(screen.getByText('selected network: b')).toBeInTheDocument();
	});

	test('controlled mode', async () => {
		function NetworkSelector(props: { selectNetwork: (network: string) => void }) {
			const ctx = useMySoClientContext();

			return (
				<div>
					<div>{`selected network: ${ctx.network}`}</div>
					{Object.keys(ctx.networks).map((network) => (
						<button key={network} onClick={() => props.selectNetwork(network)}>
							{`select ${network}`}
						</button>
					))}
				</div>
			);
		}

		function ControlledProvider() {
			const [selectedNetwork, setSelectedNetwork] = useState<'a' | 'b'>('a');

			return (
				<MySoClientProvider
					networks={{
						a: {
							url: 'http://localhost:8080',
							network: 'localnet',
							custom: setSelectedNetwork,
						},
						b: {
							url: 'http://localhost:8080',
							network: 'localnet',
							custom: setSelectedNetwork,
						},
					}}
					network={selectedNetwork}
				>
					<NetworkSelector
						selectNetwork={(network) => {
							setSelectedNetwork(network as 'a' | 'b');
						}}
					/>
				</MySoClientProvider>
			);
		}

		const user = userEvent.setup();

		render(<ControlledProvider />);

		expect(screen.getByText('selected network: a')).toBeInTheDocument();

		await user.click(screen.getByText('select b'));

		expect(screen.getByText('selected network: b')).toBeInTheDocument();
	});

	test('onNetworkChange', async () => {
		function NetworkSelector() {
			const ctx = useMySoClientContext();

			return (
				<div>
					<div>{`selected network: ${ctx.network}`}</div>
					{Object.keys(ctx.networks).map((network) => (
						<button key={network} onClick={() => ctx.selectNetwork(network)}>
							{`select ${network}`}
						</button>
					))}
				</div>
			);
		}

		function ControlledProvider() {
			const [selectedNetwork, setSelectedNetwork] = useState<string>('a');

			return (
				<MySoClientProvider
					networks={{
						a: {
							url: 'http://localhost:8080',
							network: 'localnet',
							custom: setSelectedNetwork,
						},
						b: {
							url: 'http://localhost:8080',
							network: 'localnet',
							custom: setSelectedNetwork,
						},
					}}
					network={selectedNetwork as 'a' | 'b'}
					onNetworkChange={(network) => {
						setSelectedNetwork(network);
					}}
				>
					<NetworkSelector />
				</MySoClientProvider>
			);
		}

		const user = userEvent.setup();

		render(<ControlledProvider />);

		expect(screen.getByText('selected network: a')).toBeInTheDocument();

		await user.click(screen.getByText('select b'));

		expect(screen.getByText('selected network: b')).toBeInTheDocument();
	});
});
