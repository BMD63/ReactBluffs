import type {
  CreateQuestionDto,
  GetQuestionsParams,
  GetQuestionsResponse,
  UpdateQuestionDto,
} from './questionApi.types';

import { API_BASE_URL, API_ENDPOINTS } from '@/shared/config/api';

import { mapQuestionDtosToQuestions } from './questionMapper';

export const httpQuestionApi = {
  async getQuestions(
    params: GetQuestionsParams
  ): Promise<GetQuestionsResponse> {
    const searchParams = new URLSearchParams({
      gameMode: params.gameMode,
    });

    if (params.category) {
      searchParams.set('category', params.category);
    }
    const response = await fetch(
      `${API_BASE_URL}${API_ENDPOINTS.QUESTIONS}?${searchParams.toString()}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch questions');
    }

    const data = await response.json();

    return mapQuestionDtosToQuestions(data);
  },

  async createQuestion(_question: CreateQuestionDto): Promise<void> {
    throw new Error('HTTP API is not implemented yet');
  },

  async updateQuestion(
    _id: string,
    _question: UpdateQuestionDto
  ): Promise<void> {
    throw new Error('HTTP API is not implemented yet');
  },

  async deleteQuestion(_id: string): Promise<void> {
    throw new Error('HTTP API is not implemented yet');
  },
};
