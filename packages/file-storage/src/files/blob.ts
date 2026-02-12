// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import type { FileStorageClient } from '../client.js';
import type { BlobReader } from './readers/blob.js';
import { FileStorageFile } from './file.js';
import { ClientCache } from '@socialproof/myso/client';

export class FileStorageBlob {
	#reader: BlobReader;
	#client: FileStorageClient;
	#cache = new ClientCache();

	constructor({ reader, client }: { reader: BlobReader; client: FileStorageClient }) {
		this.#reader = reader;
		this.#client = client;
	}

	// Get the blob as a file (i.e. do not use Quilt encoding)
	asFile() {
		return new FileStorageFile({ reader: this.#reader });
	}

	async blobId(): Promise<string | null> {
		return this.#reader.blobId;
	}

	// Gets quilt-based files associated with this blob.
	async files(
		filters: {
			ids?: string[];
			tags?: { [tagName: string]: string }[];
			identifiers?: string[];
		} = {},
	) {
		const quiltReader = await this.#reader.getQuiltReader();
		const index = await quiltReader.readIndex();

		const files = [];

		for (const patch of index) {
			if (filters.ids && !filters.ids.includes(patch.patchId)) {
				continue;
			}

			if (filters.identifiers && !filters.identifiers.includes(patch.identifier)) {
				continue;
			}

			if (
				filters.tags &&
				!filters.tags.some((tags) =>
					Object.entries(tags).every(([tagName, tagValue]) => patch.tags[tagName] === tagValue),
				)
			) {
				continue;
			}

			files.push(new FileStorageFile({ reader: quiltReader.readerForPatchId(patch.patchId) }));
		}

		return files;
	}

	async #blobStatus() {
		return this.#cache.read(['blobStatus', this.#reader.blobId], () =>
			this.#client.getVerifiedBlobStatus({ blobId: this.#reader.blobId }),
		);
	}

	async exists() {
		const status = await this.#blobStatus();
		return status.type === 'permanent' || status.type === 'deletable';
	}

	async storedUntil() {
		const status = await this.#blobStatus();

		if (status.type === 'permanent') {
			return status.endEpoch;
		}

		return null;
	}
}
