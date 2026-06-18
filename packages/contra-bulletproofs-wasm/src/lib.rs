// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

//! WASM bindings for DST-bound bulletproof range proofs, matching on-chain
//! `myso::rangeproofs::verify_bulletproofs_with_dst_ristretto255`.

use bulletproofs::{BulletproofGens, PedersenGens, RangeProof as ExternalRangeProof};
use curve25519_dalek::ristretto::CompressedRistretto;
use curve25519_dalek::scalar::Scalar;
use merlin::Transcript;
use wasm_bindgen::prelude::*;

const MAX_DST_LEN: usize = 64;

fn transcript_label(dst: &[u8]) -> &'static [u8] {
    Box::leak(dst.to_vec().into_boxed_slice())
}

#[wasm_bindgen]
pub struct RangeProofResult {
    proof_bytes: Vec<u8>,
    commitment_bytes: Vec<u8>,
}

#[wasm_bindgen]
impl RangeProofResult {
    #[wasm_bindgen(getter)]
    pub fn proof(&self) -> Vec<u8> {
        self.proof_bytes.clone()
    }

    #[wasm_bindgen(getter)]
    pub fn commitment(&self) -> Vec<u8> {
        self.commitment_bytes.clone()
    }
}

#[wasm_bindgen]
pub struct BatchRangeProofResult {
    proof_bytes: Vec<u8>,
    commitments_bytes: Vec<u8>,
}

#[wasm_bindgen]
impl BatchRangeProofResult {
    #[wasm_bindgen(getter)]
    pub fn proof(&self) -> Vec<u8> {
        self.proof_bytes.clone()
    }

    #[wasm_bindgen(getter)]
    pub fn commitments(&self) -> Vec<u8> {
        self.commitments_bytes.clone()
    }
}

#[wasm_bindgen(js_name = rangeProof)]
pub fn range_proof(
    value: u64,
    blinding: &[u8],
    bit_size: u32,
    dst: &[u8],
) -> Result<RangeProofResult, JsError> {
    validate_dst(dst)?;
    let bits = bits_for_range(range_from_bits(bit_size)?);
    let blinding = blinding_from_bytes(blinding)?;
    let pc_gens = PedersenGens::default();
    let bp_gens = BulletproofGens::new(bits, 1);
    let mut prover_transcript = Transcript::new(transcript_label(dst));
    let (proof, _) = ExternalRangeProof::prove_single_with_rng(
        &bp_gens,
        &pc_gens,
        &mut prover_transcript,
        value,
        &blinding,
        bits,
        &mut rand::thread_rng(),
    )
    .map_err(|e| JsError::new(&format!("prove failed: {e:?}")))?;
    let commitment = pc_gens
        .commit(Scalar::from(value), blinding)
        .compress();
    Ok(RangeProofResult {
        proof_bytes: proof.to_bytes(),
        commitment_bytes: commitment.to_bytes().to_vec(),
    })
}

#[wasm_bindgen(js_name = batchRangeProof)]
pub fn batch_range_proof(
    values: &[u64],
    blindings: &[u8],
    bit_size: u32,
    dst: &[u8],
) -> Result<BatchRangeProofResult, JsError> {
    validate_dst(dst)?;
    let bits = bits_for_range(range_from_bits(bit_size)?);
    let n = values.len();
    if blindings.len() != 32 * n {
        return Err(JsError::new("blindings must be 32 * values.len() bytes"));
    }
    if n == 0 || !n.is_power_of_two() {
        return Err(JsError::new("values.len() must be a positive power of 2"));
    }

    let blindings: Vec<Scalar> = blindings
        .chunks(32)
        .map(blinding_from_bytes)
        .collect::<Result<_, _>>()?;

    let pc_gens = PedersenGens::default();
    let bp_gens = BulletproofGens::new(bits, n);
    let mut prover_transcript = Transcript::new(transcript_label(dst));
    let (proof, _) = ExternalRangeProof::prove_multiple_with_rng(
        &bp_gens,
        &pc_gens,
        &mut prover_transcript,
        values,
        &blindings,
        bits,
        &mut rand::thread_rng(),
    )
    .map_err(|e| JsError::new(&format!("prove_batch failed: {e:?}")))?;

    let commitments_bytes: Vec<u8> = values
        .iter()
        .zip(&blindings)
        .flat_map(|(&v, b)| {
            pc_gens
                .commit(Scalar::from(v), *b)
                .compress()
                .to_bytes()
        })
        .collect();

    Ok(BatchRangeProofResult {
        proof_bytes: proof.to_bytes(),
        commitments_bytes,
    })
}

