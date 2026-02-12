// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import { bcs } from '../bcs/index.js';

export type IntentScope = Exclude<keyof typeof bcs.IntentScope.$inferType, '$kind'>;
/**
 * Inserts a domain separator for a message that is being signed
 */
export function messageWithIntent(scope: IntentScope, message: Uint8Array) {
	return bcs
		.IntentMessage(bcs.bytes(message.length))
		.serialize({
			intent: {
				scope: { [scope as 'PersonalMessage']: true },
				version: { V0: true },
				appId: { MySo: true },
			},
			value: message,
		})
		.toBytes();
}
