# CLAUDE.md - Orderbook V3 Package

This file contains package-specific guidance for Claude Code when working with the orderbook
package.

**IMPORTANT**: Update this file whenever new patterns, gotchas, or important information is learned
while working in this package. This helps future sessions avoid repeating the same investigations.

## Overview

Orderbook V3 is a decentralized exchange (DEX) SDK for MySo blockchain. It provides client
extensions for interacting with Orderbook pools, margin managers, and flash loans.

## Package Structure

```
packages/orderbook/
├── src/
│   ├── index.ts           # Main entry point, exports orderbook() extension
│   ├── client.ts          # OrderbookClient class with high-level methods
│   ├── transactions/      # Transaction builders for Move calls
│   │   ├── pool.ts        # Pool operations (place orders, get quotes, etc.)
│   │   ├── marginManager.ts # Margin manager operations
│   │   ├── flashLoan.ts   # Flash loan operations
│   │   └── ...
│   └── utils/
│       └── config.ts      # Network configuration and coin types
├── examples/              # Usage examples
└── tests/
```

## Key Concepts

### Client Extension Pattern

Orderbook uses the MySo client extension pattern via `$extend()`:

```typescript
import { MySoGrpcClient } from '@socialproof/myso/grpc';
import { orderbook } from '@socialproof/orderbook';

const client = new MySoGrpcClient({ network: 'mainnet', baseUrl: '...' }).$extend(
  orderbook({
    address: '0x...', // User's address
    pools: { ... },   // Optional: custom pool config
    marginManagers: { ... }, // Optional: custom margin manager config
  })
);

// Access Orderbook methods via client.orderbook.*
await client.orderbook.getLevel2Range('MYSO_USDC', ...);
```

### Localnet and custom deployments

1. **RPC**: Create `MySoGrpcClient` with `network: 'localnet'` (or `'devnet'`) and `baseUrl` pointing at your local fullnode.
2. **On-chain ids**: Edit [`src/utils/constants.ts`](src/utils/constants.ts) `localnetPackageIds`, `localnetPythConfigs`, and add entries to `localnetCoins`, `localnetPools`, and `localnetMarginPools` after you publish contracts and create pools. Defaults use placeholder `0x00…00` addresses until you replace them.
3. **Overrides without editing the SDK**: Pass `deployment: { packageIds: { … }, pyth: { … } }` into `orderbook({ … })` (or construct `OrderbookConfig` with the same field). Values merge on top of the defaults for that network profile.
4. **Pyth Hermes**: Non-`mainnet` networks default to `https://hermes-beta.pyth.network`. Override with `pythHermesUrl` on the orderbook options or set env `PYTH_HERMES_URL` (e.g. a local Hermes or custom endpoint).
5. **Codegen**: Prefer `path` entries in `myso-codegen.config.ts` for Move packages on disk (run `myso move summary` in each package). For `package` + on-chain id entries, set `network: 'localnet'` and point the MySo CLI at your local node so `myso move summary --package-id …` resolves. See the commented example in `myso-codegen.config.ts`.

### Move Abilities and PTB Limitations

When working with Move types in Programmable Transaction Blocks (PTBs):

1. **`key` ability objects (like `MarginManager`)**: Cannot be put into vectors. `tx.makeMoveVec()`
   will fail with `UnusedValueWithoutDrop` error.

2. **References cannot be returned between PTB commands**: Move functions returning `&T` or `&mut T`
   cannot have their results used in subsequent PTB commands. This causes
   `InvalidPublicFunctionReturnType` error.

3. **Workaround for batch operations**: Instead of creating vectors of `key` objects, call the
   single-object function multiple times in the same transaction and parse each `commandResults[i]`.

### Transaction Simulation and Result Parsing

For functions that return values (read-only operations), use simulation:

```typescript
const result = await client.simulateTransaction({
	transaction: tx,
	include: { commandResults: true },
});

// Access return values from simulation
const returnValues = result.commandResults?.[0]?.returnValues;
```

## Important Functions

### `getMarginManagerStates`

Fetches state for multiple margin managers in a single transaction.

