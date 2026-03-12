# @socialproof/mysocial-auth

MySocial Auth SDK for "Login with MySocial" via popup or redirect. Enables third-party platforms
(e.g. dripdrop.social) to authenticate users against auth.mysocial.network.

## Installation

```bash
pnpm add @socialproof/mysocial-auth
```

## Quick Start

```typescript
import { createMySocialAuth } from '@socialproof/mysocial-auth';

const auth = createMySocialAuth({
	apiBaseUrl: 'https://api.mysocial.network',
	authOrigin: 'https://auth.mysocial.network',
	clientId: 'dripdrop-platform-id',
	redirectUri: 'https://dripdrop.social/auth/callback', // must be pre-registered/allowlisted per clientId
	storage: 'memory', // default; use 'session' for persistence across reloads
});

// Popup login
// IMPORTANT: Call signIn() directly inside the click handler (no await before window.open).
// Safari blocks popups unless triggered by a direct user gesture.
document
	.getElementById('login-btn')
	.addEventListener('click', () => auth.signIn({ mode: 'popup', provider: 'google' }));

// Redirect login (platform hosts callback at redirectUri)
// 1. auth.signIn({ mode: 'redirect', provider: 'google' })
// 2. User redirected to auth.mysocial.network, then back to redirectUri with ?code=...&state=...&nonce=...
// 3. On callback page: await auth.handleRedirectCallback()

// Check session - use user.address for the wallet (0x...), not code or salt
const session = await auth.getSession();
if (session) {
	const address = session.user?.address; // Wallet address
}

// Listen for changes
auth.onAuthStateChange((session) => {
	/* ... */
});

// Logout
await auth.signOut();
```

## redirectUri Requirement

- Must be a **specific callback path** (e.g. `/auth/callback`), not the root domain.
- Must be **pre-registered/allowlisted** server-side per `clientId`.

## API

### createMySocialAuth(config)

