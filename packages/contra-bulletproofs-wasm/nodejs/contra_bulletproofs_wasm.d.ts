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
