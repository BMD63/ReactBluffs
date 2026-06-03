import { offlineQuizTournamentConfig } from '../model/mock/offlineQuizTournamentConfig';

export const mockTournamentConfigApi = {
  async getConfig() {
    return offlineQuizTournamentConfig;
  },
};
