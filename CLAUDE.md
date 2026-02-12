# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a monorepo containing TypeScript SDKs for the MySo blockchain ecosystem. It uses pnpm workspaces, turbo for build orchestration, and includes packages for core MySo functionality, dApp development, wallet integration, and various blockchain services.

## Common Commands

### Setup and Build

```bash
# Initial setup
pnpm install
pnpm turbo build

# Build all packages
pnpm build

# Build a specific package with dependencies
pnpm turbo build --filter=@socialproof/myso
```

### Testing

```bash
# Run unit tests
pnpm test

# Run unit tests for a specific package
pnpm --filter @socialproof/myso test

# Run a single test file
pnpm --filter @socialproof/myso vitest run path/to/test.spec.ts

# Run e2e tests (requires Docker)
pnpm test:e2e
```

### Linting and Formatting

```bash
# Check lint and formatting
pnpm lint

# Auto-fix lint and formatting issues
pnpm lint:fix

# Run oxlint and prettier separately
pnpm oxlint:check
pnpm prettier:check
```

### Package Management

```bash
# Add a changeset for version updates
pnpm changeset

# Version packages
pnpm changeset-version
```

## Architecture

### Repository Structure

- **packages/** - All SDK packages organized by functionality
  - **typescript/** - Core MySo SDK with submodules for bcs, client, cryptography, transactions, etc.
  - **dapp-kit/** - React hooks and components for dApp development
  - **wallet-standard/** - Wallet adapter implementation
  - **signers/** - Various signing solutions (AWS KMS, GCP KMS, Ledger, etc.)
  - **orderbook/** - DEX integration packages
  - **zksend/** - zkSend functionality

### Build System

- Uses Turbo for monorepo task orchestration with dependency-aware builds
- Each package can have its own test configuration (typically using Vitest)
- Common build outputs: `dist/` for compiled code, with both ESM and CJS formats

### Key Patterns

1. **Modular exports**: Packages use subpath exports (e.g., `@socialproof/myso/client`, `@socialproof/myso/bcs`)
2. **Shared utilities**: Common functionality in `packages/utils`
3. **Code generation**: Some packages use GraphQL codegen and version generation scripts
4. **Testing**: Unit tests alongside source files, e2e tests in separate directories
5. **Type safety**: Extensive TypeScript usage with strict type checking

### Development Workflow

1. Changes require changesets for version management
2. Turbo ensures dependencies are built before dependents
3. OXLint and Prettier are enforced across the codebase
4. Tests must pass before changes can be merged

## External Resources

Several packages depend on external repositories and remote schemas. These are used for code generation and type definitions.

### Local Sibling Repositories (relative to ts-sdks)

| Path                 | Description                        | Used By                                                     |
| -------------------- | ---------------------------------- | ----------------------------------------------------------- |
| `../myso`             | Main MySo blockchain implementation | Reference for gRPC, GraphQL, and JSON-RPC implementations   |
| `../myso-apis`        | Protocol buffer definitions        | `@socialproof/myso` gRPC codegen (`packages/myso/src/grpc/proto/`) |
| `../myso-payment-kit` | Payment kit Move contracts         | `@socialproof/payment-kit` codegen                               |
| `../file-storage`          | File Storage storage contracts           | `@socialproof/file-storage` codegen                                    |
| `../orderbook`      | Orderbook v3 DEX contracts          | `@socialproof/orderbook` codegen                               |

### Remote Resources (fetched from GitHub)

| URL                                                         | Description           | Used By                                |
| ----------------------------------------------------------- | --------------------- | -------------------------------------- |
| `MystenLabs/myso/.../myso-indexer-alt-graphql/schema.graphql` | GraphQL schema        | `@socialproof/myso` GraphQL codegen          |
| `MystenLabs/myso/.../myso-open-rpc/spec/openrpc.json`         | JSON-RPC OpenRPC spec | `@socialproof/myso` JSON-RPC type generation |
| `MystenLabs/myso/Cargo.toml`                                 | MySo version info      | `@socialproof/myso` version generation       |

### On-chain Resources

Some packages fetch contract ABIs directly from MySo networks:

- `@socialproof/orderbook`: Pyth oracle package from testnet

### Pull Requests

When creating PRs, follow the template in `.github/PULL_REQUEST_TEMPLATE.md`:

- Include a description of the changes
- Check the "This PR was primarily written by AI" checkbox in the AI Assistance Notice section

### Codegen Commands

```bash
# Generate gRPC types from ../myso-apis proto files
pnpm --filter @socialproof/myso codegen:grpc

# Fetch latest GraphQL schema from remote (updates schema.graphql)
pnpm --filter @socialproof/myso update-graphql-schema

# Generate GraphQL types from schema (updates queries.ts)
pnpm --filter @socialproof/myso codegen:graphql

# Generate Move contract bindings (various packages)
pnpm --filter @socialproof/payment-kit codegen
pnpm --filter @socialproof/file-storage codegen
pnpm --filter @socialproof/orderbook codegen
```
