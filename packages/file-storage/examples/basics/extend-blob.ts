// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import { MySoGrpcClient } from '@socialproof/myso/grpc';
import { Agent, setGlobalDispatcher } from 'undici';

import { fileStorage } from '../../src/client.js';
import { getFundedKeypair } from '../funded-keypair.js';

// Node connect timeout is 10 seconds, and file-storage nodes can be slow to respond
setGlobalDispatcher(
	new Agent({
		connectTimeout: 60_000,
		connect: { timeout: 60_000 },
	}),
);

const client = new MySoGrpcClient({
	network: 'testnet',
	baseUrl: 'https://fullnode.testnet.mysocial.network:443',
}).$extend(
	fileStorage({
		storageNodeClientOptions: {
			timeout: 60_000,
		},
	}),
);

async function writeAndExtendBlob() {
	const keypair = await getFundedKeypair();

	const file = new TextEncoder().encode('Hello from the TS SDK - testing extendBlob fix!\n');

	const { blobObject } = await client.fileStorage.writeBlob({
		blob: file,
		deletable: false, // Non-deletable blob so we can extend it
		epochs: 1, // Start with 1 epoch
		signer: keypair,
	});

	await client.fileStorage.executeExtendBlobTransaction({
		blobObjectId: blobObject.id,
		epochs: 2, // Extend by 2 more epochs
		signer: keypair,
	});

	console.log('extended blob', blobObject.blob_id);
}

writeAndExtendBlob().catch(console.error);
