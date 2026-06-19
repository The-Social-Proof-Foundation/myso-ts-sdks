// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import { describe, expect, it } from 'vitest';

import { ContraAuditor } from '../../src/auditor.js';
import { scalarToLimbs } from '../../src/nizk.js';
import { randomScalar } from '../../src/ristretto255.js';
import {
	DiscreteLogTable,
	generateKeyPair,
	MultiRecipientEncryption,
} from '../../src/twisted_elgamal.js';
import type { ContraCompatibleClient } from '../../src/types.js';

const ZERO_ADDR = '0x0000000000000000000000000000000000000000000000000000000000000000';
const DUMMY_CONFIG = {
	packageId: ZERO_ADDR,
	accountRegistryId: ZERO_ADDR,
	tokenRegistryId: ZERO_ADDR,
};

describe('ContraAuditor.recoverPrivateKey', () => {
	const table = DiscreteLogTable.create(16);

	it('recovers a private key from eight encrypted u32 limbs', () => {
		const userSk = randomScalar();
		const [auditorPk, auditorSk] = generateKeyPair();
		const limbs = scalarToLimbs(userSk);
		const ciphertext = limbs.map((limb) => {
			const blinding = randomScalar();
			return MultiRecipientEncryption.encrypt([auditorPk], limb, blinding);
		});

		const auditor = new ContraAuditor({
			suiClient: { core: {} } as ContraCompatibleClient,
			packageConfig: DUMMY_CONFIG,
			tokenType: `${ZERO_ADDR}::test::T`,
			table,
			auditorKeyForVersion: new Map([[1, { index: 0, privateKey: auditorSk }]]),
		});

		expect(auditor.recoverPrivateKey({ ciphertext, version: 1 })).toEqual(userSk);
	});
});
