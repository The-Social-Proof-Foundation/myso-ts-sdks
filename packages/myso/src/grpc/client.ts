// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import type { GrpcWebOptions } from '@protobuf-ts/grpcweb-transport';
import { GrpcWebFetchTransport } from '@protobuf-ts/grpcweb-transport';
import { TransactionExecutionServiceClient } from './proto/myso/rpc/v2/transaction_execution_service.client.js';
import { LedgerServiceClient } from './proto/myso/rpc/v2/ledger_service.client.js';
import { MovePackageServiceClient } from './proto/myso/rpc/v2/move_package_service.client.js';
import { SignatureVerificationServiceClient } from './proto/myso/rpc/v2/signature_verification_service.client.js';
import type { RpcTransport } from '@protobuf-ts/runtime-rpc';
import { StateServiceClient } from './proto/myso/rpc/v2/state_service.client.js';
import { SubscriptionServiceClient } from './proto/myso/rpc/v2/subscription_service.client.js';
import { GrpcCoreClient } from './core.js';
import type { MySoClientTypes } from '../client/index.js';
import { BaseClient } from '../client/index.js';
import { NameServiceClient } from './proto/myso/rpc/v2/name_service.client.js';
import type { TransactionPlugin } from '../transactions/index.js';

interface MySoGrpcTransportOptions extends GrpcWebOptions {
	transport?: never;
}

export type MySoGrpcClientOptions = {
	network: MySoClientTypes.Network;
	mvr?: MySoClientTypes.MvrOptions;
} & (
	| {
			transport: RpcTransport;
	  }
	| MySoGrpcTransportOptions
);

const MYSO_CLIENT_BRAND = Symbol.for('@socialproof/MySoGrpcClient') as never;

export function isMySoGrpcClient(client: unknown): client is MySoGrpcClient {
	return (
		typeof client === 'object' && client !== null && (client as any)[MYSO_CLIENT_BRAND] === true
	);
}

export class MySoGrpcClient extends BaseClient implements MySoClientTypes.TransportMethods {
	core: GrpcCoreClient;
	get mvr(): MySoClientTypes.MvrMethods {
		return this.core.mvr;
	}
	transactionExecutionService: TransactionExecutionServiceClient;
	ledgerService: LedgerServiceClient;
	stateService: StateServiceClient;
	subscriptionService: SubscriptionServiceClient;
	movePackageService: MovePackageServiceClient;
	signatureVerificationService: SignatureVerificationServiceClient;
	nameService: NameServiceClient;

	get [MYSO_CLIENT_BRAND]() {
		return true;
	}

	constructor(options: MySoGrpcClientOptions) {
		super({ network: options.network });
		const transport =
			options.transport ??
			new GrpcWebFetchTransport({ baseUrl: options.baseUrl, fetchInit: options.fetchInit });
		this.transactionExecutionService = new TransactionExecutionServiceClient(transport);
		this.ledgerService = new LedgerServiceClient(transport);
		this.stateService = new StateServiceClient(transport);
		this.subscriptionService = new SubscriptionServiceClient(transport);
		this.movePackageService = new MovePackageServiceClient(transport);
		this.signatureVerificationService = new SignatureVerificationServiceClient(transport);
		this.nameService = new NameServiceClient(transport);

		this.core = new GrpcCoreClient({
			client: this,
			base: this,
			network: options.network,
			mvr: options.mvr,
		});
	}

	getObjects<Include extends MySoClientTypes.ObjectInclude = {}>(
		input: MySoClientTypes.GetObjectsOptions<Include>,
	): Promise<MySoClientTypes.GetObjectsResponse<Include>> {
		return this.core.getObjects(input);
	}

	getObject<Include extends MySoClientTypes.ObjectInclude = {}>(
		input: MySoClientTypes.GetObjectOptions<Include>,
	): Promise<MySoClientTypes.GetObjectResponse<Include>> {
		return this.core.getObject(input);
	}

