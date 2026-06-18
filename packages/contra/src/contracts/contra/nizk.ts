/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/
import { MoveStruct, normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
import { bcs } from '@socialproof/myso/bcs';
import { type Transaction } from '@socialproof/myso/transactions';
import * as group_ops from './deps/myso/group_ops.js';
const $moduleName = '@local-pkg/contra::nizk';
export const KeyConsistencyProof = new MoveStruct({ name: `${$moduleName}::KeyConsistencyProof`, fields: {
        a1: bcs.vector(group_ops.Element),
        a2: bcs.vector(group_ops.Element),
        a3: group_ops.Element,
        z1: bcs.vector(group_ops.Element),
        z2: bcs.vector(group_ops.Element)
    } });
export const ElGamalProof = new MoveStruct({ name: `${$moduleName}::ElGamalProof`, fields: {
        a: group_ops.Element,
        b: group_ops.Element,
        z1: group_ops.Element,
        z2: group_ops.Element
    } });
export const DdhProof = new MoveStruct({ name: `${$moduleName}::DdhProof`, fields: {
        a: group_ops.Element,
        b: group_ops.Element,
        z: group_ops.Element
    } });
export interface NewDdhProofArguments {
    a: RawTransactionArgument<string>;
    b: RawTransactionArgument<string>;
    z: RawTransactionArgument<string>;
}
export interface NewDdhProofOptions {
    package?: string;
    arguments: NewDdhProofArguments | [
        a: RawTransactionArgument<string>,
        b: RawTransactionArgument<string>,
        z: RawTransactionArgument<string>
    ];
}
export function newDdhProof(options: NewDdhProofOptions) {
    const packageAddress = options.package ?? '@local-pkg/contra';
    const argumentsTypes = [
        null,
        null,
        null
    ] satisfies (string | null)[];
    const parameterNames = ["a", "b", "z"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'nizk',
        function: 'new_ddh_proof',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface NewElgamalProofArguments {
    a: RawTransactionArgument<string>;
    b: RawTransactionArgument<string>;
    z1: RawTransactionArgument<string>;
    z2: RawTransactionArgument<string>;
}
export interface NewElgamalProofOptions {
    package?: string;
    arguments: NewElgamalProofArguments | [
        a: RawTransactionArgument<string>,
        b: RawTransactionArgument<string>,
        z1: RawTransactionArgument<string>,
        z2: RawTransactionArgument<string>
    ];
}
export function newElgamalProof(options: NewElgamalProofOptions) {
    const packageAddress = options.package ?? '@local-pkg/contra';
    const argumentsTypes = [
        null,
        null,
        null,
        null
    ] satisfies (string | null)[];
    const parameterNames = ["a", "b", "z1", "z2"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'nizk',
        function: 'new_elgamal_proof',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface NewKeyConsistencyProofArguments {
    a1: RawTransactionArgument<string[]>;
    a2: RawTransactionArgument<string[]>;
    a3: RawTransactionArgument<string>;
    z1: RawTransactionArgument<string[]>;
    z2: RawTransactionArgument<string[]>;
}
export interface NewKeyConsistencyProofOptions {
    package?: string;
    arguments: NewKeyConsistencyProofArguments | [
        a1: RawTransactionArgument<string[]>,
        a2: RawTransactionArgument<string[]>,
        a3: RawTransactionArgument<string>,
        z1: RawTransactionArgument<string[]>,
        z2: RawTransactionArgument<string[]>
    ];
}
export function newKeyConsistencyProof(options: NewKeyConsistencyProofOptions) {
    const packageAddress = options.package ?? '@local-pkg/contra';
    const argumentsTypes = [
        'vector<null>',
        'vector<null>',
        null,
        'vector<null>',
        'vector<null>'
    ] satisfies (string | null)[];
    const parameterNames = ["a1", "a2", "a3", "z1", "z2"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'nizk',
        function: 'new_key_consistency_proof',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}