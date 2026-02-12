// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import type { MySoJsonRpcClient } from '@socialproof/myso/jsonRpc';
import type {
	UndefinedInitialDataOptions,
	UseQueryOptions,
	UseQueryResult,
} from '@tanstack/react-query';
import { queryOptions, useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import type { PartialBy } from '../types/utilityTypes.js';
import { useMySoClientContext } from './useMySoClient.js';

export type MySoRpcMethodName = {
	[K in keyof MySoJsonRpcClient]: MySoJsonRpcClient[K] extends
		| ((input: any) => Promise<any>)
		| (() => Promise<any>)
		? K
		: never;
}[keyof MySoJsonRpcClient];

export type MySoRpcMethods = {
	[K in MySoRpcMethodName]: MySoJsonRpcClient[K] extends (input: infer P) => Promise<infer R>
		? {
				name: K;
				result: R;
				params: P;
			}
		: MySoJsonRpcClient[K] extends () => Promise<infer R>
			? {
					name: K;
					result: R;
					params: undefined | object;
				}
			: never;
};

export type UseMySoClientQueryOptions<T extends keyof MySoRpcMethods, TData> = PartialBy<
	Omit<UseQueryOptions<MySoRpcMethods[T]['result'], Error, TData, unknown[]>, 'queryFn'>,
	'queryKey'
>;

export type GetMySoClientQueryOptions<T extends keyof MySoRpcMethods> = {
	client: MySoJsonRpcClient;
	network: string;
	method: T;
	options?: PartialBy<
		Omit<UndefinedInitialDataOptions<MySoRpcMethods[T]['result']>, 'queryFn'>,
		'queryKey'
	>;
} & (undefined extends MySoRpcMethods[T]['params']
	? { params?: MySoRpcMethods[T]['params'] }
	: { params: MySoRpcMethods[T]['params'] });

export function getMySoClientQuery<T extends keyof MySoRpcMethods>({
	client,
	network,
	method,
	params,
	options,
}: GetMySoClientQueryOptions<T>) {
	return queryOptions<MySoRpcMethods[T]['result']>({
		...options,
		queryKey: [network, method, params],
		queryFn: async () => {
			return await client[method](params as never);
		},
	});
}

export function useMySoClientQuery<
	T extends keyof MySoRpcMethods,
	TData = MySoRpcMethods[T]['result'],
>(
	...args: undefined extends MySoRpcMethods[T]['params']
		? [method: T, params?: MySoRpcMethods[T]['params'], options?: UseMySoClientQueryOptions<T, TData>]
		: [method: T, params: MySoRpcMethods[T]['params'], options?: UseMySoClientQueryOptions<T, TData>]
): UseQueryResult<TData, Error> {
	const [method, params, { queryKey = [], ...options } = {}] = args as [
		method: T,
		params?: MySoRpcMethods[T]['params'],
		options?: UseMySoClientQueryOptions<T, TData>,
	];

	const mysoContext = useMySoClientContext();

	return useQuery({
		...options,
		queryKey: [mysoContext.network, method, params, ...queryKey],
		queryFn: async () => {
			return await mysoContext.client[method](params as never);
		},
	});
}

export function useMySoClientSuspenseQuery<
	T extends keyof MySoRpcMethods,
	TData = MySoRpcMethods[T]['result'],
>(
	...args: undefined extends MySoRpcMethods[T]['params']
		? [method: T, params?: MySoRpcMethods[T]['params'], options?: UndefinedInitialDataOptions<TData>]
		: [method: T, params: MySoRpcMethods[T]['params'], options?: UndefinedInitialDataOptions<TData>]
) {
	const [method, params, options = {}] = args as [
		method: T,
		params?: MySoRpcMethods[T]['params'],
		options?: UndefinedInitialDataOptions<TData>,
	];

	const mysoContext = useMySoClientContext();

	const query = useMemo(() => {
		return getMySoClientQuery<T>({
			client: mysoContext.client,
			network: mysoContext.network,
			method,
			params,
			options,
		});
	}, [mysoContext.client, mysoContext.network, method, params, options]);

	return useSuspenseQuery(query);
}
