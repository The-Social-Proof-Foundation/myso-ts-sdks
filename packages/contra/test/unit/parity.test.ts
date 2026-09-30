// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import { ristretto255 } from '@noble/curves/ed25519.js';
import { describe, expect, it } from 'vitest';

import { getBulletproofs } from '../../src/bp.js';

/** Shared with `myso-contra-crypto` / Move `bulletproof_fixtures.move`. */
const SINGLE_AMOUNT_DST = new TextEncoder().encode('dst-match-21-byte-tag');
const SINGLE_AMOUNT_RANGE_PROOF_HEX =
	'52e2d470e195d5776becd03f8f819615d5c6bf7925ea887ea159a86fe2d2f04c4e723768b3383d8435ff419837a625580a1192dd49712620e983acb1bb067445ec485e10249c0368e34e479d42e03476a232dce118b93b7a0bd5434fbbd408248a78bc88dbe99745a4f5a205803ea0cce91cda13d7b8c6712d964e9010a1aa24733f31968f122a019c0984b802011e01c152830493600267ecaa55393b83840efee02e588c146e750b1d047469aff7afd442f526d826786d606279cd4f82e801499bc903d7c70cbd6dcf17d9b48044519814ac038a3209ad9d718bea03045d03424704fe546603f9f515083106120ea8a42543d2dd21c0f341fe55ba5ffda6332e36dd303583ba4397d6f38b98466b6a1a9b52c48ded8650ebe5096c6ec0d034667c8da5eca9597cbc019dcda1dd870464bd680894e8cf6c0a7ed8ba74400146de93af03763172161a009626cae952f5e26999b3e7356aa55ff8ba00ca4c4f1350ae9b07b36d816531455fa6ba6e1fa1a09e6b17f423c30c88d575f9348e8f24844d6feb1ba943d89f732103322a67571a4f09915ee2014339a4ac99adaccd797417968f92a355ec2ca6f7065b4bf23f10557d39b37b06a00356b5c700e85a70a8687040ae6eccce91cf9e2332dde6986f9465c02ff0286bc76f088145db936ca477c56449ca886344932f28205542685c7ae9f78bea3b4e2c2b2221be3f427d4acf2211e6267ad6ffc3e29255a9f2299cf2471403534fe3b40d8b2c044d187c04af09427f9c7300a5868e866250330e025127c3cef7ccb55302984cc3214112e6ad8ea4dfccc554c709508b83d470d1939b282d5469bd76842109960baab47ad24209e6788ae6dc9ee56c61d0c50e2c6d68379ffd4a071bb27fc6f45fc2cf034d3d061d8d03def5de5b8cae521ae1711d1d44edcd1ed8d789107372948d2b00';

function hexToBytes(hex: string): Uint8Array {
	const out = new Uint8Array(hex.length / 2);
	for (let i = 0; i < out.length; i++) {
		out[i] = Number.parseInt(hex.slice(i * 2, i * 2 + 2), 16);
	}
	return out;
}

describe('cross-SDK parity with myso-contra-crypto', () => {
	it('verifies Rust golden proof bytes under the shared DST', async () => {
		const bp = await getBulletproofs();
		const proof = hexToBytes(SINGLE_AMOUNT_RANGE_PROOF_HEX);
		const commitments = [
			'88c6828adeb58509ea733a9d24143050c081ab3aa5925b1a05aa110cf4555759',
			'0000000000000000000000000000000000000000000000000000000000000000',
			'0000000000000000000000000000000000000000000000000000000000000000',
			'0000000000000000000000000000000000000000000000000000000000000000',
		].map((hex) => ristretto255.Point.fromBytes(hexToBytes(hex)));
		expect(bp.verifyBatchRangeProof(proof, commitments, 16, SINGLE_AMOUNT_DST)).toBe(true);
	});
});
