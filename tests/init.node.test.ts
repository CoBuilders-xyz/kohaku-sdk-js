import { expect, test } from 'vitest';
import { loadTornadoCash } from '@cobuilders/kohaku-sdk/tornadocash';

test('loads in Node', async () => {
  await expect(loadTornadoCash()).resolves.toBeUndefined();
});
