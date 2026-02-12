// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

export { FileStorageClient, fileStorage } from './client.js';
export type { FileStorageClientConfig, FileStoragePackageConfig, FileStorageOptions } from './types.js';
export { TESTNET_FILE_STORAGE_PACKAGE_CONFIG, MAINNET_FILE_STORAGE_PACKAGE_CONFIG } from './constants.js';
export type { StorageNodeClientOptions } from './storage-node/client.js';
export type * from './types.js';
export * from './storage-node/error.js';
export * from './error.js';

export { encodeQuilt, type EncodeQuiltOptions } from './utils/quilts.js';
export { blobIdFromInt, blobIdToInt } from './utils/bcs.js';

export { FileStorageFile, type FileReader } from './files/file.js';
export { FileStorageBlob } from './files/blob.js';
