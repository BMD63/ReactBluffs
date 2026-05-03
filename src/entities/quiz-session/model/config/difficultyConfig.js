export const DIFFICULTY = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard',
};

export const difficultyConfig = {
  easy: {
    title: 'Легко',
    description: 'Быстрые и простые раунды',
    questionsPerCard: 3,
    manualCardsCount: 2,
    color: '#4caf50',
    icon: '🟢',
  },
  medium: {
    title: 'Средне',
    description: 'Оптимальный баланс',
    questionsPerCard: 5,
    manualCardsCount: 4,
    color: '#ff9800',
    icon: '🟡',
  },
  hard: {
    title: 'Сложно',
    description: 'Максимальный челлендж',
    questionsPerCard: 7,
    manualCardsCount: 7,
    color: '#f44336',
    icon: '🔴',
  },
};

