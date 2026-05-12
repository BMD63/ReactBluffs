import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
  GAME_MODE,
  type GameMode,
} from '@/entities/game-mode';
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
  gameMode: GameMode;
};

const initialState: QuizUIState = {
  difficulty: DIFFICULTY.MEDIUM,
  currentScreen: SCREEN.MENU,
  gameMode: GAME_MODE.BLUFF,
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
    setGameMode(
      state,
      action: PayloadAction<GameMode>
    ) {
      state.gameMode = action.payload;
    },
  },
});

export const {
  setDifficulty,
  setScreen,
  resetUI,
  setGameMode
} = quizUISlice.actions;

export const quizUIReducer = quizUISlice.reducer;