import { createSlice } from '@reduxjs/toolkit';
import { DIFFICULTY } from '@/entities/quiz-session/model/config/difficultyConfig.js';

export const SCREEN = {
  MENU: 'menu',
  SETTINGS: 'settings',
  GAME: 'game',
  RULES: 'rules',
  CARD_RESULT: 'cardResult',
  FINAL: 'final',
};

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