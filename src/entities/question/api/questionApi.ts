import { questions } from '../model/questions';
import type { GetQuestionsResponse } from './questionApi.types';

export const questionApi = {
  async getQuestions(): Promise<GetQuestionsResponse> {
    return questions;
  },
};