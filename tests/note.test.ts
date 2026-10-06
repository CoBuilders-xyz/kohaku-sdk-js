import { expect, test } from 'vitest';
import { Note } from '@cobuilders/kohaku-sdk/tornadocash';

test('creates, formats, and recovers a note without explicit preloading', async () => {
  const params = {
    nullifier: `0x${'01'.repeat(31)}`,
    secret: `0x${'02'.repeat(31)}`,
    symbol: 'eth',
    amount: '0.1',
    chainId: 1n,
  } as const;

  const note = await Note.create(params);
  const text = note.toString();
  const recovered = await Note.parse(text);

  expect(note).toMatchObject(params);
  expect(text).toBe(`tornado-eth-0.1-1-0x${'01'.repeat(31)}${'02'.repeat(31)}`);
  expect(recovered).toMatchObject(params);
  expect(recovered.toString()).toBe(text);
  expect(note.preimage()).toBe(`0x${'01'.repeat(31)}${'02'.repeat(31)}`);
  expect(note.commitment()).toMatch(/^0x[0-9a-f]{64}$/);
  expect(note.nullifierHash()).toMatch(/^0x[0-9a-f]{64}$/);
});
