// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import { openTransportReplayer, RecordStore } from '@ledgerhq/hw-transport-mocker';
import { expect, test } from 'vitest';

import MySo from '../src/MySo.js';

test('MySo init', async () => {
	const transport = await openTransportReplayer(RecordStore.fromString(''));
	const pkt = new MySo(transport);
	expect(pkt).not.toBe(undefined);
});
