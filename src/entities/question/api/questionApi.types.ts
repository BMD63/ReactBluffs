import type { GameMode } from '@/entities/game-mode';
import type { QuestionType } from '../model/questionTypes';
import type { Question } from '../model/questionTypes';

type BaseQuestionDto = {
  id: string;
  type: QuestionType;
  gameMode: GameMode;
  text: string;
  category?: string;
  media?: QuestionMediaDto;
};

export type BooleanQuestionDto = BaseQuestionDto & {
  type: 'boolean';
  gameMode: 'bluff';
  correctAnswer: boolean;
};

export type MultipleChoiceQuestionDto = BaseQuestionDto & {
  type: 'multipleChoice';
  gameMode: 'multipleChoice';
  options: string[];
  correctAnswer: string;
};

export type OpenTextQuestionDto = BaseQuestionDto & {
  type: 'openText';
  gameMode: 'openAnswer';
  answer: string;
  aliases?: string[];
};

export type ImageQuestionDto = BaseQuestionDto & {
  type: 'image';
  gameMode: 'openAnswer';
  answer: string;
  aliases?: string[];
  media: {
    type: 'image';
    url: string;
    alt?: string;
  };
};

export type AudioQuestionDto = BaseQuestionDto & {
  type: 'audio';
  gameMode: 'openAnswer';
  answer: string;
  aliases?: string[];
  media: {
    type: 'audio';
    url: string;
    alt?: string;
  };
};

export type QuestionDto =
  | BooleanQuestionDto
  | MultipleChoiceQuestionDto
  | OpenTextQuestionDto
  | ImageQuestionDto
  | AudioQuestionDto;

export type QuestionMediaDto = {
  type: 'image' | 'audio';
  url: string;
  alt?: string;
};

export type GetQuestionsParams = {
  gameMode: GameMode;
  category?: string;
};

export type GetQuestionsResponse = Question[];

export type CreateQuestionDto = Omit<QuestionDto, 'id'>;

export type UpdateQuestionDto = Partial<CreateQuestionDto>;
