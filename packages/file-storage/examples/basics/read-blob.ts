// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import { MySoGrpcClient } from '@socialproof/myso/grpc';

import { fileStorage } from '../../src/client.js';

const client = new MySoGrpcClient({
	network: 'testnet',
	baseUrl: 'https://fullnode.testnet.mysocial.network:443',
}).$extend(fileStorage());

export async function retrieveBlob(blobId: string) {
	const blobBytes = await client.fileStorage.readBlob({ blobId });
	return new Blob([new Uint8Array(blobBytes)]);
}

(async function main() {
	const blob = await retrieveBlob('Io6fwE14GPGF_XUvDffBfDrgSJ1bFg4144CzWJK-W6U');

	const textDecoder = new TextDecoder('utf-8');
	const resultString = textDecoder.decode(await blob.arrayBuffer());

	console.log(resultString);
})();
