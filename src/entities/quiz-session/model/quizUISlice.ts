import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { GAME_MODE, type GameMode } from '@/entities/game-mode';
import { SCREEN, type Screen } from './config/screen';
import { DIFFICULTY, type Difficulty } from './config/difficultyConfig';
import { GAME_FLOW_MODE, type GameFlowMode } from '@/entities/game-flow';
import type { Question } from '@/entities/question/model/questionTypes';

type QuizUIState = {
  currentScreen: Screen;
  difficulty: Difficulty;
  gameMode: GameMode;
  gameFlowMode: GameFlowMode;
  isLoading: boolean;
  error: string | null;
  currentTournamentRoundIndex: number;
  currentTournamentQuestionIndex: number;
  tournamentAnswersByQuestionId: Record<string, string | boolean>;
  currentTournamentQuestions: Question[];
  tournamentQuestionIdsByRoundId: Record<string, string[]>;
  tournamentQuestionsById: Record<string, Question>;
  tournamentBonusQuestionIds: string[];
};

const initialState: QuizUIState = {
  difficulty: DIFFICULTY.MEDIUM,
  currentScreen: SCREEN.START,
  gameMode: GAME_MODE.BLUFF,
  gameFlowMode: GAME_FLOW_MODE.TRAINING,
  isLoading: false,
  error: null,
  currentTournamentRoundIndex: 0,
  currentTournamentQuestionIndex: 0,
  tournamentAnswersByQuestionId: {},
  currentTournamentQuestions: [],
  tournamentQuestionIdsByRoundId: {},
  tournamentQuestionsById: {},
  tournamentBonusQuestionIds: [],
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
    setGameFlowMode(state, action: PayloadAction<GameFlowMode>) {
      state.gameFlowMode = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setCurrentTournamentRoundIndex(state, action: PayloadAction<number>) {
      state.currentTournamentRoundIndex = action.payload;
    },

    setCurrentTournamentQuestions(state, action: PayloadAction<Question[]>) {
      state.currentTournamentQuestions = action.payload;
    },

    resetCurrentTournamentQuestions(state) {
      state.currentTournamentQuestions = [];
    },

    setTournamentQuestionAnswer(
      state,
      action: PayloadAction<{ questionId: string; answer: string | boolean }>
    ) {
      state.tournamentAnswersByQuestionId[action.payload.questionId] =
        action.payload.answer;
    },

    setCurrentTournamentQuestionIndex(state, action: PayloadAction<number>) {
      state.currentTournamentQuestionIndex = action.payload;
    },
    setTournamentQuestionPlan(
      state,
      action: PayloadAction<{
        questionIdsByRoundId: Record<string, string[]>;
        questionsById: Record<string, Question>;
      }>
    ) {
      state.tournamentQuestionIdsByRoundId =
        action.payload.questionIdsByRoundId;
      state.tournamentQuestionsById = action.payload.questionsById;
    },

    resetTournamentQuestionPlan(state) {
      state.tournamentQuestionIdsByRoundId = {};
      state.tournamentQuestionsById = {};
    },
    resetTournamentSession(state) {
      state.currentTournamentRoundIndex = 0;
      state.currentTournamentQuestionIndex = 0;
      state.tournamentAnswersByQuestionId = {};
      state.currentTournamentQuestions = [];
      state.tournamentQuestionIdsByRoundId = {};
      state.tournamentQuestionsById = {};
      state.tournamentBonusQuestionIds = [];
    },
    toggleTournamentBonusQuestion(state, action: PayloadAction<string>) {
      const questionId = action.payload;

      if (state.tournamentBonusQuestionIds.includes(questionId)) {
        state.tournamentBonusQuestionIds =
          state.tournamentBonusQuestionIds.filter((id) => id !== questionId);

        return;
      }

      state.tournamentBonusQuestionIds.push(questionId);
    },
  },
});

export const {
  setDifficulty,
  setScreen,
  resetUI,
  setGameMode,
  setGameFlowMode,
  setLoading,
  setError,
  setCurrentTournamentRoundIndex,
  setCurrentTournamentQuestionIndex,
  setTournamentQuestionAnswer,
  setCurrentTournamentQuestions,
  resetCurrentTournamentQuestions,
  setTournamentQuestionPlan,
  resetTournamentQuestionPlan,
  resetTournamentSession,
  toggleTournamentBonusQuestion,
} = quizUISlice.actions;

export const quizUIReducer = quizUISlice.reducer;
