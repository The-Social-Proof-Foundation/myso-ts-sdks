// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import type { MySoObjectChange } from './generated.js';

export type MySoObjectChangePublished = Extract<MySoObjectChange, { type: 'published' }>;
export type MySoObjectChangeTransferred = Extract<MySoObjectChange, { type: 'transferred' }>;
export type MySoObjectChangeMutated = Extract<MySoObjectChange, { type: 'mutated' }>;
export type MySoObjectChangeDeleted = Extract<MySoObjectChange, { type: 'deleted' }>;
export type MySoObjectChangeWrapped = Extract<MySoObjectChange, { type: 'wrapped' }>;
export type MySoObjectChangeCreated = Extract<MySoObjectChange, { type: 'created' }>;
