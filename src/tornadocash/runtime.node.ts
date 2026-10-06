/** Load and initialize Tornado Cash WASM. Safe to call more than once. */
export async function init(): Promise<void> {
  await import('@cobuilders/kohaku-tornadocash-wasm/node');
}
