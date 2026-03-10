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
- Returns: `Promise<Session>` (popup) or never (redirect; page navigates)

### auth.signOut()

- Clears session and calls backend logout.

### auth.getSession()

- Returns current session, or null. Auto-refreshes if expired and refresh_token exists.

### auth.refresh()

- Refreshes access token. Returns new session or null.

### auth.handleRedirectCallback(url?)

- For redirect mode. Parses URL for code/state/nonce, builds session from payload (no exchange).
  Omit `url` to use `window.location.href`.

### auth.onAuthStateChange(callback)

- Subscribe to session changes. Returns unsubscribe function.

### Wallet address

Use `session.user.address` (0x...) for the wallet address. Do not use `code`, `salt`, or id_token:

```typescript
const session = await auth.getSession();
const address = session?.user?.address; // Wallet address
```

## Hosted UI Contract (auth.mysocial.network)

The SDK passes `return_origin`, `code_challenge_method: S256`, and `provider` in the login URL
params. `provider` is never empty: `'google'`, `'apple'`, `'facebook'`, `'twitch'`, or `'none'`
(home screen). The auth frontend generates PKCE server-side; the package does not send
code_challenge. `return_origin` must match the dApp's origin
(`window.location.origin`) so the auth server can post the auth result to the correct target.
The auth server uses `return_origin` as the `postMessage` targetOrigin when sending the result.

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
	"user": { "address": "0x...", "id": "...", "email": "...", "name": "..." },
	"access_token": "...",
	"refresh_token": "...",
	"expires_at": 0
}
```

Use `user.address` for the wallet. Do not use `code` or `salt` as the address.

`code` is the token. **Use `user.address` (0x...) for the wallet address**—do not use `code` or `salt` for that. Optional: `salt`, `user`, `access_token`, `refresh_token`, `expires_at`.

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
  `{ access_token, refresh_token?, expires_in, user }`
- `POST ${apiBaseUrl}/auth/logout`

## Troubleshooting

### Popup stays open after login

If the popup does not close after successful authentication:

1. **`return_origin` mismatch** – The SDK sends `return_origin` (derived from `window.location.origin`)
   in the login URL. The auth server posts with this as the `postMessage` target. Ensure your dApp
   runs on the same origin you expect (e.g. `https://dripdrop.social` vs `https://www.dripdrop.social`).

2. **`authOrigin` mismatch** – The SDK's `authOrigin` must match the auth server's origin exactly
   (e.g. `https://auth.mysocial.network`, or `http://localhost:3000` for local development).

3. **`redirectUri` origin** – The `redirectUri` must be allowlisted per `clientId`. Its origin
   should match your dApp's origin for consistency.

## Security Notes

- **Tokens in browser storage** (session/localStorage) are XSS-risky. Prefer `storage: 'memory'`
  when possible. If using session storage, recommend short access tokens and refresh rotation.
- **Safari popup**: Call `signIn()` directly inside the click handler. Open popup immediately with
  `about:blank`, then set location once URL is ready.
