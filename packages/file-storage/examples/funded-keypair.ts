// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import { MySoGrpcClient } from '@socialproof/myso/grpc';
import { getFaucetHost, requestMySoFromFaucetV2 } from '@socialproof/myso/faucet';
import { Ed25519Keypair } from '@socialproof/myso/keypairs/ed25519';
import { coinWithBalance, Transaction } from '@socialproof/myso/transactions';
import { MIST_PER_MYSO, parseStructTag } from '@socialproof/myso/utils';

import { TESTNET_FILE_STORAGE_PACKAGE_CONFIG } from '../src/index.js';

export async function getFundedKeypair() {
	const mysoClient = new MySoGrpcClient({
		network: 'testnet',
		baseUrl: 'https://fullnode.testnet.mysocial.network:443',
	});

	const keypair = Ed25519Keypair.fromSecretKey(
		'mysoprivkey1qzmcxscyglnl9hnq82crqsuns0q33frkseks5jw0fye3tuh83l7e6ajfhxx',
	);
	console.log(keypair.toMySoAddress());

	const { balance } = await mysoClient.getBalance({
		owner: keypair.toMySoAddress(),
	});

	if (BigInt(balance.balance) < MIST_PER_MYSO) {
		await requestMySoFromFaucetV2({
			host: getFaucetHost('testnet'),
			recipient: keypair.toMySoAddress(),
		});
	}

	const walBalance = await mysoClient.getBalance({
		owner: keypair.toMySoAddress(),
		coinType: `0x8270feb7375eee355e64fdb69c50abb6b5f9393a722883c1cf45f8e26048810a::wal::WAL`,
	});
	console.log('wal balance:', walBalance.balance);

	if (Number(walBalance.balance) < Number(MIST_PER_MYSO) / 2) {
		const tx = new Transaction();

		const exchange = await mysoClient.getObject({
			objectId: TESTNET_FILE_STORAGE_PACKAGE_CONFIG.exchangeIds[0],
		});

		// oxlint-disable-next-line no-non-null-asserted-optional-chain
		const exchangePackageId = parseStructTag(exchange.object.type).address;

		const wal = tx.moveCall({
			package: exchangePackageId,
			module: 'wal_exchange',
			function: 'exchange_all_for_wal',
			arguments: [
				tx.object(TESTNET_FILE_STORAGE_PACKAGE_CONFIG.exchangeIds[0]),
				coinWithBalance({
					balance: MIST_PER_MYSO / 2n,
				}),
			],
		});

		tx.transferObjects([wal], keypair.toMySoAddress());

		const result = await mysoClient.signAndExecuteTransaction({
			transaction: tx,
			signer: keypair,
		});

		await mysoClient.waitForTransaction({
			digest: (result.Transaction ?? result.FailedTransaction).digest,
		});

		console.log((result.Transaction ?? result.FailedTransaction).effects);
	}

	return keypair;
}