| Option       | Type                                    | Default  | Description                                                                                                    |
| ------------ | --------------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------- |
| apiBaseUrl   | string                                  | -        | Backend API base URL (e.g. https://api.mysocial.network)                                                       |
| authOrigin   | string                                  | -        | Auth popup host (e.g. https://auth.mysocial.network)                                                           |
| clientId     | string                                  | -        | Platform ID (for backend rate limiting/whitelist)                                                              |
| redirectUri  | string                                  | -        | Callback URL; must be allowlisted per clientId                                                                 |
| storage      | 'memory' \| 'session' \| StorageAdapter | 'memory' | Session storage. `memory` is most secure (no XSS exposure). `session` persists across reloads in the same tab. |
| popupTimeout | number                                  | 120000   | Popup timeout in ms                                                                                            |
| useRequestId | boolean                                 | false    | Use request_id flow (requires backend POST /auth/request)                                                      |

### auth.signIn(options?)

- `provider?`: 'google' | 'apple' | 'facebook' | 'twitch' | 'none' (default 'none' = home screen)
- `mode?`: 'popup' | 'redirect' (default: 'popup')
- `onWalletCredentials?`: Opt-in callback for Create/Import Wallet flow. Receives `{ address, mnemonic?, privateKey? }` ephemerally. **SECURITY: Never persist.** Handle immediately (e.g. derive keypair, show backup UI) and discard.
- Returns: `Promise<Session>` (popup) or never (redirect; page navigates)

### auth.signOut()

- Clears session and calls backend logout.

### auth.getSession()

- Returns current session, or null. Auto-refreshes if expired and refresh_token exists.

### auth.refresh()

- Refreshes access token. Returns new session or null.

### auth.getAccessTokenForApi()

- Returns the token for `Authorization: Bearer` on `/salt` and other protected endpoints. Refreshes
  if expired. Use only Bearer auth; no body-based token auth.
- Returns `undefined` for wallet-only sessions. **Never use `session.access_token` directly**—it may
  be the sentinel `"wallet-only"` for wallet-only sessions. Always use `getAccessTokenForApi()` or
  check `session.session_access_token` before calling protected endpoints.

### auth.handleRedirectCallback(url?)

- For redirect mode. Parses URL for code/state/nonce, builds session from payload (no exchange).
  Omit `url` to use `window.location.href`.

### auth.onAuthStateChange(callback)

- Subscribe to session changes. Returns unsubscribe function.

### isWalletOnlySession(session)

- Returns `true` when the session has no API token (`session_access_token` or `refresh_token`).
- Use before calling protected endpoints: `if (isWalletOnlySession(session)) { /* redirect to full auth */ }`

### Wallet address

Use `session.user.address` (0x...) for the wallet address. Do not use `code`, `salt`, or id_token:

```typescript
const session = await auth.getSession();
const address = session?.user?.address; // Wallet address
```

### Keypair derivation and salt service

Apps that need to derive an Ed25519 keypair client-side for signing blockchain transactions (e.g.
profile creation) can use the session's token and stable `sub` with the salt service.

**Session shape for keypair derivation:**

| Field                          | Description                                                                 |
| ------------------------------ | --------------------------------------------------------------------------- |
| `session.session_access_token` | JWT (30 min) for Bearer auth. Use for `Authorization: Bearer`.              |
| `session.access_token`        | OAuth token or `"wallet-only"` sentinel. **Never use directly for Bearer.** |
| `session.sub`                 | Stable user ID for keypair derivation (`user.sub ?? user.id`)                |
| `session.user.address`        | MySocial address (0x...); verify derived keypair matches                     |

Use `isWalletOnlySession(session)` to check if the session has API access.

**Flow:**

1. Get token: `const token = await auth.getAccessTokenForApi()` (refreshes if expired)
2. Fetch salt: `POST https://salt.testnet.mysocial.network/salt` with
   `Authorization: Bearer <token>`
3. Derive seed: `SHA256(sub + "_" + salt)[0:32]` (first 32 bytes of the hash)
4. Derive Ed25519 keypair from the seed and verify `derivedAddress === session.user.address`

**Example (Bearer auth only):**

```typescript
const token = await auth.getAccessTokenForApi();
if (!token) return;

const saltRes = await fetch('https://salt.testnet.mysocial.network/salt', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${token}`,
	},
});
const { salt } = await saltRes.json();

