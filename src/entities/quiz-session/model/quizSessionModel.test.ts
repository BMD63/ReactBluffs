import { describe, expect, it } from 'vitest';

import { applyQuestionAnswer } from './quizSessionModel';

describe('applyQuestionAnswer', () => {
  it('adds text answer to card answers', () => {
    expect(applyQuestionAnswer({}, 'question-1', 'React')).toEqual({
      'question-1': {
        answer: 'React',
      },
    });
  });

  it('adds boolean answer with default bonus value', () => {
    expect(applyQuestionAnswer({}, 'question-1', true)).toEqual({
      'question-1': {
        answer: true,
        bonus: false,
      },
    });
  });

  it('preserves existing answers', () => {
    expect(
      applyQuestionAnswer(
        {
          'question-1': {
            answer: 'React',
          },
        },
        'question-2',
        false
      )
    ).toEqual({
      'question-1': {
        answer: 'React',
      },
      'question-2': {
        answer: false,
        bonus: false,
      },
    });
  });
});
