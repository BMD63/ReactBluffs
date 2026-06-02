import type {
  CreateQuestionDto,
  GetQuestionsParams,
  GetQuestionsResponse,
  QuestionDto,
  UpdateQuestionDto,
} from './questionApi.types';

import { API_BASE_URL, API_ENDPOINTS } from '@/shared/config/api';

import { mapQuestionDtosToQuestions } from './questionMapper';

type AdminRequestParams = {
  adminToken: string;
};

const getAdminHeaders = (adminToken: string) => ({
  'Content-Type': 'application/json',
  'x-admin-token': adminToken,
});

const getErrorMessage = async (
  response: Response,
  fallbackMessage: string
): Promise<string> => {
  try {
    const errorData = await response.json();

    return errorData.error ?? fallbackMessage;
  } catch {
    return fallbackMessage;
  }
};

const getQuestionsUrl = (params?: GetQuestionsParams): string => {
  const url = `${API_BASE_URL}${API_ENDPOINTS.QUESTIONS}`;

  if (!params) {
    return url;
  }

  const searchParams = new URLSearchParams({
    gameMode: params.gameMode,
  });

  if (params.category) {
    searchParams.set('category', params.category);
  }

  return `${url}?${searchParams.toString()}`;
};

export const httpQuestionApi = {
  async getQuestions(
    params: GetQuestionsParams
  ): Promise<GetQuestionsResponse> {
    const response = await fetch(getQuestionsUrl(params));

    if (!response.ok) {
      throw new Error('Failed to fetch questions');
    }

    const data = await response.json();

    return mapQuestionDtosToQuestions(data);
  },

  async getQuestionDtos(params: GetQuestionsParams): Promise<QuestionDto[]> {
    const response = await fetch(getQuestionsUrl(params));
    if (!response.ok) {
      throw new Error('Failed to fetch question dtos');
    }

    return response.json();
  },

  async createQuestion(
    question: CreateQuestionDto,
    { adminToken }: AdminRequestParams
  ): Promise<QuestionDto> {
    const response = await fetch(getQuestionsUrl(), {
      method: 'POST',
      headers: getAdminHeaders(adminToken),
      body: JSON.stringify(question),
    });

    if (!response.ok) {
      throw new Error(
        await getErrorMessage(response, 'Failed to create question')
      );
    }

    return response.json();
  },

  async updateQuestion(
    _id: string,
    question: UpdateQuestionDto,
    { adminToken }: AdminRequestParams
  ): Promise<QuestionDto> {
    const response = await fetch(getQuestionsUrl(), {
      method: 'PUT',
      headers: getAdminHeaders(adminToken),
      body: JSON.stringify(question),
    });

    if (!response.ok) {
      throw new Error(
        await getErrorMessage(response, 'Failed to update question')
      );
    }

    return response.json();
  },

  async deleteQuestion(
    id: string,
    { adminToken }: AdminRequestParams
  ): Promise<void> {
    const searchParams = new URLSearchParams({
      id,
    });

    const response = await fetch(
      `${API_BASE_URL}${API_ENDPOINTS.QUESTIONS}?${searchParams.toString()}`,
      {
        method: 'DELETE',
        headers: {
          'x-admin-token': adminToken,
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        await getErrorMessage(response, 'Failed to delete question')
      );
    }
  },
};
