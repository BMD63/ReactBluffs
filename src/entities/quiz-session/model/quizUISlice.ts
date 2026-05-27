import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { GAME_MODE, type GameMode } from '@/entities/game-mode';
import { SCREEN, type Screen } from './config/screen';
import { DIFFICULTY, type Difficulty } from './config/difficultyConfig';

type QuizUIState = {
  currentScreen: Screen;
  difficulty: Difficulty;
  gameMode: GameMode;
  isLoading: boolean;
  error: string | null;
};

const initialState: QuizUIState = {
  difficulty: DIFFICULTY.MEDIUM,
  currentScreen: SCREEN.START,
  gameMode: GAME_MODE.BLUFF,
  isLoading: false,
  error: null,
};

const quizUISlice = createSlice({
  name: 'quizUI',
  initialState,
  reducers: {
    setDifficulty(state, action: PayloadAction<Difficulty>) {
      state.difficulty = action.payload;
    },
    setScreen(state, action: PayloadAction<Screen>) {
      state.currentScreen = action.payload;
    },
    resetUI(state) {
      state.currentScreen = SCREEN.BLUFF_MENU;
    },
    setGameMode(state, action: PayloadAction<GameMode>) {
      state.gameMode = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const {
  setDifficulty,
  setScreen,
  resetUI,
  setGameMode,
  setLoading,
  setError,
} = quizUISlice.actions;

export const quizUIReducer = quizUISlice.reducer;