**Input**: `Record<string, string>` mapping `marginManagerId -> poolKey`

**Implementation**: Calls `managerState()` for each manager in a single PTB, then parses
`commandResults[0]`, `commandResults[1]`, etc.

**Example**:

```typescript
const states = await client.orderbook.getMarginManagerStates({
	'0x206037...': 'MYSO_USDC',
	'0x14218d...': 'MYSO_USDC',
});
```

### `getPriceInfoObjects` (batch)

Batch updates Pyth price feeds for multiple coins. Only updates stale feeds (older than 30 seconds).
Configured via `PRICE_INFO_OBJECT_MAX_AGE_MS` in `src/utils/config.ts`.

**Why use this over `getPriceInfoObject` in a loop?**

- Single RPC call to fetch all price info object ages (vs N calls)
- Single Pyth API call for all stale feeds (vs up to N calls)

**Input**: `(tx: Transaction, coinKeys: string[])`

**Returns**: `Record<string, string>` mapping `coinKey -> priceInfoObjectId`

**Example**:

```typescript
const priceUpdateTx = new Transaction();
const priceInfoObjects = await client.orderbook.getPriceInfoObjects(priceUpdateTx, [
	'MYSO',
	'USDC',
	'MYUSD',
	'WBTC',
]);
// Only stale feeds are updated in the transaction
// Fresh feeds return their existing priceInfoObjectId
```

### `getLevel2Range`

Gets order book depth for a price range. Uses vectors internally but works because the Move function
handles vector creation on-chain, not in PTB.

## MySoGrpcClient API Notes

When using the new gRPC client (replacing JSON-RPC):

| Old (JSON-RPC)                   | New (gRPC)                          |
| -------------------------------- | ----------------------------------- |
| `client.getCoins({ owner })`     | `client.listCoins({ owner })`       |
| `coins.data`                     | `coins.objects`                     |
| `coin.coinObjectId`              | `coin.objectId`                     |
| `client.getObject({ id })`       | `client.getObject({ objectId })`    |
| `result.data`                    | `{ object } = result` (destructure) |
| `signAndExecuteTransactionBlock` | `signAndExecuteTransaction`         |

## Testing

```bash
# Run tests
pnpm --filter @socialproof/orderbook test

# Run codegen (requires ../orderbook sibling repo)
pnpm --filter @socialproof/orderbook codegen
```

## Formatting

After making changes, always run prettier to format the code:

```bash
pnpm exec prettier --write .
```

## Common Errors

1. **`UnusedValueWithoutDrop { result_idx: 0, secondary_idx: 0 }`**: Simulation returned a
   non-droppable value. Check if you're trying to create vectors of `key` objects.

2. **`InvalidPublicFunctionReturnType { idx: 0 }`**: Move function returns a reference type which
   cannot be passed between PTB commands.

3. **`INVALID_ARGUMENT`**: Often caused by using wrong property names in gRPC client calls (e.g.,
   `id` instead of `objectId`).

## Dependencies

- `@socialproof/myso` - Core MySo SDK
- Requires sibling repo `../orderbook` for codegen

## NPM Package Change Summary Format

When asked for a summary of changes for the npm package, use this format:

```
## @socialproof/orderbook Changes Summary

### New Features

**`functionName(params)`** - Brief description
- Bullet points explaining behavior
- Code example if helpful

### Configuration Changes

- `CONFIG_NAME`: oldValue → newValue (description)

### Breaking Changes

- Description of breaking change and migration path

### Bug Fixes

- Description of fix

### New Examples

- `examples/filename.ts` - Description

### Files Changed

- `path/to/file.ts` - What changed
```

---

## Changelog

Track significant updates to this file:

- **2026-02**: Initial creation with Move/PTB limitations, `getMarginManagerStates` implementation,
  gRPC client migration notes
- **2026-02**: Added `getPriceInfoObjects` batch method for efficient Pyth price updates
- **2026-02**: Updated `PRICE_INFO_OBJECT_MAX_AGE_MS` from 15s to 30s
- **2026-05**: Documented `localnet` / `devnet` profiles, `deployment` overrides, and Pyth Hermes resolution for custom chains
