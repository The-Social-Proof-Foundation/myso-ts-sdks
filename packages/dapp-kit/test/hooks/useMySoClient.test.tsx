// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0
import { getJsonRpcFullnodeUrl, MySoJsonRpcClient } from '@socialproof/myso/jsonRpc';
import { renderHook } from '@testing-library/react';

import { useMySoClient } from '../../src/index.js';
import { createMySoClientContextWrapper } from '../test-utils.js';

describe('useMySoClient', () => {
	test('throws without a MySoClientContext', () => {
		expect(() => renderHook(() => useMySoClient())).toThrowError(
			'Could not find MySoClientContext. Ensure that you have set up the MySoClientProvider',
		);
	});

	test('returns a MySoJsonRpcClient', () => {
		const mysoClient = new MySoJsonRpcClient({
			url: getJsonRpcFullnodeUrl('localnet'),
			network: 'localnet',
		});
		const wrapper = createMySoClientContextWrapper(mysoClient);
		const { result } = renderHook(() => useMySoClient(), { wrapper });

		expect(result.current).toBe(mysoClient);
	});
});
