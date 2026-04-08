/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/

/**
 * `Balances` represents the three assets that make up a pool: base, quote, and MYUSD.
 * Whenever funds are moved, they are moved in the form of `Balances`.
 */

import { MoveStruct } from '../utils/index.js';
import { bcs } from '@socialproof/myso/bcs';
const $moduleName = '@orderbook/core::balances';
export const Balances = new MoveStruct({
	name: `${$moduleName}::Balances`,
	fields: {
		base: bcs.u64(),
		quote: bcs.u64(),
		myusd: bcs.u64(),
	},
});
