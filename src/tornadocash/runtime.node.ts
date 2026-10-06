export function ensureRuntime() {
  return import('@cobuilders/kohaku-tornadocash-wasm/node');
}

/** Preload Tornado Cash WASM. Safe to call more than once. */
export async function loadTornadoCash(): Promise<void> {
  await ensureRuntime();
}
