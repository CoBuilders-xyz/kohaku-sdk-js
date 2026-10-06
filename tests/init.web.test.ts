import { expect, test } from 'vitest';
import { loadTornadoCash } from '@cobuilders/kohaku-sdk/tornadocash';

test('loads in a browser', async () => {
  await expect(loadTornadoCash()).resolves.toBeUndefined();
});
