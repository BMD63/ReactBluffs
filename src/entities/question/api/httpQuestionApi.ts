import type {
  CreateQuestionDto,
  GetQuestionsParams,
  GetQuestionsResponse,
  UpdateQuestionDto,
} from './questionApi.types';

export const httpQuestionApi = {
  async getQuestions(
    _params: GetQuestionsParams
  ): Promise<GetQuestionsResponse> {
    throw new Error('HTTP API is not implemented yet');
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
