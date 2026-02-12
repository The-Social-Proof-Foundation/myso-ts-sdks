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
		uploadRelay: {
			host: 'https://upload-relay.testnet.file-storage.space',
			sendTip: {
				max: 1_000,
			},
		},
	}),
);

async function uploadFile() {
	const keypair = await getFundedKeypair();

	const files = [
		FileStorageFile.from({
			contents: new TextEncoder().encode('test 1'),
			identifier: 'test1',
			tags: {
				a: 'a',
				aa: 'aa',
				b: 'b',
			},
		}),
		FileStorageFile.from({
			contents: new TextEncoder().encode('test 2'),
			identifier: 'test2',
		}),
	];

	const flow = await client.fileStorage.writeFilesFlow({
		files,
	});

	await flow.encode();

	const registerResult = await client.signAndExecuteTransaction({
		transaction: flow.register({
			deletable: true,
			epochs: 3,
			owner: keypair.toMySoAddress(),
		}),
		signer: keypair,
	});

	if (registerResult.FailedTransaction) {
		throw new Error('Register transaction failed');
	}

	await flow.upload({ digest: registerResult.Transaction.digest });

	await client.signAndExecuteTransaction({
		transaction: flow.certify(),
		signer: keypair,
	});

	const result = await flow.listFiles();

	console.log(result);
}

uploadFile().catch((error) => console.error(error));
