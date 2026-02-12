// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import { bcs } from '@socialproof/myso/bcs';
import { normalizeMySoAddress, normalizeStructTag } from '@socialproof/myso/utils';
import type { MySoClientTypes } from '@socialproof/myso/client';

export const DEFAULT_SENDER = '0x0000000000000000000000000000000000000000000000000000000000000123';

// Named exports for common test object IDs (from DEFAULT_OBJECTS)
export const TEST_COIN_1_ID = '0xa5c000';
export const TEST_COIN_2_ID = '0xa5c001';
export const TEST_NFT_ID = '0xdead';
export const TEST_SHARED_OBJECT_ID = '0xbeef';

// Additional object IDs from DEFAULT_OBJECTS
export const TEST_USDC_COIN_ID = '0xb0c000'; // First USDC coin
export const TEST_WETH_COIN_ID = '0xc0c000'; // First WETH coin
export const TEST_PARENT_OWNED_COIN_ID = '0xa5c004'; // Coin with ObjectOwner
export const TEST_CONSENSUS_COIN_ID = '0xa5c005'; // Coin with ConsensusAddressOwner
export const TEST_OTHER_USER_COIN_ID = '0xcafe'; // Coin owned by 0xbabe

// Package/Module/Function names
export const TEST_PACKAGE_ID = '0x999';
export const TEST_MODULE_NAME = 'test';
export const TEST_TRANSFER_FUNCTION = 'transfer';
export const TEST_BATCH_TRANSFER_FUNCTION = 'batch_transfer';
export const TEST_TRANSFER_NFT_FUNCTION = 'transfer_nft';
export const TEST_COMPLEX_TRANSFER_FUNCTION = 'complex_transfer';

// Additional package IDs for tests
export const DEFI_PACKAGE_ID = '0xabc';
export const NFT_PACKAGE_ID = '0xdef';

// BCS structures for different object types
export const CoinStruct = bcs.struct('Coin', {
	id: bcs.Address,
	balance: bcs.struct('Balance', { value: bcs.u64() }),
});

// Helper functions to create owner types
export function createAddressOwner(address: string): MySoClientTypes.AddressOwner {
	return { $kind: 'AddressOwner', AddressOwner: address };
}

export function createSharedOwner(initialSharedVersion: string): MySoClientTypes.SharedOwner {
	return { $kind: 'Shared', Shared: { initialSharedVersion } };
}

export function createImmutableOwner(): MySoClientTypes.ImmutableOwner {
	return { $kind: 'Immutable', Immutable: true };
}

export function createObjectOwner(objectId: string): MySoClientTypes.ParentOwner {
	return { $kind: 'ObjectOwner', ObjectOwner: objectId };
}

export function createConsensusAddressOwner(
	owner: string,
	startVersion: string,
): MySoClientTypes.ConsensusAddressOwner {
	return { $kind: 'ConsensusAddressOwner', ConsensusAddressOwner: { owner, startVersion } };
}

// Helper functions to create mock objects
export function createMockCoin(params: {
	objectId: string;
	coinType: string;
	balance: bigint;
	owner: MySoClientTypes.ObjectOwner;
	version?: string;
	digest?: string;
}): MySoClientTypes.Object<{ content: true }> {
	const normalizedId = normalizeMySoAddress(params.objectId);
	const normalizedCoinType = normalizeStructTag(params.coinType);

	const content = CoinStruct.serialize({
		id: normalizedId,
		balance: { value: params.balance },
	}).toBytes();

	return {
		objectId: normalizedId,
		version: params.version || '100',
		digest: params.digest || '11111111111111111111111111111111',
		type: normalizeStructTag(`0x2::coin::Coin<${normalizedCoinType}>`),
		owner: params.owner,
		content,
		previousTransaction: undefined,
		objectBcs: undefined,
		json: undefined,
	};
}

// More realistic BCS structures
export const NFTStruct = bcs.struct('NFT', {
	id: bcs.Address,
	name: bcs.string(),
	description: bcs.string(),
	image_url: bcs.string(),
});

export function createMockNFT(params: {
	objectId: string;
	nftType: string;
	owner: MySoClientTypes.ObjectOwner;
	version?: string;
	digest?: string;
}): MySoClientTypes.Object<{ content: true }> {
	const normalizedId = normalizeMySoAddress(params.objectId);
	const normalizedNftType = normalizeStructTag(params.nftType);

	// More realistic NFT structure
	const content = NFTStruct.serialize({
		id: normalizedId,
		name: 'Test NFT',
		description: 'A test NFT object',
		image_url: 'https://example.com/nft.png',
	}).toBytes();

	return {
		objectId: normalizedId,
		version: params.version || '2',
		digest: params.digest || 'E7YX7zmxdAVVzrGkcoss2ziUHKMa7qBChPbqg5nGQyYo',
		type: normalizedNftType,
		owner: params.owner,
		content,
		previousTransaction: undefined,
		objectBcs: undefined,
		json: undefined,
	};
}

