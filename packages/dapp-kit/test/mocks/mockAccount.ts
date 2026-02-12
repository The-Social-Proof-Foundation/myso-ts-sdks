// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import { Ed25519Keypair } from '@socialproof/myso/keypairs/ed25519';
import type { WalletAccount } from '@socialproof/wallet-standard';
import { ReadonlyWalletAccount } from '@socialproof/wallet-standard';

export function createMockAccount(accountOverrides: Partial<WalletAccount> = {}) {
	const keypair = new Ed25519Keypair();
	return new ReadonlyWalletAccount({
		address: keypair.getPublicKey().toMySoAddress(),
		publicKey: keypair.getPublicKey().toMySoBytes(),
		chains: ['myso:unknown'],
		features: [
			'myso:signAndExecuteTransactionBlock',
			'myso:signTransactionBlock',
			'myso:signAndExecuteTransaction',
			'myso:signTransaction',
		],
		...accountOverrides,
	});
}
