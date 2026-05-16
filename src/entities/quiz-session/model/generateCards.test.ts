import { describe, expect, it } from 'vitest';

import { generateCards } from './generateCards';

import { QUESTION_TYPE, type BooleanQuestion } from '@/entities/question';

import { GAME_MODE } from '@/entities/game-mode';

const questions: BooleanQuestion[] = [
  {
    id: '1',
    type: QUESTION_TYPE.BOOLEAN,
    gameMode: GAME_MODE.BLUFF,
    text: 'Question 1',
    correctAnswer: true,
  },

  {
    id: '2',
    type: QUESTION_TYPE.BOOLEAN,
    gameMode: GAME_MODE.BLUFF,
    text: 'Question 2',
    correctAnswer: false,
  },

  {
    id: '3',
    type: QUESTION_TYPE.BOOLEAN,
    gameMode: GAME_MODE.BLUFF,
    text: 'Question 3',
    correctAnswer: true,
  },

  {
    id: '4',
    type: QUESTION_TYPE.BOOLEAN,
    gameMode: GAME_MODE.BLUFF,
    text: 'Question 4',
    correctAnswer: false,
  },
];

describe('generateCards', () => {
  it('splits questions into cards', () => {
    const cards = generateCards(questions, {
      questionsPerCard: 2,
      manualCardsCount: 2,
    });

    expect(cards).toHaveLength(2);

    expect(cards[0]).toHaveLength(2);
    expect(cards[1]).toHaveLength(2);
  });
  it('does not create more cards than possible', () => {
    const cards = generateCards(questions, {
      questionsPerCard: 3,
      manualCardsCount: 10,
    });

    expect(cards).toHaveLength(1);
  });
  it('does not mutate original questions array', () => {
    const originalQuestionIds = questions.map((question) => question.id);

    generateCards(questions, {
      questionsPerCard: 2,
      manualCardsCount: 2,
    });

    expect(questions.map((question) => question.id)).toEqual(
      originalQuestionIds
    );
  });
});
