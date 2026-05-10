import type { AppDispatch, RootState } from '@/app/providers/store/store';

import { questions } from '@/entities/question/model/questions';

import { difficultyConfig } from '../config/difficultyConfig';
import { generateCards } from '../generateCards';
import { resetGame, setCards } from '../quizSessionSlice';

export const initGame =
  () => (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(resetGame());

    const state = getState();
    const difficulty = state.quizUI.difficulty;
    const config = difficultyConfig[difficulty];

    const cards = generateCards(questions, config);

    dispatch(setCards(cards));
  };