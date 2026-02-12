// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import type { UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

import { useMySoClientContext } from './useMySoClient.js';
import type { MySoRpcMethods } from './useMySoClientQuery.js';

export type UseMySoClientMutationOptions<T extends keyof MySoRpcMethods> = Omit<
	UseMutationOptions<MySoRpcMethods[T]['result'], Error, MySoRpcMethods[T]['params'], unknown[]>,
	'mutationFn'
>;

export function useMySoClientMutation<T extends keyof MySoRpcMethods>(
	method: T,
	options: UseMySoClientMutationOptions<T> = {},
): UseMutationResult<MySoRpcMethods[T]['result'], Error, MySoRpcMethods[T]['params'], unknown[]> {
	const mysoContext = useMySoClientContext();

	return useMutation({
		...options,
		mutationFn: async (params) => {
			return await mysoContext.client[method](params as never);
		},
	});
}
