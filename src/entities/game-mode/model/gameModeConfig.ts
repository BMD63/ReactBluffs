import {
  GAME_MODE,
  type GameMode,
} from './gameModes';

type GameModeConfig = {
  title: string;
  description: string;
  icon: string;
  isAvailable: boolean;
  hasDifficulty: boolean;
  hasBonus: boolean;
  rules: string[];
};

export const gameModeConfig: Record<
  GameMode,
  GameModeConfig
> = {
  [GAME_MODE.BLUFF]: {
    title: 'Bluff Quiz',
    description:
      'Отвечайте «да» или «нет» и пытайтесь запутать соперников.',
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
  },

  [GAME_MODE.MULTIPLE_CHOICE]: {
    title: 'Multiple Choice',
    description:
      'Выберите один правильный ответ из нескольких.',
    icon: '🧠',
    isAvailable: true,
    hasDifficulty: true,
    hasBonus: false,
    rules: [
      'В каждом вопросе выберите один вариант ответа.',
      'За каждый правильный ответ начисляется 1 балл.',
      'Бонусные баллы в этом режиме не используются.',
    ],
  },

  [GAME_MODE.OPEN_ANSWER]: {
    title: 'Open Answer',
    description:
      'Текстовые, визуальные и аудио-вопросы.',
    icon: '🎧',
    isAvailable: false,
    hasDifficulty: true,
    hasBonus: false,
    rules: [
      'В этом режиме нужно будет вводить ответ самостоятельно.',
      'Позже появятся текстовые, визуальные и аудио-вопросы.',
    ],
  },
};