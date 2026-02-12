// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

'use client';

import dynamic from 'next/dynamic';

const ClientApp = dynamic(() => import('./ClientOnlyConnectButton'), {
	ssr: false,
	loading: () => <div>ClientOnlyConnectButton is not rendered on server</div>,
});

export default function Home() {
	return <ClientApp />;
}
