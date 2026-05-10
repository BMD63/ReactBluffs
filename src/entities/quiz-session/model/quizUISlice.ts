import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { 
  SCREEN, 
  type Screen } from './config/screen';
import {
  DIFFICULTY,
  type Difficulty,
} from './config/difficultyConfig';

type QuizUIState = {
  currentScreen: Screen;
  difficulty: Difficulty;
};

const initialState: QuizUIState = {
  difficulty: DIFFICULTY.MEDIUM,
  currentScreen: SCREEN.MENU,
};

const quizUISlice = createSlice({
  name: 'quizUI',
  initialState,
  reducers: {
    setDifficulty(
      state, 
      action: PayloadAction<Difficulty>
    ) {
      state.difficulty = action.payload;
    },
    setScreen(
      state,
      action: PayloadAction<Screen>
    ) {
      state.currentScreen = action.payload;
    },
    resetUI(state) {
      state.currentScreen = SCREEN.MENU;
    },
  },
});

export const {
  setDifficulty,
  setScreen,
  resetUI,
} = quizUISlice.actions;

export const quizUIReducer = quizUISlice.reducer;