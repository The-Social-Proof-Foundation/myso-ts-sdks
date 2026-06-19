# `@socialproof/contra`

> **Warning** — This package is in active development. APIs are experimental and subject to
> breaking changes without notice. Test thoroughly before using in production.

TypeScript SDK for [Contra](https://github.com/The-Social-Proof-Foundation/myso-ts-sdks) — MySo
confidential token transfers. It builds programmable transaction blocks (PTBs) for the on-chain
`contra` Move package, generates the required zero-knowledge proofs, and decrypts encrypted
balances client-side.

## Requirements

- Node.js **22+**
- A MySo client from `@socialproof/myso`
- Published `contra` Move package IDs for your network (`packageId`, `accountRegistryId`,
  `tokenRegistryId`)

## Installation

```bash
npm install @socialproof/contra @socialproof/myso
```

## Setup

Contra uses the MySo client extension pattern. Create a client, extend it with `contra()`, and
access methods via `client.contra`.

```ts
import { contra, DiscreteLogTable, TokenAccount } from '@socialproof/contra';
import { MySoGrpcClient } from '@socialproof/myso/grpc';

const packageConfig = {
	packageId: '0x...',
	accountRegistryId: '0x...',
	tokenRegistryId: '0x...',
};

// Used to decrypt limb-sized ciphertexts off-chain. Blocks the event loop
// while building (~100ms+ at numBits=16); fine for Node scripts and servers.
const table = DiscreteLogTable.create(16);

const client = new MySoGrpcClient({
	network: 'devnet',
	baseUrl: 'https://fullnode.devnet.mysocial.network:443',
}).$extend(contra({ packageConfig, table }));
```

**Browser apps** should build the table off the main thread and optionally prefetch WASM
before the first transfer:

```ts
const table = await DiscreteLogTable.createAsync(16);

const client = new MySoGrpcClient({
	/* ... */
}).$extend(contra({ packageConfig, table }));

await client.contra.warmUpProofs();
```

`createAsync` auto-resolves the worker script when `Worker` is available. In environments
without workers (some SSR/edge runtimes), it falls back to synchronous `create` with the same
result. Node.js can use either API; `create(16)` remains the simpler default for CLI/server code.

Each user also needs a `TokenAccount` — a client-side object that holds the twisted ElGamal key
pair for a `(address, tokenType)` pair:

```ts
const tokenAccount = new TokenAccount(userAddress, '0x2::sui::SUI', packageConfig);
```

### Browser bundlers

Browser startup checklist — discrete-log table worker, bulletproofs WASM, and optional prefetch:

```ts
const table = await DiscreteLogTable.createAsync(16, {
	// Only if your bundler cannot resolve the default worker subpath:
	workerUrl: new URL('@socialproof/contra/workers/compute-table-entries', import.meta.url),
});

const client = new MySoGrpcClient({
	/* ... */
}).$extend(
	contra({
		packageConfig,
		table,
		wasmUrl: new URL(
			'@socialproof/contra-bulletproofs-wasm/web/contra_bulletproofs_wasm_bg.wasm',
			import.meta.url,
		),
	}),
);

await client.contra.warmUpProofs();
```

- **`workerUrl`** — override when the bundler cannot locate `@socialproof/contra/workers/compute-table-entries` (same pattern as `wasmUrl` below).
- **`wasmUrl`** — explicit URL for the bulletproofs `.wasm` asset when the bundler cannot locate it automatically. In Node this is ignored.
- **`warmUpProofs()`** — prefetch bulletproofs WASM after client creation so the first `register` / `transfer` / `unwrap` is not delayed by cold start. Safe to call multiple times; optional in Node.
- **`DiscreteLogTable.create(16)`** — still valid everywhere, including browser apps that already block on startup.

Proof generation uses WASM from `@socialproof/contra-bulletproofs-wasm`. In Node the asset is
resolved automatically. Minimal WASM-only override:

```ts
contra({
	packageConfig,
	table,
	wasmUrl: new URL(
		'@socialproof/contra-bulletproofs-wasm/web/contra_bulletproofs_wasm_bg.wasm',
		import.meta.url,
	),
});
```

## SDK overview

`ContraClient` (`client.contra`) is stateless with respect to user keys. Methods that need
encryption material take a `TokenAccount`; query methods take an address or `TokenAccount`.

Most transaction builders are **async** and return a synchronous thunk
`(tx: Transaction) => TransactionResult` that you pass to `tx.add(...)`:

```ts
import { Transaction } from '@socialproof/myso/transactions';

const transferFn = await client.contra.transfer({
	tokenAccount: senderTokenAccount,
	receiverAddress,
	amount: 100n,
});

const tx = new Transaction();
tx.add(transferFn);
tx.setSender(senderTokenAccount.address);
```

### Account lifecycle

1. **Create and share an account object** (one per address):

```ts
const tx = new Transaction();
const account = tx.add(client.contra.newAccount({ owner: userAddress }));
tx.add(client.contra.shareAccount({ account }));
```

2. **Register for a token type** — commits the user's viewing public key on chain and optionally
   encrypts it under the token issuer's auditor keys:

```ts
const auditorPks = (await client.contra.getAuditors(tokenType)).pks;

const regTx = new Transaction();
regTx.add(
	await client.contra.register({
		tokenAccount,
		auditorPublicKeys: auditorPks,
	}),
);
regTx.setSender(tokenAccount.address);
```

### Core flows

| Flow     | Method                       | Description                                               |
| -------- | ---------------------------- | --------------------------------------------------------- |
| Wrap     | `wrap`                       | Move public coins into a receiver's pending balance       |
| Merge    | `updateBalance`              | Merge pending deposits into the active encrypted balance  |
| Transfer | `transfer` / `transferBatch` | Confidential transfer to one or more recipients (max 7)   |
| Unwrap   | `unwrap`                     | Convert confidential balance back into a public `Coin<T>` |

**Wrap** public coins into confidential balance:

```ts
const tx = new Transaction();
const [payment] = tx.splitCoins(tx.object(coinId), [amount]);
tx.add(
	client.contra.wrap({
		coin: payment,
		receiver: userAddress,
		tokenType: '0x2::sui::SUI',
	}),
);
```

**Transfer** confidential balance (pending deposits are merged by default):

```ts
const transferFn = await client.contra.transfer({
	tokenAccount: senderTokenAccount,
	receiverAddress,
	amount: 100n,
});

const tx = new Transaction();
tx.add(transferFn);
```

**Unwrap** back to a public coin:

```ts
const unwrapFn = await client.contra.unwrap({
	tokenAccount,
	amount: 100n,
});

const tx = new Transaction();
const coin = tx.add(unwrapFn);
tx.transferObjects([coin], recipientAddress);
```

### Reading state

```ts
const { balance, pending, pendingPublicBalance } = await client.contra.getBalance(tokenAccount);

const pk = await client.contra.getPublicKey(userAddress, tokenType);

const { isFrozen } = await client.contra.getAccountStatus(userAddress, tokenType);

if (await client.contra.isTokenFrozen(tokenType)) {
	// Token issuer has globally paused the confidential token.
}

if (await client.contra.shouldRotateKey(tokenAccount)) {
	// Prompt user to refresh key encryption against a new auditor set.
}
```

### Key rotation and deposit controls

- `pauseAccount` / `unpauseAccount` — user-controlled pause of incoming encrypted deposits
- `rotateKeyAndUnpauseAccount` — rotate viewing key encryption and unpause
- `rotateKeyAndTransferBatch` — rotate keys and transfer in one transaction

See the TypeScript definitions and JSDoc on `ContraClient` for full option types and on-chain
abort conditions.

## Auditor SDK

`ContraAuditor` lets authorized auditors recover a user's private key from on-chain
`verified_key_encryption` data (or from registration / key-rotation events), then decrypt balances
and event amounts:

```ts
import { ContraAuditor } from '@socialproof/contra';

const auditor = new ContraAuditor({
	suiClient: client,
	packageConfig,
	tokenType: '0x2::sui::SUI',
	table,
	auditorKeyForVersion: new Map([[1, { index: 0, privateKey: auditorSk }]]),
});

const recovered = await auditor.getTokenAccount(userAddress);
const balance = await client.contra.getBalance(recovered);
```

## Low-level exports

The package also exports cryptographic primitives for advanced use cases:

- `EncryptedAmount`, `Ciphertext`, `MultiRecipientEncryption` — twisted ElGamal types
- `EncryptedAmount.decryptWithInverse`, `MultiRecipientEncryption.decryptWithInverse`, `Ciphertext.decryptWithInverse` — decrypt many ciphertexts under the same key with one `ristretto255.Point.Fn.inv(sk)` call
- `KeyEncryption`, `ElGamalNizk`, `DdhTupleNizk`, `KeyConsistencyProof` — proof types
- `contraContracts`, `eventsContracts` — generated Move bindings
- `G`, `randomScalar`, `pointFromBcs` — Ristretto255 helpers

## Development

From the monorepo root:

```bash
pnpm --filter @socialproof/contra build
pnpm --filter @socialproof/contra test
```

E2E tests require a local MySo network and the Contra Move package. See `test/e2e/` in the
repository.

## License

Apache-2.0
