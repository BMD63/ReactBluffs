import type { GameMode } from '@/entities/game-mode';

export const QUESTION_TYPE = {
  BOOLEAN: 'boolean',
  MULTIPLE_CHOICE: 'multipleChoice',
  OPEN_TEXT: 'openText',
  IMAGE: 'image',
  AUDIO: 'audio',
} as const;

export type QuestionType = (typeof QUESTION_TYPE)[keyof typeof QUESTION_TYPE];

type BaseQuestion = {
  id: string;
  type: QuestionType;
  gameMode: GameMode;
  text: string;
};

export type BooleanQuestion = BaseQuestion & {
  type: typeof QUESTION_TYPE.BOOLEAN;
  gameMode: 'bluff';
  correctAnswer: boolean;
};

export type MultipleChoiceQuestion = BaseQuestion & {
  type: typeof QUESTION_TYPE.MULTIPLE_CHOICE;
  gameMode: 'multipleChoice';
  options: string[];
  correctAnswer: string;
};

export type OpenTextQuestion = BaseQuestion & {
  type: typeof QUESTION_TYPE.OPEN_TEXT;
  gameMode: 'openAnswer';
  correctAnswers: string[];
};

export type QuestionMedia = {
  type: 'image' | 'audio';
  url: string;
  alt?: string;
};

export type ImageQuestion = BaseQuestion & {
  type: typeof QUESTION_TYPE.IMAGE;
  gameMode: 'openAnswer';
  media: QuestionMedia & { type: 'image' };
  correctAnswers: string[];
};

export type AudioQuestion = BaseQuestion & {
  type: typeof QUESTION_TYPE.AUDIO;
  gameMode: 'openAnswer';
  media: QuestionMedia & { type: 'audio' };
  correctAnswers: string[];
};

export type Question =
  | BooleanQuestion
  | MultipleChoiceQuestion
  | OpenTextQuestion
  | ImageQuestion
  | AudioQuestion;
