// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import { DocsLayout } from 'fumadocs-ui/layouts/docs';

import { baseOptions } from '@/app/layout.config';
import { source } from '@/lib/source';

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<DocsLayout
			{...baseOptions}
			tree={source.pageTree}
			sidebar={{
				tabs: [
					{
						title: 'MySo SDK',
						description: 'TypeScript interfaces for MySo',
						url: '/myso',
					},
					{
						title: 'BCS',
						description: 'Encoding and decoding MySo objects',
						url: '/bcs',
					},
					{
						title: 'Codegen',
						description: 'Generate type-safe TypeScript from Move packages',
						url: '/codegen',
					},
					{
						title: 'dApp Kit',
						description: 'Build MySo dApps',
						url: '/dapp-kit',
					},
					{
						title: 'Payment Kit',
						description: 'Typescript SDK to leverage the Payment Kit Standard',
						url: '/payment-kit',
					},
					{
						title: 'Slush Wallet',
						description: 'Slush wallet integration',
						url: '/slush-wallet',
					},
					{
						title: 'file-storage',
						description: 'Publish and Read blobs directly from file-storage storage nodes',
						url: '/file-storage',
					},
					{
						title: 'zkSend',
						description: 'Send MySo with a link',
						url: '/zksend',
					},
					{
						title: 'API Reference',
						url: '/typedoc/index.html',
					},
				],
			}}
		>
			{children}
		</DocsLayout>
	);
}
