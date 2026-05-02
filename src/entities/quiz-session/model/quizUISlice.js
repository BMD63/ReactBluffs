import { createSlice } from '@reduxjs/toolkit';
import { DIFFICULTY } from '@/entities/quiz-session/model/config/difficultyConfig.js';

const initialState = {
  showRules: false,
  showCardResults: false,
  difficulty: DIFFICULTY.MEDIUM, // дефолт
  currentScreen: 'menu',
};

const quizUISlice = createSlice({
  name: 'quizUI',
  initialState,
  reducers: {
    setShowRules(state, action) {
      state.showRules = action.payload;
    },
    setShowCardResults(state, action) {
      state.showCardResults = action.payload;
    },
    setDifficulty(state, action) {
      state.difficulty = action.payload;
    },
    setScreen(state, action) {
      state.currentScreen = action.payload;
    },
    resetUI(state) {
      state.showRules = false;
      state.showCardResults = false;
    }
  },
});

export const {
  setShowRules,
  setShowCardResults,
  setDifficulty,
  setScreen,
  resetUI,
} = quizUISlice.actions;

export const quizUIReducer = quizUISlice.reducer;