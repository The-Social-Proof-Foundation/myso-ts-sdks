// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import { ristretto255 } from '@noble/curves/ed25519.js';

import { dst, newSessionId, PROTOCOL_VERIFIED_DEC } from './helpers.js';
import type { DdhTupleNizk } from './nizk.js';
import { assertNonZeroScalar, G, mul, randomScalar } from './ristretto255.js';
import type {
	Ciphertext,
	DiscreteLogTable,
	EncryptedAmount,
	PrivateKey,
	PublicKey,
} from './twisted_elgamal.js';
import type { ContraPackageConfig } from './types.js';

/**
 * Represents a per-(address, tokenType) token account on the client
 * side. Holds the owner's address, the token type, the deployment
 * package config, and the twisted ElGamal private key used for
 * on-chain encryption/decryption.
 *
 * The public key and scalar-field inverse are derived lazily and cached;
 * the private key is immutable after construction.
 *
 * If no `privateKey` is supplied at construction time, a fresh one is
 * generated automatically.
 */
export class TokenAccount {
	readonly address: string;
	readonly tokenType: string;
	readonly privateKey: PrivateKey;
	// Will be static per network in the future.
	readonly #packageConfig: ContraPackageConfig;
	#publicKey?: PublicKey;
	#cachedPrivateKeyInverse?: bigint;
	#sessionId?: Uint8Array;
	#dstCache = new Map<number, Uint8Array>();

	constructor(
		address: string,
		tokenType: string,
		packageConfig: ContraPackageConfig,
		privateKey?: PrivateKey,
	) {
		this.address = address;
		this.tokenType = tokenType;
		this.#packageConfig = packageConfig;
		if (privateKey !== undefined) assertNonZeroScalar(privateKey);
		this.privateKey = privateKey ?? randomScalar();
	}

	/** Derive the public key as `G * privateKey`, cached after the first access. */
	get publicKey(): PublicKey {
		this.#publicKey ??= mul(G, this.privateKey);
		return this.#publicKey;
	}

	#getPrivateKeyInverse(): bigint {
		this.#cachedPrivateKeyInverse ??= ristretto255.Point.Fn.inv(this.privateKey);
		return this.#cachedPrivateKeyInverse;
	}

	/**
	 * 21-byte Fiat-Shamir domain-separation tag (DST) for `protocolId` on this
	 * (address, tokenType) account: `TokenAccount<tokenType>.id.bytes[..20] ‖ protocolId`.
	 */
	dst(protocolId: number): Uint8Array {
		let cached = this.#dstCache.get(protocolId);
		if (cached !== undefined) return cached;
		this.#sessionId ??= newSessionId(this.#packageConfig, this.address, this.tokenType);
		cached = dst(this.#sessionId, protocolId);
		this.#dstCache.set(protocolId, cached);
		return cached;
	}

	/**
	 * Decrypt an `EncryptedAmount` using this account's private key,
	 * returning the underlying u64 plaintext as a `bigint`.
	 *
	 * Convenience wrapper over `EncryptedAmount.decrypt(privateKey, table)`.
	 */
	decryptAmount(encryptedAmount: EncryptedAmount, table: DiscreteLogTable): bigint {
		return encryptedAmount.decryptWithInverse(this.#getPrivateKeyInverse(), table);
	}

	/**
	 * Decrypt a single `Ciphertext` and produce a zero-knowledge proof
	 * that the returned `value` is its plaintext under this account's
	 * key pair.
	 *
	 * The verifier reconstructs the DST as
	 * `verifiedDecDst = dst(newSessionId(packageConfig, address, tokenType), PROTOCOL_VERIFIED_DEC)`
	 * and checks the proof with
	 * `ciphertext.verifyDecryption(verifiedDecDst, publicKey, value, proof)`.
	 */
	decryptWithProof(
		ciphertext: Ciphertext,
		table: DiscreteLogTable,
	): { value: bigint; proof: DdhTupleNizk } {
		const value = ciphertext.decryptWithInverse(this.#getPrivateKeyInverse(), table);
		const verifiedDecDst = this.dst(PROTOCOL_VERIFIED_DEC);
		const proof = ciphertext.proveDecryption(
			verifiedDecDst,
			this.privateKey,
			this.publicKey,
			value,
		);
		return { value, proof };
	}
}