#[wasm_bindgen(js_name = verifyRangeProof)]
pub fn verify_range_proof(
    proof: &[u8],
    commitment: &[u8],
    bit_size: u32,
    dst: &[u8],
) -> Result<bool, JsError> {
    validate_dst(dst)?;
    let bits = bits_for_range(range_from_bits(bit_size)?);
    let proof = ExternalRangeProof::from_bytes(proof)
        .map_err(|e| JsError::new(&format!("invalid proof bytes: {e:?}")))?;
    let commitment = commitment_from_bytes(commitment)?;
    let pc_gens = PedersenGens::default();
    let bp_gens = BulletproofGens::new(bits, 1);
    let mut verifier_transcript = Transcript::new(transcript_label(dst));
    Ok(proof
        .verify_single(&bp_gens, &pc_gens, &mut verifier_transcript, &commitment, bits)
        .is_ok())
}

#[wasm_bindgen(js_name = verifyBatchRangeProof)]
pub fn verify_batch_range_proof(
    proof: &[u8],
    commitments: &[u8],
    bit_size: u32,
    dst: &[u8],
) -> Result<bool, JsError> {
    validate_dst(dst)?;
    let bits = bits_for_range(range_from_bits(bit_size)?);
    if commitments.len() % 32 != 0 {
        return Err(JsError::new("commitments must be a multiple of 32 bytes"));
    }
    let n = commitments.len() / 32;
    if n == 0 || !n.is_power_of_two() {
        return Err(JsError::new("commitment count must be a positive power of 2"));
    }
    let compressed: Result<Vec<CompressedRistretto>, JsError> = commitments
        .chunks(32)
        .map(|chunk| {
            let array: [u8; 32] = chunk
                .try_into()
                .map_err(|_| JsError::new("commitment must be 32 bytes"))?;
            Option::from(CompressedRistretto(array))
                .ok_or_else(|| JsError::new("commitment is not a valid ristretto point"))
        })
        .collect();
    let compressed = compressed?;
    let proof = ExternalRangeProof::from_bytes(proof)
        .map_err(|e| JsError::new(&format!("invalid proof bytes: {e:?}")))?;
    let pc_gens = PedersenGens::default();
    let bp_gens = BulletproofGens::new(bits, n);
    let mut verifier_transcript = Transcript::new(transcript_label(dst));
    Ok(proof
        .verify_multiple(
            &bp_gens,
            &pc_gens,
            &mut verifier_transcript,
            &compressed,
            bits,
        )
        .is_ok())
}

fn validate_dst(dst: &[u8]) -> Result<(), JsError> {
    if dst.len() > MAX_DST_LEN {
        return Err(JsError::new("dst must be at most 64 bytes"));
    }
    Ok(())
}

fn range_from_bits(bit_size: u32) -> Result<usize, JsError> {
    match bit_size {
        8 => Ok(8),
        16 => Ok(16),
        32 => Ok(32),
        64 => Ok(64),
        _ => Err(JsError::new("bit_size must be 8, 16, 32, or 64")),
    }
}

fn bits_for_range(bits: usize) -> usize {
    bits
}

fn blinding_from_bytes(bytes: &[u8]) -> Result<Scalar, JsError> {
    let array: [u8; 32] = bytes
        .try_into()
        .map_err(|_| JsError::new("blinding must be 32 bytes"))?;
    Option::from(Scalar::from_canonical_bytes(array))
        .ok_or_else(|| JsError::new("blinding is not a canonical scalar"))
}

fn commitment_from_bytes(bytes: &[u8]) -> Result<CompressedRistretto, JsError> {
    let array: [u8; 32] = bytes
        .try_into()
        .map_err(|_| JsError::new("commitment must be 32 bytes"))?;
    Option::from(CompressedRistretto(array))
        .ok_or_else(|| JsError::new("commitment is not a valid ristretto point"))
}
