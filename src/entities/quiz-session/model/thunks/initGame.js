import { resetGame, setCards } from '../quizSessionSlice';
import { gameConfig } from '../gameConfig';
import { generateCards } from '../generateCards';
import { questions } from '@/entities/question/model/questions';

export const initGame = () => (dispatch) => {
  dispatch(resetGame());

  const cards = generateCards(questions, gameConfig);
  dispatch(setCards(cards));
};