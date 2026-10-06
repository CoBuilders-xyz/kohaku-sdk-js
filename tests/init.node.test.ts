import { expect, test } from 'vitest';
import { init } from '@cobuilders/kohaku-sdk/tornadocash';

test('loads in Node', async () => {
  await expect(init()).resolves.toBeUndefined();
});
