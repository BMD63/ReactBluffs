import type { TournamentConfig } from '../model/tournamentConfigTypes';
import type { TournamentConfigApi } from './tournamentConfigApiTypes';
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

export const httpTournamentConfigApi: TournamentConfigApi = {
  async getConfigs(): Promise<TournamentConfig[]> {
    const response = await fetch(getTournamentConfigsUrl());

    if (!response.ok) {
      throw new Error('Failed to fetch tournament configs');
    }

    return response.json();
  },

  async getConfig(configId: string): Promise<TournamentConfig | null> {
    const response = await fetch(getTournamentConfigsUrl(configId));

    if (!response.ok) {
      throw new Error('Failed to fetch tournament config');
    }

    return response.json();
  },

  async createConfig(config: TournamentConfig): Promise<TournamentConfig> {
    void config;

    throw new Error('Not implemented');
  },

  async updateConfig(config: TournamentConfig): Promise<TournamentConfig> {
    void config;

    throw new Error('Not implemented');
  },

  async deleteConfig(configId: string): Promise<void> {
    void configId;

    throw new Error('Not implemented');
  },
};
