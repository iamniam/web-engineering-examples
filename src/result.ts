/** A result makes the successful and unsuccessful cases explicit to callers. */
export type Result<Value, Failure> =
  | Readonly<{ ok: true; value: Value }>
  | Readonly<{ ok: false; error: Failure }>;

export function success<Value>(value: Value): Result<Value, never> {
  return { ok: true, value };
}

export function failure<Failure>(error: Failure): Result<never, Failure> {
  return { ok: false, error };
}

export function mapResult<Value, Next, Failure>(
  result: Result<Value, Failure>,
  transform: (value: Value) => Next,
): Result<Next, Failure> {
  if (!result.ok) return result;
  return success(transform(result.value));
}

export function unwrapOr<Value, Failure>(
  result: Result<Value, Failure>,
  fallback: Value,
): Value {
  return result.ok ? result.value : fallback;
}
