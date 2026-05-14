export { questionApi } from './api/questionApi';

export {
  mapQuestionDtoToQuestion,
  mapQuestionDtosToQuestions,
} from './api/questionMapper';

export type {
  AudioQuestionDto,
  BooleanQuestionDto,
  CreateQuestionDto,
  GetQuestionsParams,
  GetQuestionsResponse,
  ImageQuestionDto,
  MultipleChoiceQuestionDto,
  OpenTextQuestionDto,
  QuestionDto,
  UpdateQuestionDto,
} from './api/questionApi.types';

export {
  QUESTION_TYPE,
} from './model/questionTypes';

export type {
  AudioQuestion,
  BooleanQuestion,
  ImageQuestion,
  MultipleChoiceQuestion,
  OpenTextQuestion,
  Question,
  QuestionType,
} from './model/questionTypes';

export type {
  BooleanQuestionAnswer,
  MultipleChoiceQuestionAnswer,
  OpenQuestionAnswer,
  QuestionAnswer,
} from './model/questionAnswerTypes';

export {
  calculateBooleanCardScore,
} from './lib/scoring/calculateBooleanCardScore';

export {
  calculateCardScore,
} from './lib/scoring/calculateCardScore';

export {
  calculateMultipleChoiceCardScore,
} from './lib/scoring/calculateMultipleChoiceCardScore';