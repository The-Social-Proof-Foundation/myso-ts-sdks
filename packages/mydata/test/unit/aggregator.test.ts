// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import { fromHex } from '@socialproof/bcs';
import { Ed25519Keypair } from '@socialproof/myso/keypairs/ed25519';
import { Transaction } from '@socialproof/myso/transactions';
import { MySoGrpcClient } from '@socialproof/myso/grpc';
import { getJsonRpcFullnodeUrl } from '@socialproof/myso/jsonRpc';
import { describe, it, expect } from 'vitest';

import { mydata } from '../../src/client.js';
import { SessionKey } from '../../src/session-key.js';

/**
 * Committee Aggregator Integration Tests against ci aggregator.
 */
describe('Committee Aggregator Tests', () => {
	it('encrypt and decrypt through aggregator', { timeout: 12000 }, async () => {
		// Committee key server object for aggregator ci server, that points to a committee of ci key servers.
		const COMMITTEE_KEY_SERVER_OBJ_ID =
			'0xa5d2b47e7c649a3c6f9730967a5514abb8e21f19f908ad78a6ad943970c6ad02';
		const AGGREGATOR_URL = 'https://mydata-aggregator-ci.mystenlabs.com';

		// A v1 independent server in ci.
		const INDEPENDENT_SERVER_OBJ_ID =
			'0x71a3962c5d06a94d1ef5a9c0e7d63ad72cefb48acc93001eaa7ba13fab52786e';

		// Testnet package with account_based policy.
		const PACKAGE_ID = '0x58dce5d91278bceb65d44666ffa225ab397fc3ae9d8398c8c779c5530bd978c2';

		const testKeypair = Ed25519Keypair.generate();
		const testAddress = testKeypair.getPublicKey().toMySoAddress();

		const testData = crypto.getRandomValues(new Uint8Array(100));

		// Create client with mydata extension.
		const client = new MySoGrpcClient({
			network: 'testnet',
			baseUrl: getJsonRpcFullnodeUrl('testnet'),
		}).$extend(
			mydata({
				serverConfigs: [
					{
						objectId: COMMITTEE_KEY_SERVER_OBJ_ID,
						weight: 1,
						aggregatorUrl: AGGREGATOR_URL,
					},
					{
						objectId: INDEPENDENT_SERVER_OBJ_ID,
						weight: 1,
					},
				],
				verifyKeyServers: false,
			}),
		);

		// Encrypt with policy and 2 servers (1 for committee, 1 for independent).
		const { encryptedObject: encryptedBytes } = await client.mydata.encrypt({
			threshold: 2,
			packageId: PACKAGE_ID,
			id: testAddress,
			data: testData,
		});

		// Create session key.
		const sessionKey = await SessionKey.create({
			address: testAddress,
			packageId: PACKAGE_ID,
			ttlMin: 10,
			signer: testKeypair,
			mysoClient: client,
		});

		// Build transaction.
		const tx = new Transaction();
		const keyIdArg = tx.pure.vector('u8', fromHex(testAddress));
		tx.moveCall({
			target: `${PACKAGE_ID}::account_based::mydata_approve`,
			arguments: [keyIdArg],
		});
		const txBytes = await tx.build({ client, onlyTransactionKind: true });

		// Decrypt data through aggregator.
		const decryptedData = await client.mydata.decrypt({
			data: encryptedBytes,
			sessionKey,
			txBytes,
		});

		// Verify decrypted data matches original.
		expect(decryptedData).toEqual(testData);
	});
});
