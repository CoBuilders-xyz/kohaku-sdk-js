import { ensureRuntime, type Hex, type NoteString } from '#tornadocash-runtime';

export interface NoteParams {
  /** 31-byte, 0x-prefixed hex string. */
  nullifier: Hex;
  /** 31-byte, 0x-prefixed hex string. */
  secret: Hex;
  symbol: string;
  amount: string;
  chainId: bigint;
}

export class Note {
  private constructor(private readonly bindings: NoteString) {}

  static async create(params: NoteParams): Promise<Note> {
    const runtime = await ensureRuntime();
    const note = new runtime.Note(params.nullifier, params.secret);
    const bindings = new runtime.NoteString(
      note,
      params.symbol,
      params.amount,
      params.chainId,
    );

    return new Note(bindings);
  }

  get nullifier(): Hex {
    return this.bindings.nullifier;
  }

  get secret(): Hex {
    return this.bindings.secret;
  }

  get symbol(): string {
    return this.bindings.symbol;
  }

  get amount(): string {
    return this.bindings.amount;
  }

  get chainId(): bigint {
    return this.bindings.chainId;
  }
}
