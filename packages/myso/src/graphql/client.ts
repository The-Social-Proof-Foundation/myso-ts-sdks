// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import type { TypedDocumentNode } from '@graphql-typed-document-node/core';
import type { TadaDocumentNode } from 'gql.tada';
import type { DocumentNode } from 'graphql';
import { print } from 'graphql';
import { BaseClient } from '../client/index.js';
import type { MySoClientTypes } from '../client/index.js';
import { GraphQLCoreClient } from './core.js';
import type { TypedDocumentString } from './generated/queries.js';
import type { TransactionPlugin } from '../transactions/index.js';

export type GraphQLDocument<
	Result = Record<string, unknown>,
	Variables = Record<string, unknown>,
> =
	| string
	| DocumentNode
	| TypedDocumentString<Result, Variables>
	| TypedDocumentNode<Result, Variables>
	| TadaDocumentNode<Result, Variables>;

export type GraphQLQueryOptions<
	Result = Record<string, unknown>,
	Variables = Record<string, unknown>,
> = {
	query: GraphQLDocument<Result, Variables>;
	operationName?: string;
	extensions?: Record<string, unknown>;
	signal?: AbortSignal;
} & (Variables extends { [key: string]: never }
	? { variables?: Variables }
	: {
			variables: Variables;
		});

export type GraphQLQueryResult<Result = Record<string, unknown>> = {
	data?: Result;
	errors?: GraphQLResponseErrors;
	extensions?: Record<string, unknown>;
};

export type GraphQLResponseErrors = Array<{
	message: string;
	locations?: { line: number; column: number }[];
	path?: (string | number)[];
}>;

export interface MySoGraphQLClientOptions<Queries extends Record<string, GraphQLDocument>> {
	url: string;
	fetch?: typeof fetch;
	headers?: Record<string, string>;
	queries?: Queries;
	network: MySoClientTypes.Network;
	mvr?: MySoClientTypes.MvrOptions;
}

export class MySoGraphQLRequestError extends Error {}

const MYSO_CLIENT_BRAND = Symbol.for('@socialproof/MySoGraphQLClient') as never;

export function isMySoGraphQLClient(client: unknown): client is MySoGraphQLClient {
	return (
		typeof client === 'object' && client !== null && (client as any)[MYSO_CLIENT_BRAND] === true
	);
}

export class MySoGraphQLClient<Queries extends Record<string, GraphQLDocument> = {}>
	extends BaseClient
	implements MySoClientTypes.TransportMethods
{
	#url: string;
	#queries: Queries;
	#headers: Record<string, string>;
	#fetch: typeof fetch;
	core: GraphQLCoreClient;
	get mvr(): MySoClientTypes.MvrMethods {
		return this.core.mvr;
	}

	get [MYSO_CLIENT_BRAND]() {
		return true;
	}

	constructor({
		url,
		fetch: fetchFn = fetch,
		headers = {},
		queries = {} as Queries,
		network,
		mvr,
	}: MySoGraphQLClientOptions<Queries>) {
		super({
			network,
		});
		this.#url = url;
		this.#queries = queries;
		this.#headers = headers;
		this.#fetch = (...args) => fetchFn(...args);
		this.core = new GraphQLCoreClient({
			graphqlClient: this,
			mvr,
		});
	}

	async query<Result = Record<string, unknown>, Variables = Record<string, unknown>>(
		options: GraphQLQueryOptions<Result, Variables>,
	): Promise<GraphQLQueryResult<Result>> {
		const res = await this.#fetch(this.#url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				...this.#headers,
			},
			body: JSON.stringify({
				query:
					typeof options.query === 'string' || options.query instanceof String
						? String(options.query)
						: print(options.query),
				variables: options.variables,
				extensions: options.extensions,
				operationName: options.operationName,
			}),
			signal: options.signal,
		});

		if (!res.ok) {
			throw new MySoGraphQLRequestError(`GraphQL request failed: ${res.statusText} (${res.status})`);
		}

		return await res.json();
	}

	async execute<
		const Query extends Extract<keyof Queries, string>,
		Result = Queries[Query] extends GraphQLDocument<infer R, unknown> ? R : Record<string, unknown>,
		Variables = Queries[Query] extends GraphQLDocument<unknown, infer V>
			? V
			: Record<string, unknown>,
	>(
		query: Query,
		options: Omit<GraphQLQueryOptions<Result, Variables>, 'query'>,
	): Promise<GraphQLQueryResult<Result>> {
		return this.query({
			...(options as { variables: Record<string, unknown> }),
			query: this.#queries[query]!,
		}) as Promise<GraphQLQueryResult<Result>>;
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
