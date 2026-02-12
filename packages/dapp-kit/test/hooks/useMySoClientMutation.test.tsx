// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0
import { getJsonRpcFullnodeUrl, MySoJsonRpcClient } from '@socialproof/myso/jsonRpc';
import { act, renderHook, waitFor } from '@testing-library/react';

import { useMySoClientMutation } from '../../src/hooks/useMySoClientMutation.js';
import { createWalletProviderContextWrapper } from '../test-utils.js';

describe('useMySoClientMutation', () => {
	it('should fetch data', async () => {
		const mysoClient = new MySoJsonRpcClient({
			url: getJsonRpcFullnodeUrl('mainnet'),
			network: 'mainnet',
		});
		const wrapper = createWalletProviderContextWrapper({}, mysoClient);

		const queryTransactionBlocks = vi.spyOn(mysoClient, 'queryTransactionBlocks');

		queryTransactionBlocks.mockResolvedValueOnce({
			data: [{ digest: '0x123' }],
			hasNextPage: true,
			nextCursor: 'page2',
		});

		const { result } = renderHook(() => useMySoClientMutation('queryTransactionBlocks'), {
			wrapper,
		});

		act(() => {
			result.current.mutate({
				filter: {
					FromAddress: '0x123',
				},
			});
		});

		await waitFor(() => expect(result.current.status).toBe('success'));

		expect(queryTransactionBlocks).toHaveBeenCalledWith({
			filter: {
				FromAddress: '0x123',
			},
		});
		expect(result.current.isPending).toBe(false);
		expect(result.current.isError).toBe(false);
		expect(result.current.data).toEqual({
			data: [{ digest: '0x123' }],
			hasNextPage: true,
			nextCursor: 'page2',
		});
	});
});
