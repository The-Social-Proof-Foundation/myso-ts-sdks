// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

export { MySoGrpcClient, isMySoGrpcClient } from './client.js';
export { GrpcCoreClient } from './core.js';
export type { MySoGrpcClientOptions } from './client.js';
export type { GrpcCoreClientOptions } from './core.js';

// Export all gRPC proto types as a namespace
import * as GrpcTypes from './proto/types.js';
export { GrpcTypes };
