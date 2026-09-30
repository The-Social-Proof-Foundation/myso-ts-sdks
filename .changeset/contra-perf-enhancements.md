---
'@socialproof/contra': minor
---

Add performance-oriented APIs and internal decrypt optimizations:

- `DiscreteLogTable.createAsync()` builds the discrete-log table off the main thread in browsers (with `@socialproof/contra/workers/compute-table-entries` subpath export)
- `ContraClient.warmUpProofs()` prefetches bulletproofs WASM before the first transfer
- `EncryptedAmount.decryptWithInverse()` and `MultiRecipientEncryption.decryptWithInverse()` for batch decrypt under one key inverse
- Internal hoists and caching on balance reads, auditor key recovery, and `TokenAccount`

See the README browser startup section for recommended `createAsync` + `warmUpProofs` usage.
