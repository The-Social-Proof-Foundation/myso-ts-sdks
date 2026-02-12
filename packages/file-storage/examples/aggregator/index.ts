// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import { serve } from '@hono/node-server';
import { MySoGrpcClient } from '@socialproof/myso/grpc';
import { Hono } from 'hono';

import { BlobBlockedError, BlobNotCertifiedError, FileStorageClient } from '../../src/index.js';

const app = new Hono();

const mysoClient = new MySoGrpcClient({
	network: 'testnet',
	baseUrl: 'https://fullnode.testnet.mysocial.network:443',
});

const fileStorageClient = new FileStorageClient({
	network: 'testnet',
	mysoClient,
});

const cache = new Map<string, Blob>();

app.get('/v1/blobs/:id', async (c) => {
	const blobId = c.req.param('id');

	if (!blobId) {
		return c.json({ error: 'Missing blob id' }, 400);
	}

	if (cache.has(blobId)) {
		return c.body(cache.get(blobId)!.stream());
	}

	try {
		const blob = await fileStorageClient.readBlob({ blobId });
		cache.set(blobId, new Blob([blob.slice()]));

		return c.body(blob.buffer as ArrayBuffer);
	} catch (error) {
		if (error instanceof BlobBlockedError || error instanceof BlobNotCertifiedError) {
			return c.json({ error: 'Blob not found' }, 404);
		}

		return c.json({ error: 'Internal server error' }, 500);
	}
});

serve(app, (info) => {
	console.log(`Server is running on http://127.0.0.1:${info.port}`);
});
