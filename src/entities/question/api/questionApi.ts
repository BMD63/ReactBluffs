import { questions } from '../model/questions';

import type {
  GetQuestionsParams,
  GetQuestionsResponse,
} from './questionApi.types';

export const questionApi = {
  async getQuestions(
    _params: GetQuestionsParams
  ): Promise<GetQuestionsResponse> {
    return questions;
  },
};