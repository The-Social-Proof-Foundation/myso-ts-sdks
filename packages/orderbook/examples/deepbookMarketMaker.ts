// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0
import type { ClientWithExtensions } from '@socialproof/myso/client';
import { MySoGrpcClient } from '@socialproof/myso/grpc';
import { decodeMySoPrivateKey } from '@socialproof/myso/cryptography';
import type { Keypair } from '@socialproof/myso/cryptography';
import { Ed25519Keypair } from '@socialproof/myso/keypairs/ed25519';
import type { Transaction } from '@socialproof/myso/transactions';

import { orderbook, type OrderbookClient } from '../src/index.js'; // Adjust path according to new structure
import type { BalanceManager } from '../src/types/index.js';

const GRPC_URLS = {
	mainnet: 'https://fullnode.mainnet.mysocial.network:443',
	testnet: 'https://fullnode.testnet.mysocial.network:443',
} as const;

export class OrderbookMarketMaker {
	keypair: Keypair;
	client: ClientWithExtensions<{ orderbook: OrderbookClient }>;

	constructor(
		keypair: string | Keypair,
		network: 'testnet' | 'mainnet',
		balanceManagers?: { [key: string]: BalanceManager },
		adminCap?: string,
	) {
		let resolvedKeypair: Keypair;

		if (typeof keypair === 'string') {
			resolvedKeypair = OrderbookMarketMaker.#getSignerFromPK(keypair);
		} else {
			resolvedKeypair = keypair;
		}

		const address = resolvedKeypair.toMySoAddress();

		this.keypair = resolvedKeypair;
		this.client = new MySoGrpcClient({ network, baseUrl: GRPC_URLS[network] }).$extend(
			orderbook({
				address: address,
				balanceManagers: balanceManagers,
				adminCap: adminCap,
			}),
		);
	}

	static #getSignerFromPK = (privateKey: string) => {
		const { scheme, secretKey } = decodeMySoPrivateKey(privateKey);
		if (scheme === 'ED25519') return Ed25519Keypair.fromSecretKey(secretKey);

		throw new Error(`Unsupported scheme: ${scheme}`);
	};

	signAndExecute = async (tx: Transaction) => {
		return this.keypair.signAndExecuteTransaction({
			transaction: tx,
			client: this.client,
		});
	};

	getActiveAddress() {
		return this.keypair.getPublicKey().toMySoAddress();
	}

	// Example of a flash loan transaction
	// Borrow 1 DEEP from DEEP_MYSO pool
	// Swap 0.5 DBUSDC for MYSO in MYSO_DBUSDC pool, pay with deep borrowed
	// Swap MYSO back to DEEP
	// Return 1 DEEP to DEEP_MYSO pool
	flashLoanExample = async (tx: Transaction) => {
		const borrowAmount = 1;
		const [deepCoin, flashLoan] = tx.add(
			this.client.orderbook.flashLoans.borrowBaseAsset('DEEP_MYSO', borrowAmount),
		);

		// Execute trade using borrowed DEEP
		const [baseOut, quoteOut, deepOut] = tx.add(
			this.client.orderbook.orderbook.swapExactQuoteForBase({
				poolKey: 'MYSO_DBUSDC',
				amount: 0.5,
				deepAmount: 1,
				minOut: 0,
				deepCoin: deepCoin,
			}),
		);

		tx.transferObjects([baseOut, quoteOut, deepOut], this.getActiveAddress());

		// Execute second trade to get back DEEP for repayment
		const [baseOut2, quoteOut2, deepOut2] = tx.add(
			this.client.orderbook.orderbook.swapExactQuoteForBase({
				poolKey: 'DEEP_MYSO',
				amount: 10,
				deepAmount: 0,
				minOut: 0,
			}),
		);

		tx.transferObjects([quoteOut2, deepOut2], this.getActiveAddress());

		// Return borrowed DEEP
		const loanRemain = tx.add(
			this.client.orderbook.flashLoans.returnBaseAsset(
				'DEEP_MYSO',
				borrowAmount,
				baseOut2,
				flashLoan,
			),
		);
		tx.transferObjects([loanRemain], this.getActiveAddress());
	};

	placeLimitOrderExample = (tx: Transaction) => {
		tx.add(
			this.client.orderbook.orderbook.placeLimitOrder({
				poolKey: 'MYSO_DBUSDC',
				balanceManagerKey: 'MANAGER_1',
				clientOrderId: '123456789',
				price: 1,
				quantity: 10,
				isBid: true,
				// orderType default: no restriction
				// selfMatchingOption default: allow self matching
				// payWithDeep default: true
			}),
		);
	};
}
