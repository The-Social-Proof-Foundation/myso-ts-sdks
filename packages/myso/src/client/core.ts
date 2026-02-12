// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import { TypeTagSerializer } from '../bcs/type-tag-serializer.js';
import type { TransactionPlugin } from '../transactions/index.js';
import { deriveDynamicFieldID } from '../utils/dynamic-fields.js';
import { normalizeStructTag, parseStructTag, MYSO_ADDRESS_LENGTH } from '../utils/myso-types.js';
import { BaseClient } from './client.js';
import type { ClientWithExtensions, MySoClientTypes } from './types.js';
import { MvrClient } from './mvr.js';
import { bcs } from '../bcs/index.js';

export type ClientWithCoreApi = ClientWithExtensions<{
	core: CoreClient;
}>;

export interface CoreClientOptions extends MySoClientTypes.MySoClientOptions {
	base: BaseClient;
	mvr?: MySoClientTypes.MvrOptions;
}

const DEFAULT_MVR_URLS: Record<string, string> = {
	mainnet: 'https://mainnet.mvr.mystenlabs.com',
	testnet: 'https://testnet.mvr.mystenlabs.com',
};

export abstract class CoreClient extends BaseClient implements MySoClientTypes.TransportMethods {
	core = this;
	mvr: MySoClientTypes.MvrMethods;

	constructor(options: CoreClientOptions) {
		super(options);

		this.mvr = new MvrClient({
			cache: this.cache.scope('core.mvr'),
			url: options.mvr?.url ?? DEFAULT_MVR_URLS[this.network],
			pageSize: options.mvr?.pageSize,
			overrides: options.mvr?.overrides,
		});
	}

	abstract getObjects<Include extends MySoClientTypes.ObjectInclude = object>(
		options: MySoClientTypes.GetObjectsOptions<Include>,
	): Promise<MySoClientTypes.GetObjectsResponse<Include>>;

	async getObject<Include extends MySoClientTypes.ObjectInclude = object>(
		options: MySoClientTypes.GetObjectOptions<Include>,
	): Promise<MySoClientTypes.GetObjectResponse<Include>> {
		const { objectId } = options;
		const {
			objects: [result],
		} = await this.getObjects({
			objectIds: [objectId],
			signal: options.signal,
			include: options.include,
		});
		if (result instanceof Error) {
			throw result;
		}
		return { object: result };
	}

	abstract listCoins(
		options: MySoClientTypes.ListCoinsOptions,
	): Promise<MySoClientTypes.ListCoinsResponse>;

	abstract listOwnedObjects<Include extends MySoClientTypes.ObjectInclude = object>(
		options: MySoClientTypes.ListOwnedObjectsOptions<Include>,
	): Promise<MySoClientTypes.ListOwnedObjectsResponse<Include>>;

	abstract getBalance(
		options: MySoClientTypes.GetBalanceOptions,
	): Promise<MySoClientTypes.GetBalanceResponse>;

	abstract listBalances(
		options: MySoClientTypes.ListBalancesOptions,
	): Promise<MySoClientTypes.ListBalancesResponse>;

	abstract getCoinMetadata(
		options: MySoClientTypes.GetCoinMetadataOptions,
	): Promise<MySoClientTypes.GetCoinMetadataResponse>;

	abstract getTransaction<Include extends MySoClientTypes.TransactionInclude = object>(
		options: MySoClientTypes.GetTransactionOptions<Include>,
	): Promise<MySoClientTypes.TransactionResult<Include>>;

	abstract executeTransaction<Include extends MySoClientTypes.TransactionInclude = object>(
		options: MySoClientTypes.ExecuteTransactionOptions<Include>,
	): Promise<MySoClientTypes.TransactionResult<Include>>;

	abstract simulateTransaction<Include extends MySoClientTypes.SimulateTransactionInclude = object>(
		options: MySoClientTypes.SimulateTransactionOptions<Include>,
	): Promise<MySoClientTypes.SimulateTransactionResult<Include>>;

	abstract getReferenceGasPrice(
		options?: MySoClientTypes.GetReferenceGasPriceOptions,
	): Promise<MySoClientTypes.GetReferenceGasPriceResponse>;

	abstract getCurrentSystemState(
		options?: MySoClientTypes.GetCurrentSystemStateOptions,
	): Promise<MySoClientTypes.GetCurrentSystemStateResponse>;

	abstract getChainIdentifier(
		options?: MySoClientTypes.GetChainIdentifierOptions,
	): Promise<MySoClientTypes.GetChainIdentifierResponse>;

	abstract listDynamicFields(
		options: MySoClientTypes.ListDynamicFieldsOptions,
	): Promise<MySoClientTypes.ListDynamicFieldsResponse>;

	abstract resolveTransactionPlugin(): TransactionPlugin;

