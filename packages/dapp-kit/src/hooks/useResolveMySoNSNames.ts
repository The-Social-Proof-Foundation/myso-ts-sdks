// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import type { ResolvedNameServiceNames } from '@socialproof/myso/jsonRpc';
import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';

import { useMySoClientQuery } from './useMySoClientQuery.js';

export function useResolveMySoNSName(
	address?: string | null,
	options?: Omit<
		UseQueryOptions<ResolvedNameServiceNames, Error, string | null, unknown[]>,
		'queryFn' | 'queryKey' | 'select'
	>,
): UseQueryResult<string | null, Error> {
	return useMySoClientQuery(
		'resolveNameServiceNames',
		{
			address: address!,
			limit: 1,
		},
		{
			...options,
			refetchOnWindowFocus: false,
			retry: false,
			select: (data) => (data.data.length > 0 ? data.data[0] : null),
			enabled: !!address && options?.enabled !== false,
		},
	);
}
