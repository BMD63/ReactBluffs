import type { AppDispatch, RootState } from '@/app/providers/store/store';

import { questionApi } from '@/entities/question/api/questionApi';

import { difficultyConfig } from '../config/difficultyConfig';
import { generateCards } from '../generateCards';
import { resetGame, setCards } from '../quizSessionSlice';

export const initGame =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(resetGame());

    
    const state = getState();
    const { difficulty, gameMode } = state.quizUI;
    const config = difficultyConfig[difficulty];

    const questions = await questionApi.getQuestions({
      gameMode,
    });
    const cards = generateCards(questions, config);

    dispatch(setCards(cards));
  };