// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import { expect, it } from 'vitest';

import { setup } from '../../utils/setup.js';

it('can fetch protocol config', async () => {
	const toolbox = await setup();
	const config = await toolbox.jsonRpcClient.getProtocolConfig();
	expect(config).toBeTypeOf('object');
});
