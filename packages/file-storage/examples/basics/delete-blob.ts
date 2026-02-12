// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import { MySoGrpcClient } from '@socialproof/myso/grpc';
import { Agent, setGlobalDispatcher } from 'undici';

import { FileStorageClient } from '../../src/client.js';
import { getFundedKeypair } from '../funded-keypair.js';

// Node connect timeout is 10 seconds, and file-storage nodes can be slow to respond
setGlobalDispatcher(
	new Agent({
		connectTimeout: 60_000,
		connect: { timeout: 60_000 },
	}),
);

const mysoClient = new MySoGrpcClient({
	network: 'testnet',
	baseUrl: 'https://fullnode.testnet.mysocial.network:443',
});

const fileStorageClient = new FileStorageClient({
	network: 'testnet',
	mysoClient,
	storageNodeClientOptions: {
		timeout: 60_000,
	},
});

async function uploadFile() {
	const keypair = await getFundedKeypair();

	const file = new TextEncoder().encode('Hello from the TS SDK!!!\n');

	const { blobObject } = await fileStorageClient.writeBlob({
		blob: file,
		deletable: true,
		epochs: 3,
		signer: keypair,
	});

	console.log('created blob', blobObject.id);

	await fileStorageClient.executeDeleteBlobTransaction({
		signer: keypair,
		blobObjectId: blobObject.id,
	});

	console.log('deleted blob', blobObject.id);
}

uploadFile().catch(console.error);
