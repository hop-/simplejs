export namespace Variant {
  export type Ok = 'Ok';
  export type Err = 'Err';

  export const Value = {
    Ok: 'Ok' as Variant.Ok,
    Err: 'Err' as Variant.Err,
  };
}

export type Match<T, E extends Error, Res> = {
  Ok: (value: T) => Res,
  Err: (error: E) => Res,
}

type R<T, E extends Error> = [tag: Variant.Ok, value: T] | [tag: Variant.Err, error: E];

export class Result<T, E extends Error> {
  // eslint-disable-next-line no-useless-constructor, no-empty-function
  private constructor(private r: R<T, E>) {}

  static ok<Ti, Ei extends Error>(value: Ti): Result<Ti, Ei> {
    return new Result<Ti, Ei>([Variant.Value.Ok, value]);
  }

  static err<Ti, Ei extends Error>(error: Ei): Result<Ti, Ei> {
    return new Result<Ti, Ei>([Variant.Value.Err, error]);
  }

  get variant(): Variant.Ok | Variant.Err {
    return this.r[0];
  }

  get value(): T | never {
    if (this.r[0] === Variant.Value.Ok) {
      return this.r[1];
    }
    throw new Error('Cannot get the value');
  }

  get error(): E | never {
    if (this.r[0] === Variant.Value.Err) {
      return this.r[1];
    }
    throw new Error('Cannot get the Error');
  }

  match<Res>(matcher: Match<T, E, Res>): Res {
    switch (this.r[0]) {
      case Variant.Value.Ok:
        return matcher.Ok(this.r[1]);
      default: // case Variant.Value.Err:
        return matcher.Err(this.r[1]);
    }
  }
}