const session = await auth.getSession();
if (!session) return;
// Derive keypair (session.sub + salt) and verify address matches session.user.address
```

**Wallet-only sessions:**

When `session.session_access_token` is absent and there is no `refresh_token`, the session is
wallet-only (e.g. from Create/Import Wallet flow when the backend does not support wallet auth).
`getAccessTokenForApi()` returns `undefined` for wallet-only sessions. `session.access_token` is
the sentinel `"wallet-only"`—never use it as a Bearer token. **Wallet-only sessions cannot be used
for API calls like `/salt`.** Use `isWalletOnlySession(session)` or check `session.session_access_token`
before calling protected endpoints; redirect to full auth or show appropriate UI if wallet-only.

## Hosted UI Contract (auth.mysocial.network)

The SDK passes `return_origin`, `code_challenge_method: S256`, and `provider` in the login URL
params. `provider` is never empty: `'google'`, `'apple'`, `'facebook'`, `'twitch'`, or `'none'`
(home screen). The auth frontend generates PKCE server-side; the package does not send
code_challenge. `return_origin` must match the dApp's origin (`window.location.origin`) so the auth
server can post the auth result to the correct target. The auth server uses `return_origin` as the
`postMessage` targetOrigin when sending the result.

The popup page must call:

```javascript
window.opener.postMessage(payload, validatedTargetOrigin); // targetOrigin, NOT "*"
```

**Success payload (MYSOCIAL_AUTH_RESULT is the final result; no exchange needed):**

```json
{
	"type": "MYSOCIAL_AUTH_RESULT",
	"code": "...",
	"state": "...",
	"nonce": "...",
	"clientId": "...",
	"requestId": "...",
	"salt": "...",
	"user": { "address": "0x...", "id": "...", "sub": "...", "email": "...", "name": "..." },
	"access_token": "...",
	"session_access_token": "...",
	"refresh_token": "...",
	"expires_at": 0,
	"expires_in": 1800
}
```

Use `user.address` for the wallet. Do not use `code` or `salt` as the address.

`session_access_token` (JWT, 30 min) and `refresh_token` (opaque, 30 days) are used for the
session flow. Store them and use `Authorization: Bearer <session_access_token>` for API calls.
Optional: `salt`, `user`, `access_token`, `session_access_token`, `refresh_token`, `expires_at`,
`expires_in`.

The `user` object should include `sub` (stable OAuth/OIDC subject) when available for keypair
derivation. If only `id` is returned, the SDK uses `id` as the derivation identifier
(`session.sub = user.sub ?? user.id`).

**Wallet-only payload (MYSOCIAL_WALLET_RESULT - fallback when backend does not support wallet auth):**

```json
{
	"type": "MYSOCIAL_WALLET_RESULT",
	"address": "0x...",
	"source": "create",
	"mnemonic": "...",
	"privateKey": "..."
}
```

When `MYSOCIAL_WALLET_RESULT` is received, the SDK resolves with a wallet-only session:
`user.address` and `access_token: "wallet-only"` (sentinel; never use as Bearer). No
`session_access_token` or `refresh_token`. **Wallet-only sessions cannot be used for API calls like
`/salt`.** Check `session.session_access_token` or `isWalletOnlySession(session)` before calling
protected endpoints. `mnemonic` and `privateKey` are **never persisted** in the Session. Use the
opt-in `onWalletCredentials` callback in `signIn({ onWalletCredentials })` if you need them
ephemerally—handle immediately and never store.

**Error payload:**

```json
{
	"type": "MYSOCIAL_AUTH_ERROR",
	"error": "error_code_or_message",
	"state": "...",
	"clientId": "...",
	"requestId": "..."
}
```

`return_origin` must never be trusted from the query param. The backend must validate it against the
allowlist for `client_id`.

**Important:** The auth frontend and salt service handle the OAuth exchange internally. The package
does not call `/auth/exchange`. `MYSOCIAL_AUTH_RESULT` is the final result: `code` is the token.

## Backend Contract

- `POST ${apiBaseUrl}/auth/request` (optional): `{ client_id, redirect_uri, return_origin }` →
  `{ request_id }`
- `POST ${apiBaseUrl}/auth/refresh`: `{ refresh_token }` →
  `{ access_token, refresh_token?, expires_in, user? }`. 401 = revoked; 429 = rate limited (~10/min).
- `POST ${apiBaseUrl}/auth/logout`: `{ refresh_token }` (send when available to revoke server-side)

**Error handling:** 401 on refresh → clear tokens, redirect to login (`SessionRevokedError`). 429 →
retry with backoff (`RateLimitError`).

## Troubleshooting

### Popup stays open after login

If the popup does not close after successful authentication:

1. **`return_origin` mismatch** – The SDK sends `return_origin` (derived from
   `window.location.origin`) in the login URL. The auth server posts with this as the `postMessage`
   target. Ensure your dApp runs on the same origin you expect (e.g. `https://dripdrop.social` vs
   `https://www.dripdrop.social`).

2. **`authOrigin` mismatch** – The SDK's `authOrigin` must match the auth server's origin exactly
   (e.g. `https://auth.mysocial.network`, or `http://localhost:3000` for local development).

3. **`redirectUri` origin** – The `redirectUri` must be allowlisted per `clientId`. Its origin
   should match your dApp's origin for consistency.

## Security Notes

- **Tokens in browser storage** (session/localStorage) are XSS-risky. Prefer `storage: 'memory'`
  when possible. If using session storage, recommend short access tokens and refresh rotation.
- **Safari popup**: Call `signIn()` directly inside the click handler. Open popup immediately with
  `about:blank`, then set location once URL is ready.
