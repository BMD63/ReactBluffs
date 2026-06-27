import type { TournamentConfig } from '../model/tournamentConfigTypes';
import { offlineQuizTournamentConfig } from '../model/mock/offlineQuizTournamentConfig';

export const mockTournamentConfigApi = {
  async getConfigs(): Promise<TournamentConfig[]> {
    return [offlineQuizTournamentConfig];
  },

  async getConfig(): Promise<TournamentConfig> {
    return offlineQuizTournamentConfig;
  },

  async updateConfig(config: TournamentConfig): Promise<TournamentConfig> {
    Object.assign(offlineQuizTournamentConfig, config);

    return offlineQuizTournamentConfig;
  },
};
