// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import { ristretto255 } from '@noble/curves/ed25519.js';
import { beforeAll, describe, expect, it } from 'vitest';

import { getBulletproofs, type Bulletproofs } from '../../src/bp.js';
import { ContraInternalError } from '../../src/error.js';
import { randomScalar } from '../../src/ristretto255.js';

/** Matches `contra-crypto-fixtures` / `bulletproof_fixtures.move` single-amount DST. */
const SINGLE_AMOUNT_DST = new TextEncoder().encode('dst-match-21-byte-tag');

/** Golden proof bytes from `contra::bulletproof_fixtures::single_amount_range_proof`. */
const SINGLE_AMOUNT_RANGE_PROOF_HEX =
	'24f92784bb474533109a4fd31700af0b3e63d172cd4cb652bb161f0e977831234c7343d5593d868909668cbe4267ed09d34b846efdc0df5105e913e6033a450544dba303ea53d6feb0698757632a849d3f3118150288605447b7568a73ac8c0b0420a6fb46d5d4891b77edf3036548c2c52dd68943420acf172ac32d9244792d4da9737cbff3666615490ebc8cfcf4e3b55b7f6d6a14fee62637ff9b456b8f0fefb4dcdc93295cae39a8bfcdaac8cb5fcafda3d5d0ba5840d333b03c3d4f3405fcc6475c2e8cf386b53131debd24b4992769066c1935fa513b990480ef70af0c480112bbf744e72de72361cb343bc991e51c3190b9d55b0f469b0adf09863b5caa25fd19cc5dcf2441fd65c9ba629cd0ab7961227ed5c1809e11b92d7a79f03fe2e6607ffce250bcd1addc4c098c6c96be79e6f18338e85f8bbb834eaf2c552f468b6fd27a7b28a16a4401d852629f47cc51f495009423404cf7a599c0ea3563e27e5a0062f747d6a7494f0cbf0c62826c2b294725740deb67efb4f323ae0907269d0f97dae93d98ebb03009d50f4505f87cd0e0b040a1286778d53af87a90438e5b2d2fbb8850a2a7852f23333e99a88358e4d7912fb53df95d49cc052847182a6c162c73cda860e67a0ad422ba0e7ace3c6b95b722032fa0e111c26d3bdd3f343acca4768f943f1f13fe00c7943ed5330650302f322962ced53f984fd501534cf4544aafa77b5aa04e8b12eb6ed5b8cb23a3b70f3177eb839d4611087392149a71c0ae982b8d9c20a85654aeff3e14f0f7e831e0e38d4f1a454cf83e6f0c292cdbf46d55167ad7e68dedfdd042fe74b0e198834c2b20a5057f561800a93268463f9ad701dfa098e748fee677c46a454baa8bf83739be4b7dbb6d2b3a4c60046aab0bc75720722efaf6ee83e986fbb9889a6ba5dc0446c905fc87158d9dc103';

const SINGLE_AMOUNT_COMMITMENTS_HEX = [
	'c27449cbffaae8e009bf5c1de27c9a811a4b82baff6d2fe7f79c4e5a1e9bfb16',
	'0000000000000000000000000000000000000000000000000000000000000000',
	'0000000000000000000000000000000000000000000000000000000000000000',
	'0000000000000000000000000000000000000000000000000000000000000000',
];

function hexToBytes(hex: string): Uint8Array {
	const out = new Uint8Array(hex.length / 2);
	for (let i = 0; i < out.length; i++) {
		out[i] = Number.parseInt(hex.slice(i * 2, i * 2 + 2), 16);
	}
	return out;
}

let bp: Bulletproofs;

beforeAll(async () => {
	bp = await getBulletproofs();
});

