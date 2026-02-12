// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import { LocalReader } from './readers/local.js';

export interface FileReader {
	getIdentifier(): Promise<string | null>;
	getTags(): Promise<Record<string, string>>;
	getBytes(): Promise<Uint8Array>;
}

export class FileStorageFile {
	#reader: FileReader;

	static from(options: {
		contents: Uint8Array | Blob;
		identifier: string;
		tags?: Record<string, string>;
	}) {
		return new FileStorageFile({
			reader: new LocalReader(options),
		});
	}

	constructor({ reader }: { reader: FileReader }) {
		this.#reader = reader;
	}

	getIdentifier() {
		return this.#reader.getIdentifier();
	}
	getTags() {
		return this.#reader.getTags();
	}

	bytes() {
		return this.#reader.getBytes();
	}

	async text() {
		const bytes = await this.bytes();

		return new TextDecoder().decode(bytes);
	}

	async json() {
		return JSON.parse(await this.text());
	}
}
