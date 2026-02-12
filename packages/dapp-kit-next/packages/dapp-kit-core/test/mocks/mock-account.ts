// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import type { WalletAccount } from '@socialproof/wallet-standard';
import { Ed25519Keypair } from '@socialproof/myso/keypairs/ed25519';
import { ReadonlyWalletAccount } from '@socialproof/wallet-standard';
import { TEST_NETWORKS } from '../test-utils.js';

export function createMockAccount(options: Partial<WalletAccount> = {}) {
	const keypair = new Ed25519Keypair();
	return new ReadonlyWalletAccount({
		address: keypair.getPublicKey().toMySoAddress(),
		publicKey: keypair.getPublicKey().toMySoBytes(),
		chains: TEST_NETWORKS.map((network) => `myso:${network}` as const),
		features: [
			'myso:signAndExecuteTransactionBlock',
			'myso:signTransactionBlock',
			'myso:signAndExecuteTransaction',
			'myso:signTransaction',
		],
		...options,
	});
}
