import type { TournamentConfig } from '../model/tournamentConfigTypes';
import {
  offlineQuizTournamentConfig,
  musicQuizTournamentConfig,
} from '../model/mock/offlineQuizTournamentConfig';

const tournamentConfigs: TournamentConfig[] = [
  offlineQuizTournamentConfig,
  musicQuizTournamentConfig,
];

export const mockTournamentConfigApi = {
  async getConfigs(): Promise<TournamentConfig[]> {
    return tournamentConfigs;
  },

  async getConfig(configId: string): Promise<TournamentConfig | null> {
    return tournamentConfigs.find((config) => config.id === configId) ?? null;
  },

  async updateConfig(config: TournamentConfig): Promise<TournamentConfig> {
    const configIndex = tournamentConfigs.findIndex(
      (currentConfig) => currentConfig.id === config.id
    );

    if (configIndex === -1) {
      tournamentConfigs.push(config);
      return config;
    }

    tournamentConfigs[configIndex] = config;

    return config;
  },

  async createConfig(config: TournamentConfig): Promise<TournamentConfig> {
    tournamentConfigs.push(config);

    return config;
  },

  async deleteConfig(configId: string): Promise<void> {
    const configIndex = tournamentConfigs.findIndex(
      (config) => config.id === configId
    );

    if (configIndex !== -1) {
      tournamentConfigs.splice(configIndex, 1);
    }
  },
};
