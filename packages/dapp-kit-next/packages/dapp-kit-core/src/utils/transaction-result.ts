// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import {
	extractStatusFromEffectsBcs,
	parseTransactionBcs,
	parseTransactionEffectsBcs,
	type MySoClientTypes,
} from '@socialproof/myso/client';

export type TransactionResultWithEffects = MySoClientTypes.TransactionResult<{
	effects: true;
	transaction: true;
	bcs: true;
}>;

export function buildTransactionResult(
	digest: string,
	signature: string,
	transactionBytes: Uint8Array,
	effectsBytes: Uint8Array,
): TransactionResultWithEffects {
	const status = extractStatusFromEffectsBcs(effectsBytes);

	let effects: MySoClientTypes.TransactionEffects | null = null;
	try {
		effects = parseTransactionEffectsBcs(effectsBytes);
	} catch {
		console.warn(
			'Parsing transaction effects failed, you may need to update the SDK to pickup the latest bcs types',
		);
	}

	const txResult: MySoClientTypes.Transaction<{ effects: true; transaction: true; bcs: true }> = {
		digest,
		signatures: [signature],
		epoch: null,
		status,
		effects: effects as MySoClientTypes.TransactionEffects,
		transaction: parseTransactionBcs(transactionBytes),
		balanceChanges: undefined,
		events: undefined,
		objectTypes: undefined,
		bcs: transactionBytes,
	};

	return status.success
		? { $kind: 'Transaction', Transaction: txResult }
		: { $kind: 'FailedTransaction', FailedTransaction: txResult };
}
