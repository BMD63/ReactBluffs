import { describe, expect, it } from 'vitest';

import { GAME_MODE } from '@/entities/game-mode';
import {
  QUESTION_TYPE,
  type BooleanQuestion,
  type MultipleChoiceQuestion,
  type OpenTextQuestion,
} from '@/entities/question';

import { calculateCardScore } from './calculateCardScore';

const booleanCard: BooleanQuestion[] = [
  {
    id: 'q1',
    type: QUESTION_TYPE.BOOLEAN,
    gameMode: GAME_MODE.BLUFF,
    text: 'Question 1',
    correctAnswer: true,
  },
  {
    id: 'q2',
    type: QUESTION_TYPE.BOOLEAN,
    gameMode: GAME_MODE.BLUFF,
    text: 'Question 2',
    correctAnswer: false,
  },
];

const multipleChoiceCard: MultipleChoiceQuestion[] = [
  {
    id: 'mc1',
    type: QUESTION_TYPE.MULTIPLE_CHOICE,
    gameMode: GAME_MODE.MULTIPLE_CHOICE,
    text: 'Largest planet?',
    options: ['Earth', 'Jupiter', 'Saturn'],
    correctAnswer: 'Jupiter',
  },
  {
    id: 'mc2',
    type: QUESTION_TYPE.MULTIPLE_CHOICE,
    gameMode: GAME_MODE.MULTIPLE_CHOICE,
    text: 'CSS is used for?',
    options: ['Markup', 'Styling', 'Database'],
    correctAnswer: 'Styling',
  },
];
const openAnswerCard: OpenTextQuestion[] = [
  {
    id: 'oa1',
    type: QUESTION_TYPE.OPEN_TEXT,
    gameMode: GAME_MODE.OPEN_ANSWER,
    text: 'В какой группе играет Винс Кларк?',
    correctAnswers: ['erasure', 'эрейжа', 'эрежа'],
  },
];

describe('calculateCardScore', () => {
  it('calculates score for boolean questions', () => {
    const score = calculateCardScore(booleanCard, {
      q1: {
        answer: true,
        bonus: false,
      },
      q2: {
        answer: false,
        bonus: false,
      },
    });
    expect(score).toBe(2);
  });
  it('does not give points for wrong answers', () => {
    const score = calculateCardScore(booleanCard, {
      q1: {
        answer: false,
        bonus: false,
      },

      q2: {
        answer: true,
        bonus: false,
      },
    });

    expect(score).toBe(0);
  });

  it('doubles score for bonus answers', () => {
    const score = calculateCardScore(booleanCard, {
      q1: {
        answer: true,
        bonus: true,
      },

      q2: {
        answer: false,
        bonus: false,
      },
    });

    expect(score).toBe(3);
  });
  it('calculates score for multiple choice questions', () => {
    const score = calculateCardScore(multipleChoiceCard, {
      mc1: {
        answer: 'Jupiter',
      },
      mc2: {
        answer: 'Markup',
      },
    });

    expect(score).toBe(1);
  });
  it('calculates score for open answer questions with normalized answers', () => {
    const score = calculateCardScore(openAnswerCard, {
      oa1: {
        answer: '  ERASURE! ',
      },
    });

    expect(score).toBe(1);
  });
  it('accepts open answer aliases', () => {
    const score = calculateCardScore(openAnswerCard, {
      oa1: {
        answer: 'Эрёжа',
      },
    });

    expect(score).toBe(1);
  });
});
