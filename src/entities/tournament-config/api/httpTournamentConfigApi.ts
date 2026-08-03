import type { TournamentConfig } from '../model/tournamentConfigTypes';
import type {
  AdminRequestParams,
  TournamentConfigApi,
} from './tournamentConfigApiTypes';
import {
  tournamentConfigDtoSchema,
  tournamentConfigDtosSchema,
} from './tournamentConfigApi.schema';
import { API_BASE_URL, API_ENDPOINTS } from '@/shared/config/api';

const getTournamentConfigsUrl = (configId?: string) => {
  const url = `${API_BASE_URL}${API_ENDPOINTS.TOURNAMENT_CONFIGS}`;

  if (!configId) {
    return url;
  }

  const searchParams = new URLSearchParams({
    id: configId,
  });

  return `${url}?${searchParams.toString()}`;
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

export const httpTournamentConfigApi: TournamentConfigApi = {
  async getConfigs(): Promise<TournamentConfig[]> {
    const response = await fetch(getTournamentConfigsUrl());

    if (!response.ok) {
      throw new Error('Failed to fetch tournament configs');
    }

    const data: unknown = await response.json();

    return tournamentConfigDtosSchema.parse(data);
  },

  async getConfig(configId: string): Promise<TournamentConfig | null> {
    const response = await fetch(getTournamentConfigsUrl(configId));

    if (!response.ok) {
      throw new Error(
        await getErrorMessage(response, 'Failed to fetch tournament config')
      );
    }

    const data: unknown = await response.json();

    if (data === null) {
      return null;
    }

    return tournamentConfigDtoSchema.parse(data);
  },

  async createConfig(
    config: TournamentConfig,
    { adminToken }: AdminRequestParams
  ): Promise<TournamentConfig> {
    const response = await fetch(getTournamentConfigsUrl(), {
      method: 'POST',
      headers: getAdminHeaders(adminToken),
      body: JSON.stringify(config),
    });

    if (!response.ok) {
      throw new Error(
        await getErrorMessage(response, 'Failed to create tournament config')
      );
    }

    const data: unknown = await response.json();

    return tournamentConfigDtoSchema.parse(data);
  },

  async updateConfig(
    config: TournamentConfig,
    { adminToken }: AdminRequestParams
  ): Promise<TournamentConfig> {
    const response = await fetch(getTournamentConfigsUrl(), {
      method: 'PUT',
      headers: getAdminHeaders(adminToken),
      body: JSON.stringify(config),
    });

    if (!response.ok) {
      throw new Error(
        await getErrorMessage(response, 'Failed to update tournament config')
      );
    }

    const data: unknown = await response.json();

    return tournamentConfigDtoSchema.parse(data);
  },

  async deleteConfig(
    configId: string,
    { adminToken }: AdminRequestParams
  ): Promise<void> {
    const response = await fetch(getTournamentConfigsUrl(configId), {
      method: 'DELETE',
      headers: {
        'x-admin-token': adminToken,
      },
    });

    if (!response.ok) {
      throw new Error(
        await getErrorMessage(response, 'Failed to delete tournament config')
      );
    }
  },
};
