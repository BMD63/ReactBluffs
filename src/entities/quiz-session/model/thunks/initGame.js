import { resetGame, setCards } from '../quizSessionSlice';
import { setShowRules } from '../quizUISlice';
import { generateCards } from '../generateCards';
import { questions } from '@/entities/question/model/questions';

export const initGame = () => (dispatch) => {
  dispatch(resetGame());

  const cards = generateCards(questions);
  dispatch(setCards(cards));
};