// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import { MySoGrpcClient } from '@socialproof/myso/grpc';

import { fileStorage } from '../../src/client.js';

const client = new MySoGrpcClient({
	network: 'testnet',
	baseUrl: 'https://fullnode.testnet.mysocial.network:443',
}).$extend(fileStorage());

(async function main() {
	const blobId = 'gmh2YbU_feDPaGeFkYFo2Si--GbM2hkajS54X1vfNIk';
	const patchId = 'gmh2YbU_feDPaGeFkYFo2Si--GbM2hkajS54X1vfNIkBAQACAA';
	const patchId2 = 'gmh2YbU_feDPaGeFkYFo2Si--GbM2hkajS54X1vfNIkBAgADAA';

	const [blob, patch1, patch2] = await client.fileStorage.getFiles({
		ids: [blobId, patchId, patchId2],
	});

	console.log(await patch1.getIdentifier());
	console.log(await patch1.getTags());
	console.log('content:', new TextDecoder().decode(await patch1.bytes()));

	await blob.bytes();

	console.log(await patch2.getIdentifier());
	console.log(await patch2.getTags());
	console.log('content:', new TextDecoder().decode(await patch2.bytes()));
})();
