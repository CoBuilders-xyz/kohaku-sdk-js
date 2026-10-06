let initialization: Promise<void> | undefined;

async function initialize(): Promise<void> {
  const bindings = await import('@cobuilders/kohaku-tornadocash-wasm/web');
  await bindings.default();
}

/** Load and initialize Tornado Cash WASM. Safe to call more than once. */
export function init(): Promise<void> {
  initialization ??= initialize().catch((error) => {
    initialization = undefined;
    throw error;
  });

  return initialization;
}
