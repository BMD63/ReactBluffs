export const DIFFICULTY = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard',
};

export const difficultyConfig = {
  [DIFFICULTY.EASY]: {
    questionsPerCard: 3,
    manualCardsCount: 2,
  },
  [DIFFICULTY.MEDIUM]: {
    questionsPerCard: 4,
    manualCardsCount: 3,
  },
  [DIFFICULTY.HARD]: {
    questionsPerCard: 7,
    manualCardsCount: 7,
  },
};