import type { AppDispatch, RootState } from '@/app/providers/store/store';
import {
  gameModeConfig,
} from '@/entities/game-mode';
import { questionApi } from '@/entities/question/api/questionApi';
import { generateCards } from '../generateCards';
import { resetGame, setCards } from '../quizSessionSlice';

export const initGame =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(resetGame());

    
    const state = getState();
    const { difficulty, gameMode } = state.quizUI;
    const config = gameModeConfig[gameMode].difficulty[difficulty];

    const questions = await questionApi.getQuestions({
      gameMode,
    });
    const cards = generateCards(questions, config);

    dispatch(setCards(cards));
  };