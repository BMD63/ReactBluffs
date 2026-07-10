import type { TournamentConfig } from '../model/tournamentConfigTypes';

export type TournamentConfigApi = {
  getConfigs: () => Promise<TournamentConfig[]>;
  getConfig: (configId: string) => Promise<TournamentConfig | null>;
  createConfig: (config: TournamentConfig) => Promise<TournamentConfig>;
  updateConfig: (config: TournamentConfig) => Promise<TournamentConfig>;
  deleteConfig: (configId: string) => Promise<void>;
};
