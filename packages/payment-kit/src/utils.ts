// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import { bcs } from '@socialproof/myso/bcs';
import { deriveObjectID } from '@socialproof/myso/utils';
import { DEFAULT_REGISTRY_NAME } from './constants.js';

export const getRegistryIdFromName = (
	registryName: string = DEFAULT_REGISTRY_NAME,
	namespaceId: string,
) => {
	return deriveObjectID(
		namespaceId,
		'0x1::ascii::String',
		bcs.String.serialize(registryName).toBytes(),
	);
};
