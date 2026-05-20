import { QUESTION_TYPE, type Question } from '../model/questionTypes';

import type { OpenTextQuestionDto, QuestionDto } from './questionApi.types';

const mapOpenTextQuestionDto = (questionDto: OpenTextQuestionDto): Question => {
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
      return mapOpenTextQuestionDto(questionDto);

    default:
      return questionDto;
  }
};

export const mapQuestionDtosToQuestions = (
  questionDtos: QuestionDto[]
): Question[] => {
  return questionDtos.map(mapQuestionDtoToQuestion);
};
