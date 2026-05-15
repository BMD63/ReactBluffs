import { bluffQuestionDtos } from './bluffQuestionDtos';
import { multipleChoiceQuestionDtos } from './multipleChoiceQuestionDtos';
import { openAnswerQuestionDtos } from './openAnswerQuestionDtos';

export const questionDtos = [
  ...bluffQuestionDtos,
  ...multipleChoiceQuestionDtos,
  ...openAnswerQuestionDtos,
];