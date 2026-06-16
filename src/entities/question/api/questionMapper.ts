import { QUESTION_TYPE, type Question } from '../model/questionTypes';

import type {
  AudioQuestionDto,
  ImageQuestionDto,
  OpenTextQuestionDto,
  QuestionDto,
} from './questionApi.types';

type OpenAnswerQuestionDto =
  | OpenTextQuestionDto
  | ImageQuestionDto
  | AudioQuestionDto;

const mapOpenAnswerQuestionDto = (
  questionDto: OpenAnswerQuestionDto
): Question => {
  return {
    ...questionDto,
    correctAnswers: [questionDto.answer, ...(questionDto.aliases ?? [])],
  };
};

export const mapQuestionDtoToQuestion = (
  questionDto: QuestionDto
): Question => {
  switch (questionDto.type) {
    case QUESTION_TYPE.OPEN_TEXT:
    case QUESTION_TYPE.IMAGE:
    case QUESTION_TYPE.AUDIO:
      return mapOpenAnswerQuestionDto(questionDto);

    default:
      return questionDto;
  }
};

export const mapQuestionDtosToQuestions = (
  questionDtos: QuestionDto[]
): Question[] => {
  return questionDtos.map(mapQuestionDtoToQuestion);
};
