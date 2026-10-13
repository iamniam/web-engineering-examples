import assert from 'node:assert/strict';
import { test } from 'node:test';
import { failure, mapResult, success, unwrapOr } from '../src/result.ts';

test('success records a typed value', () => {
  assert.deepEqual(success(7), { ok: true, value: 7 });
});

test('failure records a typed error', () => {
  assert.deepEqual(failure('missing'), { ok: false, error: 'missing' });
});

test('mapping runs only on a successful value', () => {
  assert.deepEqual(mapResult(success(3), value => value + 2), success(5));
});

test('mapping preserves errors without invoking the transform', () => {
  let invoked = false;
  const original = failure('missing');
  const mapped = mapResult(original, (_value: number) => {
    invoked = true;
    return 'unreachable';
  });
  assert.equal(mapped, original);
  assert.equal(invoked, false);
});

test('unwrapOr selects the result value or fallback', () => {
  assert.equal(unwrapOr(success('ready'), 'pending'), 'ready');
  assert.equal(unwrapOr(failure('missing'), 'pending'), 'pending');
});

test('transform errors remain visible to callers', () => {
  assert.throws(() => mapResult(success(1), () => { throw new TypeError('invalid'); }), TypeError);
});
