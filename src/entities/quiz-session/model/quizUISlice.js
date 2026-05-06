import { createSlice } from '@reduxjs/toolkit';
import { DIFFICULTY } from '@/entities/quiz-session/model/config/difficultyConfig.js';

import { SCREEN } from './config/screen';

const initialState = {
  difficulty: DIFFICULTY.MEDIUM,
  currentScreen: SCREEN.MENU,
};

const quizUISlice = createSlice({
  name: 'quizUI',
  initialState,
  reducers: {
    setDifficulty(state, action) {
      state.difficulty = action.payload;
    },
    setScreen(state, action) {
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