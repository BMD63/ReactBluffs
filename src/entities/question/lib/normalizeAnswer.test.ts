import { describe, expect, it } from 'vitest';

import { normalizeAnswer } from './normalizeAnswer';

describe('normalizeAnswer', () => {
  it('trims spaces', () => {
    expect(
      normalizeAnswer('  erasure  ')
    ).toBe('erasure');
  });
  it('converts answer to lowercase', () => {
  expect(
    normalizeAnswer('ERASURE')
  ).toBe('erasure');
});

it('replaces ё with е', () => {
  expect(
    normalizeAnswer('Эрёжа')
  ).toBe('эрежа');
});

it('removes punctuation', () => {
  expect(
    normalizeAnswer('Erasure!')
  ).toBe('erasure');
});

it('collapses multiple spaces', () => {
  expect(
    normalizeAnswer('depeche    mode')
  ).toBe('depeche mode');
});
});