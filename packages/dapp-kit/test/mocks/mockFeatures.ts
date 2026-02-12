// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import type { IdentifierRecord, MySoFeatures, MySoSignMessageFeature } from '@socialproof/wallet-standard';

export const signMessageFeature: MySoSignMessageFeature = {
	'myso:signMessage': {
		version: '1.0.0',
		signMessage: vi.fn(),
	},
};

export const superCoolFeature: IdentifierRecord<unknown> = {
	'my-dapp:super-cool-feature': {
		version: '1.0.0',
		superCoolFeature: vi.fn(),
	},
};

export const mysoFeatures: MySoFeatures = {
	...signMessageFeature,
	'myso:signPersonalMessage': {
		version: '1.1.0',
		signPersonalMessage: vi.fn(),
	},
	'myso:signTransactionBlock': {
		version: '1.0.0',
		signTransactionBlock: vi.fn(),
	},
	'myso:signTransaction': {
		version: '2.0.0',
		signTransaction: vi.fn(),
	},
	'myso:signAndExecuteTransactionBlock': {
		version: '1.0.0',
		signAndExecuteTransactionBlock: vi.fn(),
	},
	'myso:signAndExecuteTransaction': {
		version: '2.0.0',
		signAndExecuteTransaction: vi.fn(),
	},
};