	abstract verifyZkLoginSignature(
		options: MySoClientTypes.VerifyZkLoginSignatureOptions,
	): Promise<MySoClientTypes.ZkLoginVerifyResponse>;

	abstract getMoveFunction(
		options: MySoClientTypes.GetMoveFunctionOptions,
	): Promise<MySoClientTypes.GetMoveFunctionResponse>;

	abstract defaultNameServiceName(
		options: MySoClientTypes.DefaultNameServiceNameOptions,
	): Promise<MySoClientTypes.DefaultNameServiceNameResponse>;

	async getDynamicField(
		options: MySoClientTypes.GetDynamicFieldOptions,
	): Promise<MySoClientTypes.GetDynamicFieldResponse> {
		const normalizedNameType = TypeTagSerializer.parseFromStr(
			(
				await this.core.mvr.resolveType({
					type: options.name.type,
				})
			).type,
		);
		const fieldId = deriveDynamicFieldID(options.parentId, normalizedNameType, options.name.bcs);
		const {
			objects: [fieldObject],
		} = await this.getObjects({
			objectIds: [fieldId],
			signal: options.signal,
			include: {
				previousTransaction: true,
				content: true,
			},
		});

		if (fieldObject instanceof Error) {
			throw fieldObject;
		}

		const fieldType = parseStructTag(fieldObject.type);
		const content = await fieldObject.content;

		return {
			dynamicField: {
				fieldId: fieldObject.objectId,
				digest: fieldObject.digest,
				version: fieldObject.version,
				type: fieldObject.type,
				previousTransaction: fieldObject.previousTransaction,
				name: {
					type:
						typeof fieldType.typeParams[0] === 'string'
							? fieldType.typeParams[0]
							: normalizeStructTag(fieldType.typeParams[0]),
					bcs: options.name.bcs,
				},
				value: {
					type:
						typeof fieldType.typeParams[1] === 'string'
							? fieldType.typeParams[1]
							: normalizeStructTag(fieldType.typeParams[1]),
					bcs: content.slice(MYSO_ADDRESS_LENGTH + options.name.bcs.length),
				},
			},
		};
	}

	async getDynamicObjectField<Include extends MySoClientTypes.ObjectInclude = object>(
		options: MySoClientTypes.GetDynamicObjectFieldOptions<Include>,
	): Promise<MySoClientTypes.GetDynamicObjectFieldResponse<Include>> {
		const resolvedNameType = (
			await this.core.mvr.resolveType({
				type: options.name.type,
			})
		).type;
		const wrappedType = `0x2::dynamic_object_field::Wrapper<${resolvedNameType}>`;

		const { dynamicField } = await this.getDynamicField({
			parentId: options.parentId,
			name: {
				type: wrappedType,
				bcs: options.name.bcs,
			},
			signal: options.signal,
		});

		const { object } = await this.getObject({
			objectId: bcs.Address.parse(dynamicField.value.bcs),
			signal: options.signal,
			include: options.include,
		});

		return { object };
	}

	async waitForTransaction<Include extends MySoClientTypes.TransactionInclude = object>(
		options: MySoClientTypes.WaitForTransactionOptions<Include>,
	): Promise<MySoClientTypes.TransactionResult<Include>> {
		const { signal, timeout = 60 * 1000, include } = options;

		const digest =
			'result' in options && options.result
				? (options.result.Transaction ?? options.result.FailedTransaction)!.digest
				: options.digest;

		const abortSignal = signal
			? AbortSignal.any([AbortSignal.timeout(timeout), signal])
			: AbortSignal.timeout(timeout);

		const abortPromise = new Promise((_, reject) => {
			abortSignal.addEventListener('abort', () => reject(abortSignal.reason));
		});

		abortPromise.catch(() => {
			// Swallow unhandled rejections that might be thrown after early return
		});

		while (true) {
			abortSignal.throwIfAborted();
			try {
				return await this.getTransaction({
					digest,
					include,
					signal: abortSignal,
				});
			} catch {
				await Promise.race([new Promise((resolve) => setTimeout(resolve, 2_000)), abortPromise]);
			}
		}
	}

	async signAndExecuteTransaction<Include extends MySoClientTypes.TransactionInclude = {}>({
		transaction,
		signer,
		additionalSignatures = [],
		...input
	}: MySoClientTypes.SignAndExecuteTransactionOptions<Include>): Promise<
		MySoClientTypes.TransactionResult<Include>
	> {
		let transactionBytes;

		if (transaction instanceof Uint8Array) {
			transactionBytes = transaction;
		} else {
			transaction.setSenderIfNotSet(signer.toMySoAddress());
			transactionBytes = await transaction.build({ client: this });
		}

		const { signature } = await signer.signTransaction(transactionBytes);

		return this.executeTransaction({
			transaction: transactionBytes,
			signatures: [signature, ...additionalSignatures],
			...input,
		});
	}
}
