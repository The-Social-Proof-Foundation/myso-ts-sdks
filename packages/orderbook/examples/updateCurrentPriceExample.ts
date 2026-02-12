// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

/**
 * This example demonstrates how to:
 * 1. Batch update Pyth price feeds for all 4 mainnet assets (MYSO, USDC, DEEP, WAL)
 * 2. Update the current price for MYSO_USDC, DEEP_USDC, and WAL_USDC pools
 *
 * Usage:
 *   npx tsx examples/updateCurrentPriceExample.ts
 *
 * Or with a private key:
 *   PRIVATE_KEY=mysoprivkey1... npx tsx examples/updateCurrentPriceExample.ts
 */

import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import { homedir } from 'os';
import path from 'path';

import { MySoGrpcClient } from '@socialproof/myso/grpc';
import { decodeMySoPrivateKey } from '@socialproof/myso/cryptography';
import { Ed25519Keypair } from '@socialproof/myso/keypairs/ed25519';
import { Secp256k1Keypair } from '@socialproof/myso/keypairs/secp256k1';
import { Secp256r1Keypair } from '@socialproof/myso/keypairs/secp256r1';
import { fromBase64 } from '@socialproof/myso/utils';
import { Transaction } from '@socialproof/myso/transactions';

import { orderbook } from '../src/index.js';

const MYSO = process.env.MYSO_BINARY ?? `myso`;

const GRPC_URL = 'https://fullnode.mainnet.mysocial.network:443';

const getActiveAddress = () => {
	return execSync(`${MYSO} client active-address`, { encoding: 'utf8' }).trim();
};

const getSigner = () => {
	if (process.env.PRIVATE_KEY) {
		console.log('Using supplied private key.');
		const { scheme, secretKey } = decodeMySoPrivateKey(process.env.PRIVATE_KEY);

		if (scheme === 'ED25519') return Ed25519Keypair.fromSecretKey(secretKey);
		if (scheme === 'Secp256k1') return Secp256k1Keypair.fromSecretKey(secretKey);
		if (scheme === 'Secp256r1') return Secp256r1Keypair.fromSecretKey(secretKey);

		throw new Error('Keypair not supported.');
	}

	const sender = getActiveAddress();

	const keystore = JSON.parse(
		readFileSync(path.join(homedir(), '.myso', 'myso_config', 'myso.keystore'), 'utf8'),
	);

	for (const priv of keystore) {
		const raw = fromBase64(priv);
		if (raw[0] !== 0) {
			continue;
		}

		const pair = Ed25519Keypair.fromSecretKey(raw.slice(1));
		if (pair.getPublicKey().toMySoAddress() === sender) {
			return pair;
		}
	}

	throw new Error(`keypair not found for sender: ${sender}`);
};

(async () => {
	const signer = getSigner();
	const address = signer.getPublicKey().toMySoAddress();

	console.log(`Using address: ${address}`);
	console.log(`Network: mainnet\n`);

	const client = new MySoGrpcClient({ network: 'mainnet', baseUrl: GRPC_URL }).$extend(
		orderbook({ address }),
	);

	// All 4 mainnet assets with Pyth price feeds
	const coinKeys = ['MYSO', 'USDC', 'DEEP', 'WAL'];

	// Pools to update current price for
	const poolKeys = ['MYSO_USDC', 'DEEP_USDC', 'WAL_USDC'];

	console.log(`Step 1: Batch updating Pyth price feeds for: ${coinKeys.join(', ')}\n`);

	try {
		const tx = new Transaction();

		// Batch fetch and update all price feeds
		// Only stale feeds (older than 30 seconds) will be updated
		const priceInfoObjects = await client.orderbook.getPriceInfoObjects(tx, coinKeys);

		console.log('Price Info Objects:');
		for (const [coinKey, objectId] of Object.entries(priceInfoObjects)) {
			console.log(`  ${coinKey}: ${objectId}`);
		}

		console.log(`\nStep 2: Updating current price for pools: ${poolKeys.join(', ')}\n`);

		// Update current price for each pool
		for (const poolKey of poolKeys) {
			client.orderbook.poolProxy.updateCurrentPrice(poolKey)(tx);
			console.log(`  Added updateCurrentPrice for ${poolKey}`);
		}

		// Check transaction commands
		const txData = tx.getData();
		const commandCount = txData.commands.length;

		console.log(`\nTotal commands in transaction: ${commandCount}`);
		console.log('Signing and executing transaction...\n');

		const result = await client.signAndExecuteTransaction({
			transaction: tx,
			signer,
			include: {
				effects: true,
			},
		});

		if (result.$kind === 'Transaction') {
			console.log('Transaction successful!');
			console.log('Digest:', result.Transaction.digest);
		} else {
			console.log('Transaction failed!');
			console.log('Error:', result.FailedTransaction.status);
		}
	} catch (error) {
		console.error('Error:', error);
	}
})();
