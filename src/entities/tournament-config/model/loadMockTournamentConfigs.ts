import { tournamentConfigApi } from '../api/tournamentConfigApi';
import { setTournamentConfigs } from './tournamentConfigSlice';

import type { AppDispatch } from '@/app/providers/store/store';

export const loadMockTournamentConfigs =
  () => async (dispatch: AppDispatch) => {
    const configs = await tournamentConfigApi.getConfigs();

    dispatch(setTournamentConfigs(configs));
  };
