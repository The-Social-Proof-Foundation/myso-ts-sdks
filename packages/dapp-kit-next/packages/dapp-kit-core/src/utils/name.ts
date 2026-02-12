// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import { normalizeMySoNSName } from '@socialproof/myso/utils';
import type { DAppKitCompatibleClient } from '../core/types.js';

const cache = new Map<string, string | null>();

export async function resolveNameServiceName(client: DAppKitCompatibleClient, address: string) {
	if (cache.has(address)) {
		return cache.get(address)!;
	}

	try {
		const result = await client.core.defaultNameServiceName?.({
			address,
		});

		const name = result?.data.name;
		cache.set(address, name ? normalizeMySoNSName(name, 'at') : null);
		return name;
	} catch {
		cache.set(address, null);
		return null;
	}
}
