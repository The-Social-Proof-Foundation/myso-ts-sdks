// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

/// <reference lib="webworker" />

import { computeTableEntries } from '../twisted_elgamal.js';

export type ComputeTableEntriesRequest = { numBits: number };
export type ComputeTableEntriesResponse = { entries: Uint32Array };

self.onmessage = (event: MessageEvent<ComputeTableEntriesRequest>) => {
	const { numBits } = event.data;
	const entries = computeTableEntries(numBits);
	self.postMessage({ entries } satisfies ComputeTableEntriesResponse, {
		transfer: [entries.buffer],
	});
};
