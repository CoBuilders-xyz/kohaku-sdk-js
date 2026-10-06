# kohaku-sdk-js

JavaScript and TypeScript SDK for Kohaku tools, published as a single package:
`@cobuilders/kohaku-sdk`.

The initial module lives in `src/tornadocash/`, with its public entry point at
`@cobuilders/kohaku-sdk/tornadocash`. It exports `Note` and `loadTornadoCash()`.

Create, format, and recover a note in Node or a browser:

```ts
import { Note } from '@cobuilders/kohaku-sdk/tornadocash';

// Fixed secrets for demonstration only.
const note = await Note.create({
  nullifier: `0x${'01'.repeat(31)}`,
  secret: `0x${'02'.repeat(31)}`,
  symbol: 'eth',
  amount: '0.1',
  chainId: 1n,
});

console.log(note.symbol, note.amount, note.chainId);

const text = note.toString();
const recovered = await Note.parse(text);
console.log(recovered.symbol, recovered.amount, recovered.chainId);
```

`Note.create()` and `Note.parse()` load WASM automatically. The note exposes read-only getters
for `nullifier`, `secret`, `symbol`, `amount`, and `chainId`.
`note.toString()` formats it as a standard Tornado note.
`Note.parse(text)` recovers a note from that format.

The note also exposes synchronous operations backed by WASM:

- `preimage()`: the 62-byte nullifier and secret concatenation as hex.
- `commitment()`: the note's commitment as hex.
- `nullifierHash()`: the nullifier hash as hex; this does not check whether the note has been spent.

Optionally preload Tornado Cash:

```ts
import { loadTornadoCash } from '@cobuilders/kohaku-sdk/tornadocash';

await loadTornadoCash();
```

The SDK selects the Node or web bindings using conditional package imports.
WASM loads on the first call. Node caches the imported module. In browsers, the
SDK shares one initialization promise between calls and allows a later retry
if the WASM download fails.

The internal `ensureRuntime()` returns initialized bindings. `Note.create()`
and `Note.parse()` use it automatically; all notes share the same runtime.

Browser apps need a bundler that resolves package imports and serves the
bindings' generated WASM URL, or an import map and HTTP server.

Development:

```sh
npm ci
npm run typecheck
npm run build
```

Vitest checks loading and the create-format-parse flow in Node and real Chromium.
Browser serving and lifecycle are managed by Vitest's Playwright provider.

```sh
npm exec playwright install chromium
npm test
```

The SDK pins `@cobuilders/kohaku-tornadocash-wasm` to `0.1.0-dev.0`. Binding
updates will be explicit and tested; the SDK has its own versioning.

The first functional milestone covers creating, formatting, and recovering a
note using only the SDK. Random generation will follow.

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
