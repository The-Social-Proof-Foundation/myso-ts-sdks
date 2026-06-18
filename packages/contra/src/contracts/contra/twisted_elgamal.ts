/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/
import { MoveStruct, normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
import { bcs } from '@socialproof/myso/bcs';
import { type Transaction } from '@socialproof/myso/transactions';
import * as group_ops from './deps/myso/group_ops.js';
const $moduleName = '@local-pkg/contra::twisted_elgamal';
export const MultiRecipientEncryption = new MoveStruct({ name: `${$moduleName}::MultiRecipientEncryption`, fields: {
        ciphertext: group_ops.Element,
        decryption_handles: bcs.vector(group_ops.Element)
    } });
export const Encryption = new MoveStruct({ name: `${$moduleName}::Encryption`, fields: {
        ciphertext: group_ops.Element,
        decryption_handle: group_ops.Element
    } });
export interface NewArguments {
    ciphertext: RawTransactionArgument<string>;
    decryptionHandle: RawTransactionArgument<string>;
}
export interface NewOptions {
    package?: string;
    arguments: NewArguments | [
        ciphertext: RawTransactionArgument<string>,
        decryptionHandle: RawTransactionArgument<string>
    ];
}
/**
 * Create a new Twisted ElGamal encryption from a given `ciphertext` and
 * `decryption_handle`.
 */
export function _new(options: NewOptions) {
    const packageAddress = options.package ?? '@local-pkg/contra';
    const argumentsTypes = [
        null,
        null
    ] satisfies (string | null)[];
    const parameterNames = ["ciphertext", "decryptionHandle"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'twisted_elgamal',
        function: 'new',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface NewMultiRecipientEncryptionArguments {
    ciphertext: RawTransactionArgument<string>;
    decryptionHandles: RawTransactionArgument<string[]>;
}
export interface NewMultiRecipientEncryptionOptions {
    package?: string;
    arguments: NewMultiRecipientEncryptionArguments | [
        ciphertext: RawTransactionArgument<string>,
        decryptionHandles: RawTransactionArgument<string[]>
    ];
}
/**
 * Construct a Twisted ElGamal `MultiRecipientEncryption` consisting of a shared
 * ciphertext `c = r * g + m * h` and one decryption handle `d_i = r * pk_i` per
 * recipient identified by their public key `pk_i`.
 */
export function newMultiRecipientEncryption(options: NewMultiRecipientEncryptionOptions) {
    const packageAddress = options.package ?? '@local-pkg/contra';
    const argumentsTypes = [
        null,
        'vector<null>'
    ] satisfies (string | null)[];
    const parameterNames = ["ciphertext", "decryptionHandles"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'twisted_elgamal',
        function: 'new_multi_recipient_encryption',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface MultiRecipientCiphertextArguments {
    e: RawTransactionArgument<string>;
}
export interface MultiRecipientCiphertextOptions {
    package?: string;
    arguments: MultiRecipientCiphertextArguments | [
        e: RawTransactionArgument<string>
    ];
}
/**
 * Returns the shared ciphertext component `c = r * g + m * h` of a Twisted ElGamal
 * `MultiRecipientEncryption`.
 */
export function multiRecipientCiphertext(options: MultiRecipientCiphertextOptions) {
    const packageAddress = options.package ?? '@local-pkg/contra';
    const argumentsTypes = [
        null
    ] satisfies (string | null)[];
    const parameterNames = ["e"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'twisted_elgamal',
        function: 'multi_recipient_ciphertext',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface MultiRecipientDecryptionHandlesArguments {
    e: RawTransactionArgument<string>;
}
export interface MultiRecipientDecryptionHandlesOptions {
    package?: string;
    arguments: MultiRecipientDecryptionHandlesArguments | [
        e: RawTransactionArgument<string>
    ];
}
/**
 * Returns the per-recipient decryption handles `d_i = r * pk_i` for recipient
 * public key `pk_i` of a Twisted ElGamal `MultiRecipientEncryption`.
 */
export function multiRecipientDecryptionHandles(options: MultiRecipientDecryptionHandlesOptions) {
    const packageAddress = options.package ?? '@local-pkg/contra';
    const argumentsTypes = [
        null
    ] satisfies (string | null)[];
    const parameterNames = ["e"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'twisted_elgamal',
        function: 'multi_recipient_decryption_handles',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}