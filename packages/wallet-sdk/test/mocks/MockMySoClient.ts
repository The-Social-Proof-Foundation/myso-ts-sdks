// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import type { MySoClientTypes } from '@socialproof/myso/client';
import { CoreClient } from '@socialproof/myso/client';
import {
	normalizeMySoAddress,
	normalizeStructTag,
	parseStructTag,
	MYSO_FRAMEWORK_ADDRESS,
} from '@socialproof/myso/utils';
import type { TransactionPlugin } from '@socialproof/myso/transactions';
import { Inputs } from '@socialproof/myso/transactions';
import {
	DEFAULT_OBJECTS,
	DEFAULT_MOVE_FUNCTIONS,
	DEFAULT_GAS_PRICE,
	CoinStruct,
	createMockCoin,
	createMockNFT,
	createMockObject,
	createMockMoveFunction,
} from './mockData.js';

export class MockMySoClient extends CoreClient {
	#objects = new Map<string, MySoClientTypes.Object<{ content: true }>>();
	#moveFunctions = new Map<string, MySoClientTypes.FunctionResponse>();
	#gasPrice = DEFAULT_GAS_PRICE;
	#nextDryRunResult: MySoClientTypes.TransactionResult<any> | null = null;

	constructor(network: MySoClientTypes.Network = 'testnet') {
		super({
			network,
			base: null as unknown as CoreClient,
		});
		this.base = this;

		this.#initializeDefaults();
	}

	#initializeDefaults() {
		// Add all default objects
		for (const obj of DEFAULT_OBJECTS) {
			this.#objects.set(obj.objectId, obj);
		}