export function createMockObject(params: {
	objectId: string;
	objectType: string;
	owner: MySoClientTypes.ObjectOwner;
	version?: string;
	digest?: string;
	content?: Uint8Array;
}): MySoClientTypes.Object<{ content: true }> {
	const normalizedId = normalizeMySoAddress(params.objectId);
	const normalizedObjectType = normalizeStructTag(params.objectType);

	// Default content is just the object ID as address
	const content = (params.content ||
		bcs.Address.serialize(normalizedId).toBytes()) as Uint8Array<ArrayBuffer>;

	return {
		objectId: normalizedId,
		version: params.version || '1',
		digest: params.digest || '11111111111111111111111111111111',
		type: normalizedObjectType,
		owner: params.owner,
		content,
		previousTransaction: undefined,
		objectBcs: undefined,
		json: undefined,
	};
}

export function createMockMoveFunction(params: {
	packageId: string;
	moduleName: string;
	name: string;
	visibility: MySoClientTypes.Visibility;
	isEntry: boolean;
	typeParameters?: MySoClientTypes.TypeParameter[];
	parameters: MySoClientTypes.OpenSignature[];
	returns?: MySoClientTypes.OpenSignature[];
}): MySoClientTypes.FunctionResponse {
	return {
		packageId: normalizeMySoAddress(params.packageId),
		moduleName: params.moduleName,
		name: params.name,
		visibility: params.visibility,
		isEntry: params.isEntry,
		typeParameters: params.typeParameters || [],
		parameters: params.parameters,
		returns: params.returns || [],
	};
}

// Helper to create multiple coins with deterministic balance distribution
export function createMockCoins(params: {
	coinType: string;
	totalBalance: bigint;
	numCoins: number;
	owner: MySoClientTypes.ObjectOwner;
	baseObjectId?: string;
}): MySoClientTypes.Object<{ content: true }>[] {
	const coins: MySoClientTypes.Object<{ content: true }>[] = [];
	const baseId = params.baseObjectId || '0xc01';

	// Split balance deterministically across coins using powers of 2
	const balances: bigint[] = [];
	let remainingBalance = params.totalBalance;

	// Use a deterministic pattern: first coin gets 50%, second gets 25%, third gets 12.5%, etc.
	for (let i = 0; i < params.numCoins - 1; i++) {
		const divisor = 2n ** BigInt(i + 1);
		const amount = params.totalBalance / divisor;
		balances.push(amount);
		remainingBalance -= amount;
	}
	// Last coin gets the remaining balance
	balances.push(remainingBalance);

	for (let i = 0; i < params.numCoins; i++) {
		// Generate valid hex object ID
		const suffix = i.toString(16).padStart(2, '0');
		const objectId = normalizeMySoAddress(`${baseId}${suffix}`);
		coins.push(
			createMockCoin({
				objectId,
				coinType: params.coinType,
				balance: balances[i],
				owner: params.owner,
				version: (100 + i).toString(),
			}),
		);
	}

	return coins;
}

// Default objects that the mock client knows about
export const DEFAULT_OBJECTS: MySoClientTypes.Object<{ content: true }>[] = [
	// 10 MYSO coins for main sender (split across multiple coins)
	...createMockCoins({
		coinType: '0x2::myso::MYSO',
		totalBalance: 10000000000n, // 10 MYSO
		numCoins: 10,
		owner: createAddressOwner(DEFAULT_SENDER),
		baseObjectId: '0xa5c0',
	}),
	// 3 USDC coins for main sender
	...createMockCoins({
		coinType: '0xa0b::usdc::USDC',
		totalBalance: 1000000000n, // 1000 USDC
		numCoins: 3,
		owner: createAddressOwner(DEFAULT_SENDER),
		baseObjectId: '0xb0c0',
	}),
	// 2 WETH coins for main sender
	...createMockCoins({
		coinType: '0xb0c::weth::WETH',
		totalBalance: 5000000000000000000n, // 5 WETH
		numCoins: 2,
		owner: createAddressOwner(DEFAULT_SENDER),
		baseObjectId: '0xc0c0',
	}),
	// Coin with ObjectOwner for testing
	createMockCoin({
		objectId: '0xa5c04',
		coinType: '0x2::myso::MYSO',
		balance: 100000000n,
		owner: createObjectOwner('0xparent'),
	}),
	// Coin with ConsensusAddressOwner for testing
	createMockCoin({
		objectId: '0xa5c05',
		coinType: '0x2::myso::MYSO',
		balance: 50000000n,
		owner: createConsensusAddressOwner(DEFAULT_SENDER, '100'),
	}),
	// Another user's MYSO coin
	createMockCoin({
		objectId: '0xcafe',
		coinType: '0x2::myso::MYSO',
		balance: 5000000n,
		owner: createAddressOwner('0xbabe'),
	}),
	// NFT object
	createMockNFT({
		objectId: '0xdead',
		nftType: '0x999::nft::NFT',
		owner: createAddressOwner('0xbabe'),
	}),
	// Shared pool object
	createMockObject({
		objectId: '0xbeef',
		objectType: '0x999::pool::Pool',
		owner: createSharedOwner('1'),
	}),
];

