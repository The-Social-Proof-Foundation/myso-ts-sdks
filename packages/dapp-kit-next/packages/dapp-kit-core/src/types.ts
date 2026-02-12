// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import type { DAppKit } from './core/index.js';

export interface Register {}

export type ResolvedRegister = {
	dAppKit: Register extends { dAppKit: infer _DAppKit } ? _DAppKit : DAppKit<[]>;
};

export type RegisteredDAppKit = ResolvedRegister['dAppKit'];

export type DefaultExpectedDppKit =
	DAppKit<[]> extends RegisteredDAppKit ? DAppKit<any> : RegisteredDAppKit;