		// Add all default move functions
		for (const fn of DEFAULT_MOVE_FUNCTIONS) {
			const normalizedPackageId = normalizeMySoAddress(fn.packageId);
			const key = `${normalizedPackageId}::${fn.moduleName}::${fn.name}`;
			this.#moveFunctions.set(key, fn);
		}
	}

	// Helper methods to add objects during tests
	addCoin(params: {
		objectId: string;
		coinType: string;
		balance: bigint;
		owner: MySoClientTypes.ObjectOwner;
		version?: string;
		digest?: string;
	}): void {
		const coin = createMockCoin(params);
		this.#objects.set(coin.objectId, coin);
	}

	addNFT(params: {
		objectId: string;
		nftType: string;
		owner: MySoClientTypes.ObjectOwner;
		version?: string;
		digest?: string;
	}): void {
		const nft = createMockNFT(params);
		this.#objects.set(nft.objectId, nft);
	}

	addObject(params: {
		objectId: string;
		objectType: string;
		owner: MySoClientTypes.ObjectOwner;
		version?: string;
		digest?: string;
		content?: Uint8Array;
	}): void {
		const obj = createMockObject(params);
		this.#objects.set(obj.objectId, obj);
	}

	addMoveFunction(params: {
		packageId: string;
		moduleName: string;
		name: string;
		visibility: MySoClientTypes.Visibility;
		isEntry: boolean;
		typeParameters?: MySoClientTypes.TypeParameter[];
		parameters: MySoClientTypes.OpenSignature[];
		returns?: MySoClientTypes.OpenSignature[];
	}): void {
		const fn = createMockMoveFunction(params);
		const normalizedPackageId = normalizeMySoAddress(fn.packageId);
		const key = `${normalizedPackageId}::${fn.moduleName}::${fn.name}`;
		this.#moveFunctions.set(key, fn);
	}

	setNextDryRunResult(result: MySoClientTypes.TransactionResult<any>): void {
		this.#nextDryRunResult = result;
	}

	setGasPrice(price: string): void {
		this.#gasPrice = price;
	}

	// Helper function to check if an object is owned by the given address
	#isOwnedByAddress(obj: MySoClientTypes.Object, address: string): boolean {
		switch (obj.owner.$kind) {
			case 'AddressOwner':
				return obj.owner.AddressOwner === address;
			case 'ObjectOwner':
				return obj.owner.ObjectOwner === address;
			case 'ConsensusAddressOwner':
				return obj.owner.ConsensusAddressOwner.owner === address;
			case 'Shared':
			case 'Immutable':
			case 'Unknown':
			default:
				return false;
		}
	}

	async getObjects<Include extends MySoClientTypes.ObjectInclude = object>(
		options: MySoClientTypes.GetObjectsOptions<Include>,
	): Promise<MySoClientTypes.GetObjectsResponse<Include>> {
		const objects = options.objectIds.map((id): MySoClientTypes.Object<Include> | Error => {
			const normalizedId = normalizeMySoAddress(id);
			const obj = this.#objects.get(normalizedId);

			if (!obj) {
				return new Error(`Object not found: ${id}`);
			}

			return obj as MySoClientTypes.Object<Include>;
		});

		return { objects };
	}

	async listCoins(
		options: MySoClientTypes.ListCoinsOptions,
	): Promise<MySoClientTypes.ListCoinsResponse> {
		const coinObjects = Array.from(this.#objects.values()).filter((obj) => {
			const parsedType = parseStructTag(obj.type);
			const parsedCoinType = parseStructTag('0x2::coin::Coin');

			const isCoin =
				parsedType.address === parsedCoinType.address &&
				parsedType.module === parsedCoinType.module &&
				parsedType.name === parsedCoinType.name;

			if (!isCoin) return false;

			// Filter by owner using helper function
			const isOwnedByAddress = this.#isOwnedByAddress(obj, options.owner);
			if (!isOwnedByAddress) return false;

			// Filter by coin type
			const coinType = obj.type.match(/0x2::coin::Coin<(.+)>/)?.[1];
			return coinType === options.coinType;
		});

		const objects: MySoClientTypes.Coin[] = coinObjects.map((obj) => {
			// Parse balance from BCS content
			let balance = '0';
			try {
				const parsedCoin = CoinStruct.parse(obj.content);
				balance = parsedCoin.balance.value.toString();
			} catch {
				// Fallback to 0 if parsing fails
			}

			return {
				...(obj as any),
				balance,
			};
		});

		return {
			objects,
			hasNextPage: false,
			cursor: null,
		};
	}

	async listOwnedObjects<Include extends MySoClientTypes.ObjectInclude = object>(
		options: MySoClientTypes.ListOwnedObjectsOptions<Include>,
	): Promise<MySoClientTypes.ListOwnedObjectsResponse<Include>> {
		const ownedObjects = Array.from(this.#objects.values()).filter((obj) => {
			return this.#isOwnedByAddress(obj, options.owner);
		});

		return {
			objects: ownedObjects as MySoClientTypes.Object<Include>[],
			hasNextPage: false,
			cursor: null,
		};
	}

	async getBalance(
		options: MySoClientTypes.GetBalanceOptions,
	): Promise<MySoClientTypes.GetBalanceResponse> {
		const coins = await this.listCoins({
			owner: options.owner,
			coinType: options.coinType,
		});

		const totalBalance = coins.objects.reduce((sum: bigint, coin: MySoClientTypes.Coin) => {
			return sum + BigInt(coin.balance);
		}, 0n);

		return {
			balance: {
				coinType: options.coinType ?? `${MYSO_FRAMEWORK_ADDRESS}::myso::MYSO`,
				balance: totalBalance.toString(),
				coinBalance: totalBalance.toString(),
				addressBalance: '0',
			},
		};
	}

	async listBalances(
		options: MySoClientTypes.ListBalancesOptions,
	): Promise<MySoClientTypes.ListBalancesResponse> {
		const parsedCoinType = parseStructTag('0x2::coin::Coin');
		const allObjects = Array.from(this.#objects.values()).filter((obj) => {
			const parsedType = parseStructTag(obj.type);

			const isCoin =
				parsedType.address === parsedCoinType.address &&
				parsedType.module === parsedCoinType.module &&
				parsedType.name === parsedCoinType.name;
			const isOwnedByAddress = this.#isOwnedByAddress(obj, options.owner);
			return isCoin && isOwnedByAddress;
		});

		const balancesByType = new Map<string, bigint>();

		for (const obj of allObjects) {
			const coinType = obj.type.match(/0x2::coin::Coin<(.+)>/)?.[1];
			if (!coinType) continue;

			try {
				const parsedCoin = CoinStruct.parse(obj.content);
				const balance = BigInt(parsedCoin.balance.value);
				const current = balancesByType.get(coinType) || 0n;
				balancesByType.set(coinType, current + balance);
			} catch {
				// Skip if parsing fails
			}
		}

		const balances: MySoClientTypes.Balance[] = Array.from(balancesByType.entries()).map(
			([coinType, totalBalance]) => ({
				coinType,
				balance: totalBalance.toString(),
				coinBalance: totalBalance.toString(),
				addressBalance: '0',
			}),
		);

		return {
			balances,
			hasNextPage: false,
			cursor: null,
		};
	}

	async getCoinMetadata(
		_options: MySoClientTypes.GetCoinMetadataOptions,
	): Promise<MySoClientTypes.GetCoinMetadataResponse> {
		throw new Error('getCoinMetadata not implemented in MockMySoClient');
	}

	async getTransaction<Include extends MySoClientTypes.TransactionInclude = object>(
		_options: MySoClientTypes.GetTransactionOptions<Include>,
	): Promise<MySoClientTypes.TransactionResult<Include>> {
		throw new Error('getTransaction not implemented in MockMySoClient');
	}

	async executeTransaction<Include extends MySoClientTypes.TransactionInclude = object>(
		_options: MySoClientTypes.ExecuteTransactionOptions<Include>,
	): Promise<MySoClientTypes.TransactionResult<Include>> {
		throw new Error('executeTransaction not implemented in MockMySoClient');
	}

	async defaultNameServiceName(
		_options: MySoClientTypes.DefaultNameServiceNameOptions,
	): Promise<MySoClientTypes.DefaultNameServiceNameResponse> {
		throw new Error('defaultNameServiceName not implemented in MockMySoClient');
	}

	async simulateTransaction<Include extends MySoClientTypes.SimulateTransactionInclude = object>(
		_options: MySoClientTypes.SimulateTransactionOptions<Include>,
	): Promise<MySoClientTypes.SimulateTransactionResult<Include>> {
		if (this.#nextDryRunResult) {
			const result = this.#nextDryRunResult;
			this.#nextDryRunResult = null;
			return {
				$kind: 'Transaction',
				Transaction: (result as any).transaction,
				commandResults: undefined,
			} as any;
		}

		// Default dry run response - minimal valid structure
		return {
			$kind: 'Transaction',
			Transaction: {
				digest: 'mockTransactionDigest',
				signatures: [],
				epoch: '1',
				status: { success: true, error: null },
				effects: {
					bcs: new Uint8Array(),
					version: 1,
					transactionDigest: 'mockTransactionDigest',
					status: { success: true, error: null },
					gasUsed: {
						computationCost: '100000',
						storageCost: '100000',
						storageRebate: '0',
						nonRefundableStorageFee: '0',
					},
					gasObject: {
						objectId: normalizeMySoAddress('0xa5c01'),
						inputState: 'Exists',
						inputVersion: '100',
						inputDigest: '11111111111111111111111111111111',
						inputOwner: {
							$kind: 'AddressOwner',
							AddressOwner: '0x0000000000000000000000000000000000000000000000000000000000000123',
						},
						outputState: 'ObjectWrite',
						outputVersion: '101',
						outputDigest: '11111111111111111111111111111112',
						outputOwner: {
							$kind: 'AddressOwner',
							AddressOwner: '0x0000000000000000000000000000000000000000000000000000000000000123',
						},
						idOperation: 'None',
					},
					eventsDigest: null,
					dependencies: [],
					lamportVersion: '1',
					changedObjects: [],
					unchangedConsensusObjects: [],
					auxiliaryDataDigest: null,
				},
				objectTypes: undefined,
				transaction: undefined,
				balanceChanges: undefined,
				events: undefined,
			},
			commandResults: undefined,
		} as any;
	}

	async getReferenceGasPrice(
		_options?: MySoClientTypes.GetReferenceGasPriceOptions,
	): Promise<MySoClientTypes.GetReferenceGasPriceResponse> {
		return { referenceGasPrice: this.#gasPrice };
	}

	async getChainIdentifier(
		_options?: MySoClientTypes.GetChainIdentifierOptions,
	): Promise<MySoClientTypes.GetChainIdentifierResponse> {
		return {
			chainIdentifier: 'mock-chain-identifier',
		};
	}

	async getCurrentSystemState(
		_options?: MySoClientTypes.GetCurrentSystemStateOptions,
	): Promise<MySoClientTypes.GetCurrentSystemStateResponse> {
		throw new Error('getCurrentSystemState not implemented in MockMySoClient');
	}

	async listDynamicFields(
		_options: MySoClientTypes.ListDynamicFieldsOptions,
	): Promise<MySoClientTypes.ListDynamicFieldsResponse> {
		return {
			dynamicFields: [],
			hasNextPage: false,
			cursor: null,
		};
	}

	resolveTransactionPlugin(): TransactionPlugin {
		// For mock purposes, return a plugin that automatically sets up gas configuration and resolves objects
		return async (transactionData, _options, next) => {
			// Resolve UnresolvedObject inputs
			await this.#resolveObjectReferences(transactionData);

			// Set up gas configuration if not already set
			if (!transactionData.gasData.budget) {
				transactionData.gasData.budget = '10000000';
			}
			if (!transactionData.gasData.price) {
				transactionData.gasData.price = this.#gasPrice;
			}
			if (!transactionData.gasData.payment || transactionData.gasData.payment.length === 0) {
				// Use the first MYSO coin from default objects
				const mysoCoinType = normalizeStructTag('0x2::coin::Coin<0x2::myso::MYSO>');
				const firstMySoCoin = Array.from(this.#objects.values()).find(
					(obj) =>
						obj.type === mysoCoinType &&
						obj.owner.$kind === 'AddressOwner' &&
						obj.owner.AddressOwner === transactionData.sender,
				);

				if (firstMySoCoin) {
					transactionData.gasData.payment = [
						{
							objectId: firstMySoCoin.objectId,
							version: firstMySoCoin.version,
							digest: firstMySoCoin.digest,
						},
					];
					transactionData.gasData.owner = transactionData.sender;
				}
			}

			// Proceed to the next plugin
			await next();
		};
	}

	async #resolveObjectReferences(transactionData: {
		inputs: Array<{
			UnresolvedObject?: {
				objectId: string;
				version?: string | number | null;
				initialSharedVersion?: string | number | null;
				mutable?: boolean | null;
			};
			[key: string]: unknown;
		}>;
	}) {
		// Find all UnresolvedObject inputs that need resolution
		const objectsToResolve = transactionData.inputs.filter((input) => {
			return (
				input.UnresolvedObject &&
				!(input.UnresolvedObject.version || input.UnresolvedObject?.initialSharedVersion)
			);
		});

		if (objectsToResolve.length === 0) {
			return;
		}

		// Get unique object IDs
		const dedupedIds = [
			...new Set(
				objectsToResolve.map((input) => normalizeMySoAddress(input.UnresolvedObject!.objectId)),
			),
		] as string[];

		// Fetch objects using our multiGetObjects
		const resolved = await this.getObjects({ objectIds: dedupedIds });

		const objectsById = new Map(dedupedIds.map((id, index) => [id, resolved.objects[index]]));

		// Update each UnresolvedObject input
		for (const [index, input] of transactionData.inputs.entries()) {
			if (!input.UnresolvedObject) {
				continue;
			}

			const id = normalizeMySoAddress(input.UnresolvedObject.objectId);
			const resolvedObject = objectsById.get(id);

			if (!resolvedObject || resolvedObject instanceof Error) {
				throw new Error(`Failed to resolve object: ${id}`);
			}

			// Determine the type of reference based on owner
			if (resolvedObject.owner.$kind === 'Shared') {
				transactionData.inputs[index] = Inputs.SharedObjectRef({
					objectId: id,
					initialSharedVersion: resolvedObject.owner.Shared.initialSharedVersion,
					mutable: input.UnresolvedObject.mutable ?? true,
				});
			} else {
				// For owned objects, use ObjectRef
				transactionData.inputs[index] = Inputs.ObjectRef({
					objectId: id,
					digest: resolvedObject.digest,
					version: resolvedObject.version,
				});
			}
		}
	}

	async verifyZkLoginSignature(
		_options: MySoClientTypes.VerifyZkLoginSignatureOptions,
	): Promise<MySoClientTypes.ZkLoginVerifyResponse> {
		throw new Error('verifyZkLoginSignature not implemented in MockMySoClient');
	}

	async getMoveFunction(
		options: MySoClientTypes.GetMoveFunctionOptions,
	): Promise<MySoClientTypes.GetMoveFunctionResponse> {
		const normalizedPackageId = normalizeMySoAddress(options.packageId);
		const key = `${normalizedPackageId}::${options.moduleName}::${options.name}`;
		const fn = this.#moveFunctions.get(key);

		if (!fn) {
			throw new Error(`Move function not found: ${key}`);
		}

		return { function: fn };
	}
}
