// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import type MySoLedgerClient from '@socialproof/ledgerjs-hw-app-myso';
import type { ClientWithCoreApi } from '@socialproof/myso/client';
import type { SignatureWithBytes } from '@socialproof/myso/cryptography';
import { messageWithIntent, Signer, toSerializedSignature } from '@socialproof/myso/cryptography';
import { Ed25519PublicKey } from '@socialproof/myso/keypairs/ed25519';
import { Transaction } from '@socialproof/myso/transactions';
import { toBase64 } from '@socialproof/myso/utils';

import { bcs } from '@socialproof/myso/bcs';
import { getInputObjects } from './objects.js';
import type { Resolution } from '@socialproof/ledgerjs-hw-app-myso';

export { getInputObjects } from './objects.js';

/**
 * Configuration options for initializing the LedgerSigner.
 */
export interface LedgerSignerOptions {
	publicKey: Ed25519PublicKey;
	derivationPath: string;
	ledgerClient: MySoLedgerClient;
	mysoClient: ClientWithCoreApi;
}

/**
 * Ledger integrates with the MySo blockchain to provide signing capabilities using Ledger devices.
 */
export class LedgerSigner extends Signer {
	#derivationPath: string;
	#publicKey: Ed25519PublicKey;
	#ledgerClient: MySoLedgerClient;
	#mysoClient: ClientWithCoreApi;

	/**
	 * Creates an instance of LedgerSigner. It's expected to call the static `fromDerivationPath` method to create an instance.
	 * @example
	 * ```
	 * const signer = await LedgerSigner.fromDerivationPath(derivationPath, options);
	 * ```
	 */
	constructor({ publicKey, derivationPath, ledgerClient, mysoClient }: LedgerSignerOptions) {
		super();
		this.#publicKey = publicKey;
		this.#derivationPath = derivationPath;
		this.#ledgerClient = ledgerClient;
		this.#mysoClient = mysoClient;
	}

	/**
	 * Retrieves the key scheme used by this signer.
	 */
	override getKeyScheme() {
		return 'ED25519' as const;
	}

	/**
	 * Retrieves the public key associated with this signer.
	 * @returns The Ed25519PublicKey instance.
	 */
	override getPublicKey() {
		return this.#publicKey;
	}

	/**
	 * Signs the provided transaction bytes.
	 * @returns The signed transaction bytes and signature.
	 */
	override async signTransaction(
		bytes: Uint8Array,
		bcsObjects?: Uint8Array[],
		resolution?: Resolution,
	): Promise<SignatureWithBytes> {
		const transactionOptions = bcsObjects
			? { bcsObjects }
			: await getInputObjects(Transaction.from(bytes), this.#mysoClient).catch(() => ({
					// Fail gracefully so network errors or serialization issues don't break transaction signing:
					bcsObjects: [],
				}));

		const intentMessage = messageWithIntent('TransactionData', bytes);
		const { signature } = await this.#ledgerClient.signTransaction(
			this.#derivationPath,
			intentMessage,
			transactionOptions,
			resolution,
		);

		return {
			bytes: toBase64(bytes),
			signature: toSerializedSignature({
				signature,
				signatureScheme: this.getKeyScheme(),
				publicKey: this.#publicKey,
			}),
		};
	}

	/**
	 * Signs the provided personal message.
	 * @returns The signed message bytes and signature.
	 */
	override async signPersonalMessage(bytes: Uint8Array): Promise<SignatureWithBytes> {
		const intentMessage = messageWithIntent(
			'PersonalMessage',
			bcs.byteVector().serialize(bytes).toBytes(),
		);
		const { signature } = await this.#ledgerClient.signTransaction(
			this.#derivationPath,
			intentMessage,
		);

		return {
			bytes: toBase64(bytes),
			signature: toSerializedSignature({
				signature,
				signatureScheme: this.getKeyScheme(),
				publicKey: this.#publicKey,
			}),
		};
	}

	/**
	 * Prepares the signer by fetching and setting the public key from a Ledger device.
	 * It is recommended to initialize an `LedgerSigner` instance using this function.
	 * @returns A promise that resolves once a `LedgerSigner` instance is prepared (public key is set).
	 */
	static async fromDerivationPath(
		derivationPath: string,
		ledgerClient: MySoLedgerClient,
		mysoClient: ClientWithCoreApi,
	) {
		const { publicKey } = await ledgerClient.getPublicKey(derivationPath);
		if (!publicKey) {
			throw new Error('Failed to get public key from Ledger.');
		}

		return new LedgerSigner({
			derivationPath,
			publicKey: new Ed25519PublicKey(publicKey),
			ledgerClient,
			mysoClient,
		});
	}

	/**
	 * Generic signing is not supported by Ledger.
	 * @throws Always throws an error indicating generic signing is unsupported.
	 */
	override sign(): never {
		throw new Error('Ledger Signer does not support generic signing.');
	}

	/**
	 * Generic signing is not supported by Ledger.
	 * @throws Always throws an error indicating generic signing is unsupported.
	 */
	override signWithIntent(): never {
		throw new Error('Ledger Signer does not support generic signing.');
	}
}
