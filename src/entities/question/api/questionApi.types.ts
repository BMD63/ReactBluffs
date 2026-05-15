import type { GameMode } from '@/entities/game-mode';
import type {
  QuestionType,
} from '../model/questionTypes';
import type { Question } from '../model/questionTypes';

type BaseQuestionDto = {
  id: string;
  type: QuestionType;
  gameMode: GameMode;
  text: string;
};

export type BooleanQuestionDto =
  BaseQuestionDto & {
    type: 'boolean';
    gameMode: 'bluff';
    correctAnswer: boolean;
  };

export type MultipleChoiceQuestionDto =
  BaseQuestionDto & {
    type: 'multipleChoice';
    gameMode: 'multipleChoice';
    options: string[];
    correctAnswer: string;
  };

export type OpenTextQuestionDto =
  BaseQuestionDto & {
    type: 'openText';
    gameMode: 'openAnswer';
    correctAnswers: string[];
  };

export type ImageQuestionDto =
  BaseQuestionDto & {
    type: 'image';
    gameMode: 'openAnswer';
    imageUrl: string;
    correctAnswers: string[];
  };

export type AudioQuestionDto =
  BaseQuestionDto & {
    type: 'audio';
    gameMode: 'openAnswer';
    audioUrl: string;
    correctAnswers: string[];
  };

export type QuestionDto =
  | BooleanQuestionDto
  | MultipleChoiceQuestionDto
  | OpenTextQuestionDto
  | ImageQuestionDto
  | AudioQuestionDto;

export type GetQuestionsParams = {
  gameMode: GameMode;
};

export type GetQuestionsResponse = Question[];

export type CreateQuestionDto = Omit<
  QuestionDto,
  'id'
>;

export type UpdateQuestionDto =
  Partial<CreateQuestionDto>;