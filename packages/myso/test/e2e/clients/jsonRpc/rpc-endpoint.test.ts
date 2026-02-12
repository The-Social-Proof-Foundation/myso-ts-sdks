// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import { beforeAll, describe, expect, it } from 'vitest';

import { MySoGasData } from '../../../../src/jsonRpc/index.js';
import { setup, TestToolbox } from '../../utils/setup.js';

describe('Invoke any RPC endpoint', () => {
	let toolbox: TestToolbox;

	beforeAll(async () => {
		toolbox = await setup();
	});

	it('mysox_getOwnedObjects', async () => {
		const gasObjectsExpected = await toolbox.jsonRpcClient.getOwnedObjects({
			owner: toolbox.address(),
		});
		const gasObjects = await toolbox.jsonRpcClient.call<{ data: MySoGasData }>(
			'mysox_getOwnedObjects',
			[toolbox.address()],
		);
		expect(gasObjects.data).toStrictEqual(gasObjectsExpected.data);
	});

	it('myso_getObjectOwnedByAddress Error', async () => {
		await expect(toolbox.jsonRpcClient.call('mysox_getOwnedObjects', [])).rejects.toThrowError();
	});

	it('mysox_getCommitteeInfo', async () => {
		const committeeInfoExpected = await toolbox.jsonRpcClient.getCommitteeInfo();

		const committeeInfo = await toolbox.jsonRpcClient.call('mysox_getCommitteeInfo', []);

		expect(committeeInfo).toStrictEqual(committeeInfoExpected);
	});
});
