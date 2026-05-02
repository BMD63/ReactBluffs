import { resetGame, setCards } from '../quizSessionSlice';
import { difficultyConfig } from '../config/difficultyConfig';
import { generateCards } from '../generateCards';
import { questions } from '@/entities/question/model/questions';

export const initGame = () => (dispatch, getState) => {
  dispatch(resetGame());

  const state = getState();
  const difficulty = state.quizUI.difficulty;

  const config = difficultyConfig[difficulty];

  const cards = generateCards(questions, config);

  dispatch(setCards(cards));
};