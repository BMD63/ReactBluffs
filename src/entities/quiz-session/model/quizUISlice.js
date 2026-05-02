import { createSlice } from '@reduxjs/toolkit';
import { DIFFICULTY } from '@/entities/quiz-session/model/config/difficultyConfig.js';

const initialState = {
  showRules: false,
  showCardResults: false,
  difficulty: DIFFICULTY.MEDIUM, // дефолт
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
    }
  },
});

export const {
  setShowRules,
  setShowCardResults,
  setDifficulty,
} = quizUISlice.actions;

export const quizUIReducer = quizUISlice.reducer;