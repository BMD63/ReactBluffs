import { describe, expect, it } from 'vitest';

import { isAnswerAccepted } from './isAnswerAccepted';

describe('isAnswerAccepted', () => {
  it('accepts exact answer', () => {
    expect(
      isAnswerAccepted({
        userAnswer: 'Erasure',
        correctAnswers: ['erasure'],
      })
    ).toBe(true);
  });

  it('accepts normalized answer', () => {
    expect(
      isAnswerAccepted({
        userAnswer: '  ERASURE! ',
        correctAnswers: ['erasure'],
      })
    ).toBe(true);
  });

  it('rejects wrong answer', () => {
    expect(
      isAnswerAccepted({
        userAnswer: 'depeche mode',
        correctAnswers: ['erasure'],
      })
    ).toBe(false);
  });

  it('accepts one replaced letter', () => {
    expect(
      isAnswerAccepted({
        userAnswer: 'дастоевский',
        correctAnswers: ['достоевский'],
      })
    ).toBe(true);
  });
});
