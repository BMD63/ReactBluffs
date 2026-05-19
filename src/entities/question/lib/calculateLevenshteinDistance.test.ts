import { describe, expect, it } from 'vitest';

import { calculateLevenshteinDistance } from './calculateLevenshteinDistance';

describe('calculateLevenshteinDistance', () => {
  it('returns 0 for equal strings', () => {
    expect(calculateLevenshteinDistance('луна', 'луна')).toBe(0);
  });

  it('counts one extra letter', () => {
    expect(calculateLevenshteinDistance('лунна', 'луна')).toBe(1);
  });

  it('counts one replaced letter', () => {
    expect(calculateLevenshteinDistance('луна', 'лиса')).toBe(2);
  });

  it('counts multiple edits', () => {
    expect(calculateLevenshteinDistance('булкакова', 'булгаков')).toBe(2);
  });
});
