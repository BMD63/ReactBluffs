import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showRules: false,
  showCardResults: false,
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
  },
});

export const {
  setShowRules,
  setShowCardResults,
} = quizUISlice.actions;

export const quizUIReducer = quizUISlice.reducer;