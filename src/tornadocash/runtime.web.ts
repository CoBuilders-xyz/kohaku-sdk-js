export type { Hex, NoteString } from '@cobuilders/kohaku-tornadocash-wasm/web';

type Runtime = typeof import('@cobuilders/kohaku-tornadocash-wasm/web');

let initialization: Promise<Runtime> | undefined;

async function initialize(): Promise<Runtime> {
  const bindings = await import('@cobuilders/kohaku-tornadocash-wasm/web');
  await bindings.default();
  return bindings;
}

export function ensureRuntime(): Promise<Runtime> {
  initialization ??= initialize().catch((error) => {
    initialization = undefined;
    throw error;
  });

  return initialization;
}

/** Preload Tornado Cash WASM. Safe to call more than once. */
export async function loadTornadoCash(): Promise<void> {
  await ensureRuntime();
}
