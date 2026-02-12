// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

/**
 * This example demonstrates how to derive a currencyId for a given coin type
 * using deriveObjectID. The currencyId is a derived object from the coin registry (0xc).
 *
 * Usage:
 *   npx tsx examples/deriveCurrencyId.ts
 */

import { bcs } from '@socialproof/myso/bcs';
import { deriveObjectID } from '@socialproof/myso/utils';

const CurrencyKey = bcs.struct('CurrencyKey', {
	dummy_value: bcs.bool(),
});

const coinType =
	'0x41d587e5336f1c86cad50d38a7136db99333bb9bda91cea4ba69115defeb1402::myso_usde::MYSO_USDE';
const key = CurrencyKey.serialize({ dummy_value: false }).toBytes();

const currencyId = deriveObjectID('0xc', `0x2::coin_registry::CurrencyKey<${coinType}>`, key);

console.log(`Coin type: ${coinType}`);
console.log(`Currency ID: ${currencyId}`);
