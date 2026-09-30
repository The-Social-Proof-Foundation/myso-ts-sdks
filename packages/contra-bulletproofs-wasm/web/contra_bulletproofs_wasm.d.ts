/* tslint:disable */
/* eslint-disable */

export class BatchRangeProofResult {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    readonly commitments: Uint8Array;
    readonly proof: Uint8Array;
}

export class RangeProofResult {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    readonly commitment: Uint8Array;
    readonly proof: Uint8Array;
}

export function batchRangeProof(values: BigUint64Array, blindings: Uint8Array, bit_size: number, dst: Uint8Array): BatchRangeProofResult;

export function rangeProof(value: bigint, blinding: Uint8Array, bit_size: number, dst: Uint8Array): RangeProofResult;

export function verifyBatchRangeProof(proof: Uint8Array, commitments: Uint8Array, bit_size: number, dst: Uint8Array): boolean;

export function verifyRangeProof(proof: Uint8Array, commitment: Uint8Array, bit_size: number, dst: Uint8Array): boolean;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
    readonly memory: WebAssembly.Memory;
    readonly __wbg_batchrangeproofresult_free: (a: number, b: number) => void;
    readonly batchRangeProof: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => [number, number, number];
    readonly batchrangeproofresult_commitments: (a: number) => [number, number];
    readonly batchrangeproofresult_proof: (a: number) => [number, number];
    readonly rangeProof: (a: bigint, b: number, c: number, d: number, e: number, f: number) => [number, number, number];
    readonly verifyBatchRangeProof: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => [number, number, number];
    readonly verifyRangeProof: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => [number, number, number];
    readonly rangeproofresult_commitment: (a: number) => [number, number];
    readonly rangeproofresult_proof: (a: number) => [number, number];
    readonly __wbg_rangeproofresult_free: (a: number, b: number) => void;
    readonly __wbindgen_exn_store: (a: number) => void;
    readonly __externref_table_alloc: () => number;
    readonly __wbindgen_externrefs: WebAssembly.Table;
    readonly __wbindgen_malloc: (a: number, b: number) => number;
    readonly __externref_table_dealloc: (a: number) => void;
    readonly __wbindgen_free: (a: number, b: number, c: number) => void;
    readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;

/**
 * Instantiates the given `module`, which can either be bytes or
 * a precompiled `WebAssembly.Module`.
 *
 * @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
 *
 * @returns {InitOutput}
 */
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
 * If `module_or_path` is {RequestInfo} or {URL}, makes a request and
 * for everything else, calls `WebAssembly.instantiate` directly.
 *
 * @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
 *
 * @returns {Promise<InitOutput>}
 */
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
