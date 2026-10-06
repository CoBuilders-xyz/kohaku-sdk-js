import { expect, test } from 'vitest';
import { Note } from '@cobuilders/kohaku-sdk/tornadocash';

test('creates a note without explicit preloading', async () => {
  const params = {
    nullifier: `0x${'01'.repeat(31)}`,
    secret: `0x${'02'.repeat(31)}`,
    symbol: 'eth',
    amount: '0.1',
    chainId: 1n,
  } as const;

  const note = await Note.create(params);

  expect(note).toMatchObject(params);
});
