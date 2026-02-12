// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import { toBase64 } from '@socialproof/bcs';
import type { SerializedBcs } from '@socialproof/bcs';

import { normalizeMySoAddress } from '../utils/myso-types.js';
import type {
	CallArg,
	ObjectRef,
	Reservation,
	WithdrawalTypeArg,
	WithdrawFrom,
} from './data/internal.js';

function Pure(data: Uint8Array | SerializedBcs<any>): Extract<CallArg, { Pure: unknown }> {
	return {
		$kind: 'Pure',
		Pure: {
			bytes: data instanceof Uint8Array ? toBase64(data) : data.toBase64(),
		},
	};
}

export const Inputs = {
	Pure,
	ObjectRef({ objectId, digest, version }: ObjectRef): Extract<CallArg, { Object: unknown }> {
		return {
			$kind: 'Object',
			Object: {
				$kind: 'ImmOrOwnedObject',
				ImmOrOwnedObject: {
					digest,
					version,
					objectId: normalizeMySoAddress(objectId),
				},
			},
		};
	},
	SharedObjectRef({
		objectId,
		mutable,
		initialSharedVersion,
	}: {
		objectId: string;
		mutable: boolean;
		initialSharedVersion: number | string;
	}): Extract<CallArg, { Object: unknown }> {
		return {
			$kind: 'Object',
			Object: {
				$kind: 'SharedObject',
				SharedObject: {
					mutable,
					initialSharedVersion,
					objectId: normalizeMySoAddress(objectId),
				},
			},
		};
	},
	ReceivingRef({ objectId, digest, version }: ObjectRef): Extract<CallArg, { Object: unknown }> {
		return {
			$kind: 'Object',
			Object: {
				$kind: 'Receiving',
				Receiving: {
					digest,
					version,
					objectId: normalizeMySoAddress(objectId),
				},
			},
		};
	},
	FundsWithdrawal({
		reservation,
		typeArg,
		withdrawFrom,
	}: {
		reservation: Reservation;
		typeArg: WithdrawalTypeArg;
		withdrawFrom: WithdrawFrom;
	}): Extract<CallArg, { FundsWithdrawal: unknown }> {
		return {
			$kind: 'FundsWithdrawal',
			FundsWithdrawal: {
				reservation,
				typeArg,
				withdrawFrom,
			},
		};
	},
};
