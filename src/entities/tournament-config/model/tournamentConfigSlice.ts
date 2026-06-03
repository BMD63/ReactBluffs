import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { TournamentConfig } from './tournamentConfigTypes';

type TournamentConfigState = {
  configs: TournamentConfig[];
  activeConfigId: string | null;
};

const initialState: TournamentConfigState = {
  configs: [],
  activeConfigId: null,
};

const tournamentConfigSlice = createSlice({
  name: 'tournamentConfig',
  initialState,
  reducers: {
    setTournamentConfigs(state, action: PayloadAction<TournamentConfig[]>) {
      state.configs = action.payload;

      if (!state.activeConfigId && action.payload[0]) {
        state.activeConfigId = action.payload[0].id;
      }
    },

    setActiveTournamentConfigId(state, action: PayloadAction<string>) {
      state.activeConfigId = action.payload;
    },
  },
});

export const { setTournamentConfigs, setActiveTournamentConfigId } =
  tournamentConfigSlice.actions;

export const tournamentConfigReducer = tournamentConfigSlice.reducer;
