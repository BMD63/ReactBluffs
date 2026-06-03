import { offlineQuizTournamentConfig } from '../model/mock/offlineQuizTournamentConfig';

export const mockTournamentConfigApi = {
  async getConfigs() {
    return [offlineQuizTournamentConfig];
  },
};
