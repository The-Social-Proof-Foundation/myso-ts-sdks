// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import { serve } from '@hono/node-server';
import { MySoGrpcClient } from '@socialproof/myso/grpc';
import { Hono } from 'hono';

import { FileStorageClient } from '../../src/index.js';
import { getFundedKeypair } from '../funded-keypair.js';

const mysoClient = new MySoGrpcClient({
	network: 'testnet',
	baseUrl: 'https://fullnode.testnet.mysocial.network:443',
});

const fileStorageClient = new FileStorageClient({
	network: 'testnet',
	mysoClient,
});

async function startServer() {
	const keypair = await getFundedKeypair();

	const app = new Hono();

	app.put('/v1/blobs', async (c) => {
		const body = await c.req.arrayBuffer();
		const blob = new Uint8Array(body);
		const epochs = Number.parseInt(c.req.query('epochs') ?? '3', 10);
		const sendObjectTo = c.req.query('send_object_to');
		const deletable = c.req.query('deletable') === 'true';

		const { storageCost, writeCost } = await fileStorageClient.storageCost(blob.length, epochs);

		const { blobObject } = await fileStorageClient.writeBlob({
			blob,
			deletable,
			epochs,
			signer: keypair,
			owner: sendObjectTo ?? keypair.toMySoAddress(),
		});

		// Match the format of the rust based aggregator
		return c.json({
			newlyCreated: {
				...blobObject,
				id: blobObject.id,
				storage: {
					...blobObject.storage,
					id: blobObject.storage.id,
				},
			},
			resourceOperation: {
				registerFromScratch: {
					encodedLength: blobObject.storage.storage_size,
					epochsAhead: epochs,
				},
			},
			cost: Number(storageCost + writeCost),
		});
	});

	serve(app, (info) => {
		console.log(`Server is running on http://127.0.0.1:${info.port}`);
	});
}

startServer().catch(console.error);
