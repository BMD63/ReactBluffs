export const DIFFICULTY = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard',
} as const;

export type Difficulty = (typeof DIFFICULTY)[keyof typeof DIFFICULTY];

type DifficultyConfig = {
  title: string;
  description: string;
  color: string;
  icon: string;
};

export const difficultyConfig: Record<Difficulty, DifficultyConfig> = {
  easy: {
    title: 'Легко',
    description: 'Быстрые и простые раунды',
    color: '#4caf50',
    icon: '🟢',
  },
  medium: {
    title: 'Средне',
    description: 'Оптимальный баланс',
    color: '#ff9800',
    icon: '🟡',
  },
  hard: {
    title: 'Сложно',
    description: 'Максимальный челлендж',
    color: '#f44336',
    icon: '🔴',
  },
};
