// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import { MySoGrpcClient } from '@socialproof/myso/grpc';

import { FileStorageClient } from '../../src/client.js';
import { getFundedKeypair } from '../funded-keypair.js';

const mysoClient = new MySoGrpcClient({
	network: 'testnet',
	baseUrl: 'https://fullnode.testnet.mysocial.network:443',
});

const fileStorageClient = new FileStorageClient({
	network: 'testnet',
	mysoClient,
});

async function uploadFile() {
	const keypair = await getFundedKeypair();

	const file = new TextEncoder().encode('Hello from the TS SDK!!!\n');

	const { blobId, blobObject } = await fileStorageClient.writeBlob({
		blob: file,
		deletable: true,
		epochs: 3,
		signer: keypair,
		attributes: {
			contentType: 'text/plain',
			contentLength: file.length.toString(),
		},
	});

	console.log(blobId);

	const attributes = await fileStorageClient.readBlobAttributes({
		blobObjectId: blobObject.id,
	});

	console.log(attributes);

	await fileStorageClient.executeWriteBlobAttributesTransaction({
		signer: keypair,
		blobObjectId: blobObject.id,
		attributes: {
			contentLength: null,
			updated: 'true',
		},
	});

	const updatedAttributes = await fileStorageClient.readBlobAttributes({
		blobObjectId: blobObject.id,
	});

	console.log(updatedAttributes);
}

uploadFile().catch(console.error);
