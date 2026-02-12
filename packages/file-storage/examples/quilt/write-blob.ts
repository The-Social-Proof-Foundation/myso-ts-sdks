// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import { MySoGrpcClient } from '@socialproof/myso/grpc';
import { Agent, setGlobalDispatcher } from 'undici';

import { fileStorage } from '../../src/client.js';
import { getFundedKeypair } from '../funded-keypair.js';
import { FileStorageFile } from '../../src/index.js';

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

async function uploadFile() {
	const keypair = await getFundedKeypair();

	const files = [
		FileStorageFile.from({
			contents: new TextEncoder().encode('test 1!'),
			identifier: 'test1',
			tags: {
				a: 'a',
				aa: 'aa',
				b: 'b',
			},
		}),
		FileStorageFile.from({
			contents: new TextEncoder().encode('test 2!'),
			identifier: 'test2',
		}),
		FileStorageFile.from({
			contents: new TextEncoder().encode('a'.repeat(1000)),
			identifier: 'test3',
		}),
	];

	const quilt = await client.fileStorage.writeFiles({
		files,
		deletable: true,
		epochs: 3,
		signer: keypair,
	});

	console.log(quilt);
}

uploadFile().catch(console.error);
