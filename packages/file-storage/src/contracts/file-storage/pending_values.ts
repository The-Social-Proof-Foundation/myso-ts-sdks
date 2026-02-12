/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/
import { MoveTuple } from '../utils/index.js';
import { bcs } from '@socialproof/myso/bcs';
import * as vec_map from './deps/myso/vec_map.js';
const $moduleName = '@local-pkg/file-storage::pending_values';
export const PendingValues = new MoveTuple({
	name: `${$moduleName}::PendingValues`,
	fields: [vec_map.VecMap(bcs.u32(), bcs.u64())],
});
