import type { Question } from '../model/questionTypes';
import type { QuestionDto } from './questionApi.types';

export const mapQuestionDtoToQuestion = (
  questionDto: QuestionDto
): Question => {
  return questionDto;
};

export const mapQuestionDtosToQuestions = (
  questionDtos: QuestionDto[]
): Question[] => {
  return questionDtos.map(mapQuestionDtoToQuestion);
};