// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import { beforeEach, describe, expect, it, vi } from 'vitest';

import { getBulletproofs } from '../../src/bp.js';
import { ContraClient } from '../../src/client.js';
import { DiscreteLogTable } from '../../src/twisted_elgamal.js';
import type { ContraCompatibleClient } from '../../src/types.js';

vi.mock('../../src/bp.js', () => ({
	getBulletproofs: vi.fn(async () => ({
		batchRangeProver: vi.fn(),
		verifyBatchRangeProof: vi.fn(),
	})),
}));

const ZERO_ADDR = '0x0000000000000000000000000000000000000000000000000000000000000000';
const DUMMY_CONFIG = {
	packageId: ZERO_ADDR,
	accountRegistryId: ZERO_ADDR,
	tokenRegistryId: ZERO_ADDR,
};

describe('ContraClient.warmUpProofs', () => {
	beforeEach(() => {
		vi.mocked(getBulletproofs).mockClear();
	});

	it('initializes bulletproofs once and caches the result', async () => {
		const client = new ContraClient({
			suiClient: { core: {} } as ContraCompatibleClient,
			packageConfig: DUMMY_CONFIG,
			table: DiscreteLogTable.create(8),
		});

		await client.warmUpProofs();
		await client.warmUpProofs();

		expect(getBulletproofs).toHaveBeenCalledTimes(1);
	});
});
