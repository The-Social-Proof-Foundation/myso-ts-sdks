/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/

/**
 * Module: `file-storage_context`
 *
 * Implements the `file-storageContext` struct which is used to store the current state
 * of the system. Improves testing and readability of signatures by aggregating the
 * parameters into a single struct. Context is used almost everywhere in the
 * system, so it is important to have a single source of truth for the current
 * state.
 */

import { MoveStruct } from '../utils/index.js';
import { bcs } from '@socialproof/myso/bcs';
import * as vec_map from './deps/myso/vec_map.js';
const $moduleName = '@local-pkg/file-storage::file-storage_context';
export const FileStorageContext = new MoveStruct({
	name: `${$moduleName}::file-storageContext`,
	fields: {
		/** Current File Storage epoch */
		epoch: bcs.u32(),
		/** Whether the committee has been selected for the next epoch. */
		committee_selected: bcs.bool(),
		/** The current committee in the system. */
		committee: vec_map.VecMap(bcs.Address, bcs.vector(bcs.u16())),
	},
});