// Default move functions that the mock client knows about
export const DEFAULT_MOVE_FUNCTIONS: MySoClientTypes.FunctionResponse[] = [
	createMockMoveFunction({
		packageId: '0x999',
		moduleName: 'test',
		name: TEST_TRANSFER_FUNCTION,
		visibility: 'public',
		isEntry: false,
		parameters: [
			{
				reference: 'mutable',
				body: {
					$kind: 'datatype',
					datatype: { typeName: '0x999::nft::NFT', typeParameters: [] },
				},
			},
			{ reference: null, body: { $kind: 'u64' } },
			{ reference: null, body: { $kind: 'address' } },
			{ reference: null, body: { $kind: 'bool' } },
		],
	}),
	createMockMoveFunction({
		packageId: '0x999',
		moduleName: 'test',
		name: TEST_BATCH_TRANSFER_FUNCTION,
		visibility: 'public',
		isEntry: false,
		parameters: [
			{
				reference: 'mutable',
				body: {
					$kind: 'vector',
					vector: {
						$kind: 'datatype',
						datatype: {
							typeName: '0x2::coin::Coin',
							typeParameters: [{ $kind: 'typeParameter', index: 0 }],
						},
					},
				},
			},
		],
	}),
	createMockMoveFunction({
		packageId: '0x999',
		moduleName: 'test',
		name: TEST_TRANSFER_NFT_FUNCTION,
		visibility: 'public',
		isEntry: false,
		parameters: [
			{
				reference: 'mutable',
				body: {
					$kind: 'datatype',
					datatype: { typeName: '0x999::nft::NFT', typeParameters: [] },
				},
			},
			{ reference: null, body: { $kind: 'address' } },
		],
	}),
	createMockMoveFunction({
		packageId: '0x999',
		moduleName: 'test',
		name: TEST_COMPLEX_TRANSFER_FUNCTION,
		visibility: 'public',
		isEntry: false,
		parameters: [
			{
				reference: 'mutable',
				body: {
					$kind: 'vector',
					vector: {
						$kind: 'datatype',
						datatype: {
							typeName: '0x2::coin::Coin',
							typeParameters: [{ $kind: 'typeParameter', index: 0 }],
						},
					},
				},
			},
			{ reference: null, body: { $kind: 'u64' } },
			{ reference: null, body: { $kind: 'address' } },
			{ reference: null, body: { $kind: 'bool' } },
			{ reference: null, body: { $kind: 'vector', vector: { $kind: 'u8' } } },
		],
	}),
	createMockMoveFunction({
		packageId: '0x999',
		moduleName: 'test',
		name: 'consume_coin',
		visibility: 'public',
		isEntry: false,
		typeParameters: [{ constraints: [], isPhantom: false }],
		parameters: [
			{
				reference: 'mutable',
				body: {
					$kind: 'datatype',
					datatype: {
						typeName: '0x2::coin::Coin',
						typeParameters: [{ $kind: 'typeParameter', index: 0 }],
					},
				},
			},
			{
				reference: null,
				body: {
					$kind: 'datatype',
					datatype: {
						typeName: '0x2::coin::Coin',
						typeParameters: [{ $kind: 'typeParameter', index: 0 }],
					},
				},
			},
		],
	}),
	createMockMoveFunction({
		packageId: '0x999',
		moduleName: 'test',
		name: 'batch_operation',
		visibility: 'public',
		isEntry: false,
		typeParameters: [{ constraints: [], isPhantom: false }],
		parameters: [
			{
				reference: 'mutable',
				body: {
					$kind: 'vector',
					vector: {
						$kind: 'datatype',
						datatype: {
							typeName: '0x2::coin::Coin',
							typeParameters: [{ $kind: 'typeParameter', index: 0 }],
						},
					},
				},
			},
		],
	}),
	createMockMoveFunction({
		packageId: '0999',
		moduleName: 'test',
		name: 'create_coin',
		visibility: 'public',
		isEntry: false,
		parameters: [],
		returns: [
			{
				reference: null,
				body: {
					$kind: 'datatype',
					datatype: {
						typeName: '0x2::coin::Coin',
						typeParameters: [
							{
								$kind: 'datatype',
								datatype: {
									typeName: '0x2::myso::MYSO',
									typeParameters: [],
								},
							},
						],
					},
				},
			},
		],
	}),
	createMockMoveFunction({
		packageId: '0x999',
		moduleName: 'test',
		name: 'get_dynamic_amount',
		visibility: 'public',
		isEntry: false,
		parameters: [],
		returns: [{ reference: null, body: { $kind: 'u64' } }],
	}),
];

export const DEFAULT_GAS_PRICE = '1000';