	listCoins(input: MySoClientTypes.ListCoinsOptions): Promise<MySoClientTypes.ListCoinsResponse> {
		return this.core.listCoins(input);
	}

	listOwnedObjects<Include extends MySoClientTypes.ObjectInclude = {}>(
		input: MySoClientTypes.ListOwnedObjectsOptions<Include>,
	): Promise<MySoClientTypes.ListOwnedObjectsResponse<Include>> {
		return this.core.listOwnedObjects(input);
	}

	getBalance(input: MySoClientTypes.GetBalanceOptions): Promise<MySoClientTypes.GetBalanceResponse> {
		return this.core.getBalance(input);
	}

	listBalances(
		input: MySoClientTypes.ListBalancesOptions,
	): Promise<MySoClientTypes.ListBalancesResponse> {
		return this.core.listBalances(input);
	}

	getCoinMetadata(
		input: MySoClientTypes.GetCoinMetadataOptions,
	): Promise<MySoClientTypes.GetCoinMetadataResponse> {
		return this.core.getCoinMetadata(input);
	}

	getTransaction<Include extends MySoClientTypes.TransactionInclude = {}>(
		input: MySoClientTypes.GetTransactionOptions<Include>,
	): Promise<MySoClientTypes.TransactionResult<Include>> {
		return this.core.getTransaction(input);
	}

	executeTransaction<Include extends MySoClientTypes.TransactionInclude = {}>(
		input: MySoClientTypes.ExecuteTransactionOptions<Include>,
	): Promise<MySoClientTypes.TransactionResult<Include>> {
		return this.core.executeTransaction(input);
	}

	signAndExecuteTransaction<Include extends MySoClientTypes.TransactionInclude = {}>(
		input: MySoClientTypes.SignAndExecuteTransactionOptions<Include>,
	): Promise<MySoClientTypes.TransactionResult<Include>> {
		return this.core.signAndExecuteTransaction(input);
	}

	waitForTransaction<Include extends MySoClientTypes.TransactionInclude = {}>(
		input: MySoClientTypes.WaitForTransactionOptions<Include>,
	): Promise<MySoClientTypes.TransactionResult<Include>> {
		return this.core.waitForTransaction(input);
	}

	simulateTransaction<Include extends MySoClientTypes.SimulateTransactionInclude = {}>(
		input: MySoClientTypes.SimulateTransactionOptions<Include>,
	): Promise<MySoClientTypes.SimulateTransactionResult<Include>> {
		return this.core.simulateTransaction(input);
	}

	getReferenceGasPrice(): Promise<MySoClientTypes.GetReferenceGasPriceResponse> {
		return this.core.getReferenceGasPrice();
	}

	listDynamicFields(
		input: MySoClientTypes.ListDynamicFieldsOptions,
	): Promise<MySoClientTypes.ListDynamicFieldsResponse> {
		return this.core.listDynamicFields(input);
	}

	getDynamicField(
		input: MySoClientTypes.GetDynamicFieldOptions,
	): Promise<MySoClientTypes.GetDynamicFieldResponse> {
		return this.core.getDynamicField(input);
	}

	getMoveFunction(
		input: MySoClientTypes.GetMoveFunctionOptions,
	): Promise<MySoClientTypes.GetMoveFunctionResponse> {
		return this.core.getMoveFunction(input);
	}

	resolveTransactionPlugin(): TransactionPlugin {
		return this.core.resolveTransactionPlugin();
	}

	verifyZkLoginSignature(
		input: MySoClientTypes.VerifyZkLoginSignatureOptions,
	): Promise<MySoClientTypes.ZkLoginVerifyResponse> {
		return this.core.verifyZkLoginSignature(input);
	}

	defaultNameServiceName(
		input: MySoClientTypes.DefaultNameServiceNameOptions,
	): Promise<MySoClientTypes.DefaultNameServiceNameResponse> {
		return this.core.defaultNameServiceName(input);
	}
}
