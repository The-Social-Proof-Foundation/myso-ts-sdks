// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0
import { getJsonRpcFullnodeUrl, MySoJsonRpcClient } from '@socialproof/myso/jsonRpc';
import { renderHook, waitFor } from '@testing-library/react';

import { useMySoClientQuery } from '../../src/hooks/useMySoClientQuery.js';
import { createWalletProviderContextWrapper } from '../test-utils.js';

describe('useMySoClientQuery', () => {
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

		const { result } = renderHook(
			() =>
				useMySoClientQuery('queryTransactionBlocks', {
					filter: {
						FromAddress: '0x123',
					},
				}),
			{ wrapper },
		);

		expect(result.current.isLoading).toBe(true);
		expect(result.current.isError).toBe(false);
		expect(result.current.data).toBe(undefined);
		expect(queryTransactionBlocks).toHaveBeenCalledWith({
			filter: {
				FromAddress: '0x123',
			},
		});

		await waitFor(() => expect(result.current.isSuccess).toBe(true));

		expect(result.current.isLoading).toBe(false);
		expect(result.current.isError).toBe(false);
		expect(result.current.data).toEqual({
			data: [{ digest: '0x123' }],
			hasNextPage: true,
			nextCursor: 'page2',
		});
	});
});
