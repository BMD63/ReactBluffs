import { questionDtos } from '../model/questionDtos';

import {
  mapQuestionDtosToQuestions,
} from './questionMapper';

import type {
  GetQuestionsParams,
  GetQuestionsResponse,
  CreateQuestionDto,
  UpdateQuestionDto,
} from './questionApi.types';

export const questionApi = {
  async getQuestions(
    params: GetQuestionsParams
  ): Promise<GetQuestionsResponse> {
    const filteredQuestions = questionDtos.filter(
      (question) =>
        question.gameMode === params.gameMode
    );

    return mapQuestionDtosToQuestions(
      filteredQuestions
    );
  },

    async createQuestion(
    _question: CreateQuestionDto
  ): Promise<void> {
    throw new Error('createQuestion is not implemented yet');
  },

  async updateQuestion(
    _id: string,
    _question: UpdateQuestionDto
  ): Promise<void> {
    throw new Error('updateQuestion is not implemented yet');
  },

  async deleteQuestion(
    _id: string
  ): Promise<void> {
    throw new Error('deleteQuestion is not implemented yet');
  },
};

