import type { TournamentConfig } from '../model/tournamentConfigTypes';

export type AdminRequestParams = {
  adminToken: string;
};

export type TournamentConfigApi = {
  getConfigs: () => Promise<TournamentConfig[]>;
  getConfig: (configId: string) => Promise<TournamentConfig | null>;

  createConfig: (
    config: TournamentConfig,
    params: AdminRequestParams
  ) => Promise<TournamentConfig>;

  updateConfig: (
    config: TournamentConfig,
    params: AdminRequestParams
  ) => Promise<TournamentConfig>;

  deleteConfig: (configId: string, params: AdminRequestParams) => Promise<void>;
};
