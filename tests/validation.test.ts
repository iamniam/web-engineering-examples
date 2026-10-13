import assert from 'node:assert/strict';
import { test } from 'node:test';
import { isApprovedRedirect, parsePositiveInteger } from '../src/validation.ts';

test('parses canonical positive integers', () => {
  assert.equal(parsePositiveInteger('1'), 1);
  assert.equal(parsePositiveInteger('42'), 42);
});

test('rejects malformed numbers', () => {
  for (const value of ['0', '-1', '+1', '01', ' 2 ', '2.0', '1e2', 'Infinity', '', 2, null]) {
    assert.equal(parsePositiveInteger(value), null);
  }
});

test('rejects out-of-range integers', () => {
  assert.equal(parsePositiveInteger('9007199254740992'), null);
  assert.equal(parsePositiveInteger('10', 9), null);
  assert.equal(parsePositiveInteger('9', 9), 9);
});

test('validates the configured upper bound', () => {
  for (const max of [0, -1, Number.POSITIVE_INFINITY, Number.NaN, 1.5]) {
    assert.throws(() => parsePositiveInteger('1', max), RangeError);
  }
});

test('allows an absolute HTTPS URL on an approved origin', () => {
  assert.equal(isApprovedRedirect('https://app.example/next?source=home', 'https://app.example'), true);
});

test('rejects cross-origin or deceptive addresses', () => {
  const allowed = 'https://app.example';
  for (const url of [
    'https://app.example.evil.test/path',
    'https://app.example@evil.test/path',
    'https://evil.test/path',
    'https://app.example:444/path',
    'http://app.example/path',
    'javascript:alert(1)',
    '//app.example/path',
    '/relative',
    'not a url',
  ]) assert.equal(isApprovedRedirect(url, allowed), false, url);
});

test('rejects insecure or non-origin allowlist entries', () => {
  for (const allowed of [
    'http://app.example',
    'https://app.example/custom/path',
    'https://app.example/?query=1',
    'https://user:pass@app.example',
    'javascript:alert(1)',
    'not a URL',
  ]) assert.equal(isApprovedRedirect('https://app.example/next', allowed), false, allowed);
});

test('rejects destination credentials', () => {
  assert.equal(isApprovedRedirect('https://user:pass@app.example/next', 'https://app.example'), false);
});
