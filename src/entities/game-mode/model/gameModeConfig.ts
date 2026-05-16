import { GAME_MODE, type GameMode } from './gameModes';
import type { Difficulty } from '@/entities/quiz-session';

type DifficultySettings = {
  questionsPerCard: number;
  manualCardsCount: number;
};

type DifficultyConfig = Record<Difficulty, DifficultySettings>;

type GameModeConfig = {
  title: string;
  description: string;
  icon: string;
  isAvailable: boolean;
  hasDifficulty: boolean;
  hasBonus: boolean;
  rules: string[];
  difficulty: DifficultyConfig;
};

export const gameModeConfig: Record<GameMode, GameModeConfig> = {
  [GAME_MODE.BLUFF]: {
    title: 'Bluff Quiz',
    description: 'Отвечайте «да» или «нет» и пытайтесь запутать соперников.',
    icon: '🎭',
    isAvailable: true,
    hasDifficulty: true,
    hasBonus: true,
    rules: [
      'В каждом раунде отвечайте на вопросы «да» или «нет».',
      'За каждый правильный ответ начисляется 1 балл.',
      'Можно выбрать до 3 бонусных ответов за раунд.',
      'Если бонусный ответ оказался правильным, он даёт дополнительный балл.',
    ],
    difficulty: {
      easy: {
        questionsPerCard: 3,
        manualCardsCount: 2,
      },

      medium: {
        questionsPerCard: 5,
        manualCardsCount: 4,
      },

      hard: {
        questionsPerCard: 7,
        manualCardsCount: 7,
      },
    },
  },

  [GAME_MODE.MULTIPLE_CHOICE]: {
    title: 'Multiple Choice',
    description: 'Выберите один правильный ответ из нескольких.',
    icon: '🧠',
    isAvailable: true,
    hasDifficulty: true,
    hasBonus: false,
    rules: [
      'В каждом вопросе выберите один вариант ответа.',
      'За каждый правильный ответ начисляется 1 балл.',
      'Бонусные баллы в этом режиме не используются.',
    ],
    difficulty: {
      easy: {
        questionsPerCard: 7,
        manualCardsCount: 1,
      },

      medium: {
        questionsPerCard: 7,
        manualCardsCount: 2,
      },

      hard: {
        questionsPerCard: 8,
        manualCardsCount: 3,
      },
    },
  },

  [GAME_MODE.OPEN_ANSWER]: {
    title: 'Open Answer',
    description: 'Текстовые, визуальные и аудио-вопросы.',
    icon: '🎧',
    isAvailable: true,
    hasDifficulty: true,
    hasBonus: false,
    rules: [
      'В этом режиме нужно будет вводить ответ самостоятельно.',
      'Позже появятся текстовые, визуальные и аудио-вопросы.',
    ],
    difficulty: {
      easy: {
        questionsPerCard: 3,
        manualCardsCount: 1,
      },

      medium: {
        questionsPerCard: 5,
        manualCardsCount: 2,
      },

      hard: {
        questionsPerCard: 7,
        manualCardsCount: 3,
      },
    },
  },
};
