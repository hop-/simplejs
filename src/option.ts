export namespace Variant {
  export type Some = 'Some';
  export type None = 'None';

  export const Value = {
    Some: 'Some' as Variant.Some,
    None: 'None' as Variant.None,
  };
}

export type Match<T, Res> = {
  Some: (value: T) => Res,
  None: () => Res,
}

type R<T> = [tag: Variant.Some, value: T] | [tag: Variant.None]

let NONE: any; // Option<unknown>

export class Option<T> {
  // eslint-disable-next-line no-useless-constructor, no-empty-function
  private constructor(private r: R<T>) {}

  static some<Ti>(value: Ti): Option<Ti> {
    return new Option([Variant.Value.Some, value]);
  }

  static none<Ti>(): Option<Ti> {
    if (!NONE) {
      NONE = new Option<unknown>([Variant.Value.None]);
    }
    return NONE as Option<Ti>;
  }

  static any<Ti>(value: Ti | undefined | null): Option<Ti> {
    if (value === null || value === undefined) {
      return Option.none<Ti>();
    }
    return Option.some(value);
  }

  get variant(): Variant.Some | Variant.None {
    return this.r[0];
  }

  get value(): T | never {
    if (this.r[0] === Variant.Value.None) {
      throw new Error('Cannot get the value of \'None\'');
    }
    return this.r[1];
  }

  isSome(): boolean {
    return this.r[0] === Variant.Value.Some;
  }

  isNone(): boolean {
    return this.r[0] === Variant.Value.None;
  }

  match<Res>(matcher: Match<T, Res>): Res {
    switch (this.r[0]) {
      case Variant.Value.Some:
        return matcher.Some(this.r[1]);
      default: // case Variant.Value.None:
        return matcher.None();
    }
  }
}
