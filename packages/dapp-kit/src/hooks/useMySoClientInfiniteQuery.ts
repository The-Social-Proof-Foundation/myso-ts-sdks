// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import type { MySoJsonRpcClient } from '@socialproof/myso/jsonRpc';
import type {
	InfiniteData,
	UseInfiniteQueryOptions,
	UseInfiniteQueryResult,
} from '@tanstack/react-query';
import { useInfiniteQuery } from '@tanstack/react-query';

import type { PartialBy } from '../types/utilityTypes.js';
import { useMySoClientContext } from './useMySoClient.js';

interface PaginatedResult {
	data?: unknown;
	nextCursor?: unknown;
	hasNextPage: boolean;
}

export type MySoRpcPaginatedMethodName = {
	[K in keyof MySoJsonRpcClient]: MySoJsonRpcClient[K] extends (
		input: any,
	) => Promise<PaginatedResult>
		? K
		: never;
}[keyof MySoJsonRpcClient];

export type MySoRpcPaginatedMethods = {
	[K in MySoRpcPaginatedMethodName]: MySoJsonRpcClient[K] extends (
		input: infer Params,
	) => Promise<
		infer Result extends { hasNextPage?: boolean | null; nextCursor?: infer Cursor | null }
	>
		? {
				name: K;
				result: Result;
				params: Params;
				cursor: Cursor;
			}
		: never;
};

export type UseMySoClientInfiniteQueryOptions<
	T extends keyof MySoRpcPaginatedMethods,
	TData,
> = PartialBy<
	Omit<
		UseInfiniteQueryOptions<MySoRpcPaginatedMethods[T]['result'], Error, TData, unknown[]>,
		'queryFn' | 'initialPageParam' | 'getNextPageParam'
	>,
	'queryKey'
>;

export function useMySoClientInfiniteQuery<
	T extends keyof MySoRpcPaginatedMethods,
	TData = InfiniteData<MySoRpcPaginatedMethods[T]['result']>,
>(
	method: T,
	params: MySoRpcPaginatedMethods[T]['params'],
	{
		queryKey = [],
		enabled = !!params,
		...options
	}: UseMySoClientInfiniteQueryOptions<T, TData> = {},
): UseInfiniteQueryResult<TData, Error> {
	const mysoContext = useMySoClientContext();

	return useInfiniteQuery({
		...options,
		initialPageParam: null,
		queryKey: [mysoContext.network, method, params, ...queryKey],
		enabled,
		queryFn: ({ pageParam }) =>
			mysoContext.client[method]({
				// oxlint-disable-next-line no-useless-fallback-in-spread
				...(params ?? {}),
				cursor: pageParam,
			} as never),
		getNextPageParam: (lastPage) => (lastPage.hasNextPage ? (lastPage.nextCursor ?? null) : null),
	});
}
