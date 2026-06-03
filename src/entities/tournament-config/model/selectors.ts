import type { RootState } from '@/app/providers/store/store';

export const selectTournamentConfigs = (state: RootState) =>
  state.tournamentConfig.configs;

export const selectActiveTournamentConfigId = (state: RootState) =>
  state.tournamentConfig.activeConfigId;

export const selectActiveTournamentConfig = (state: RootState) => {
  const { configs, activeConfigId } = state.tournamentConfig;

  return configs.find((config) => config.id === activeConfigId) ?? null;
};
