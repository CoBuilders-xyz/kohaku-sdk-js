# kohaku-sdk-js

JavaScript and TypeScript SDK for Kohaku tools, published as a single package:
`@cobuilders/kohaku-sdk`.

The initial module lives in `src/tornadocash/`, with its public entry point at
`@cobuilders/kohaku-sdk/tornadocash`. It currently exports `init()`; the note API
will be added next.

Initialize Tornado Cash in Node or a browser:

```ts
import { init } from '@cobuilders/kohaku-sdk/tornadocash';

await init();
```

The SDK selects the Node or web bindings using conditional package imports.
WASM loads on the first call. Node caches the imported module. In browsers, the
SDK shares one initialization promise between calls and allows a later retry
if the WASM download fails.

Browser apps need a bundler that resolves package imports and serves the
bindings' generated WASM URL, or an import map and HTTP server.

Development:

```sh
npm ci
npm run typecheck
npm run build
```

Vitest runs one basic loading test in Node and one in real Chromium. Browser
serving and lifecycle are managed by Vitest's Playwright provider.

```sh
npm exec playwright install chromium
npm test
```

The SDK pins `@cobuilders/kohaku-tornadocash-wasm` to `0.1.0-dev.0`. Binding
updates will be explicit and tested; the SDK has its own versioning.

Next step: the note API. The first functional milestone is creating, formatting,
and recovering a note using only the SDK, with tests covering the complete flow.
Random generation will follow.

The package is private during setup. Distribution licensing is pending
clarification with Robert.

The original TypeScript SDK is the reference implementation:

- Repository: [ethereum/kohaku](https://github.com/ethereum/kohaku).
- Reference commit: `97b86f925a80ab749632470a09ca0784842327a9`.
- Local checkout: `../kohaku-ts-original/`, detached at that commit.
- Tornado Cash package: `packages/tornado-cash/` (`@kohaku-eth/tornado-cash`).

To reproduce the reference checkout from this repository:

```sh
git clone https://github.com/ethereum/kohaku.git ../kohaku-ts-original
git -C ../kohaku-ts-original checkout --detach 97b86f925a80ab749632470a09ca0784842327a9
```