describe('batchRangeProver', () => {
	it('produces one 32-byte commitment per input', () => {
		const values = [10n, 200n, 3000n, 40000n];
		const blindings = values.map(() => randomScalar());
		const { proof, commitments } = bp.batchRangeProver(values, blindings, 16, SINGLE_AMOUNT_DST);
		expect(proof).toBeInstanceOf(Uint8Array);
		expect(proof.length).toBeGreaterThan(0);
		expect(commitments).toHaveLength(values.length);
		for (const c of commitments) expect(c.toBytes().length).toBe(32);
	});

	it('rejects non-power-of-2 batch size', () => {
		const values = [1n, 2n, 3n];
		const blindings = values.map(() => randomScalar());
		expect(() => bp.batchRangeProver(values, blindings, 32, SINGLE_AMOUNT_DST)).toThrow(
			ContraInternalError,
		);
	});

	it('rejects mismatched values/blindings', () => {
		expect(() => bp.batchRangeProver([1n, 2n], [randomScalar()], 32, SINGLE_AMOUNT_DST)).toThrow(
			ContraInternalError,
		);
	});

	it('rejects dst longer than 64 bytes', () => {
		const dst = new Uint8Array(65);
		expect(() => bp.batchRangeProver([1n, 2n], [randomScalar(), randomScalar()], 16, dst)).toThrow(
			ContraInternalError,
		);
	});
});

describe('verifyBatchRangeProof', () => {
	it('accepts a valid proof', () => {
		const values = [1234n, 0n, 0n, 0n];
		const blindings = [7777n, 0n, 0n, 0n];
		const { proof, commitments } = bp.batchRangeProver(values, blindings, 16, SINGLE_AMOUNT_DST);
		expect(bp.verifyBatchRangeProof(proof, commitments, 16, SINGLE_AMOUNT_DST)).toBe(true);
	});

	it('rejects a tampered proof', () => {
		const values = [1n, 2n, 3n, 4n];
		const blindings = values.map(() => randomScalar());
		const { proof, commitments } = bp.batchRangeProver(values, blindings, 16, SINGLE_AMOUNT_DST);
		const tampered = new Uint8Array(proof);
		tampered[0] ^= 1;
		expect(bp.verifyBatchRangeProof(tampered, commitments, 16, SINGLE_AMOUNT_DST)).toBe(false);
	});

	it('rejects wrong bit size', () => {
		const values = [1n, 2n, 3n, 4n];
		const blindings = values.map(() => randomScalar());
		const { proof, commitments } = bp.batchRangeProver(values, blindings, 16, SINGLE_AMOUNT_DST);
		expect(bp.verifyBatchRangeProof(proof, commitments, 32, SINGLE_AMOUNT_DST)).toBe(false);
	});

	it('rejects mismatched commitments', () => {
		const values = [1n, 2n, 3n, 4n];
		const blindings = values.map(() => randomScalar());
		const { proof } = bp.batchRangeProver(values, blindings, 16, SINGLE_AMOUNT_DST);
		const wrongBlindings = values.map(() => randomScalar());
		const { commitments: wrongCommitments } = bp.batchRangeProver(
			values,
			wrongBlindings,
			16,
			SINGLE_AMOUNT_DST,
		);
		expect(bp.verifyBatchRangeProof(proof, wrongCommitments, 16, SINGLE_AMOUNT_DST)).toBe(false);
	});

	it('rejects wrong dst', () => {
		const values = [1n, 2n, 3n, 4n];
		const blindings = values.map(() => randomScalar());
		const { proof, commitments } = bp.batchRangeProver(values, blindings, 16, SINGLE_AMOUNT_DST);
		const wrongDst = new TextEncoder().encode('wrong-dst-21-byte-tag!!');
		expect(bp.verifyBatchRangeProof(proof, commitments, 16, wrongDst)).toBe(false);
	});
});

describe('contra-crypto-fixtures golden vector', () => {
	it('verifies fixture proof bytes with fixture commitments and DST', () => {
		const proof = hexToBytes(SINGLE_AMOUNT_RANGE_PROOF_HEX);
		const commitments = SINGLE_AMOUNT_COMMITMENTS_HEX.map((hex) =>
			ristretto255.Point.fromBytes(hexToBytes(hex)),
		);
		expect(bp.verifyBatchRangeProof(proof, commitments, 16, SINGLE_AMOUNT_DST)).toBe(true);
	});
});
