// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import type { UseQueryResult } from '@tanstack/react-query';
import { useQueries } from '@tanstack/react-query';

import { useMySoClientContext } from './useMySoClient.js';
import type { MySoRpcMethods, UseMySoClientQueryOptions } from './useMySoClientQuery.js';

type MySoClientQueryOptions = MySoRpcMethods[keyof MySoRpcMethods] extends infer Method
	? Method extends {
			name: infer M extends keyof MySoRpcMethods;
			params?: infer P;
		}
		? undefined extends P
			? {
					method: M;
					params?: P;
					options?: UseMySoClientQueryOptions<M, unknown>;
				}
			: {
					method: M;
					params: P;
					options?: UseMySoClientQueryOptions<M, unknown>;
				}
		: never
	: never;

export type UseMySoClientQueriesResults<Args extends readonly MySoClientQueryOptions[]> = {
	-readonly [K in keyof Args]: Args[K] extends {
		method: infer M extends keyof MySoRpcMethods;
		readonly options?:
			| {
					select?: (...args: any[]) => infer R;
			  }
			| object;
	}
		? UseQueryResult<unknown extends R ? MySoRpcMethods[M]['result'] : R>
		: never;
};

export function useMySoClientQueries<
	const Queries extends readonly MySoClientQueryOptions[],
	Results = UseMySoClientQueriesResults<Queries>,
>({
	queries,
	combine,
}: {
	queries: Queries;
	combine?: (results: UseMySoClientQueriesResults<Queries>) => Results;
}): Results {
	const mysoContext = useMySoClientContext();

	return useQueries({
		combine: combine as never,
		queries: queries.map((query) => {
			const { method, params, options: { queryKey = [], ...restOptions } = {} } = query;

			return {
				...restOptions,
				queryKey: [mysoContext.network, method, params, ...queryKey],
				queryFn: async () => {
					return await mysoContext.client[method](params as never);
				},
			};
		}) as [],
	});
}
