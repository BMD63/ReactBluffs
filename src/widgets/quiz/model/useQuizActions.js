import { useDispatch, useSelector } from 'react-redux';

import {
  SCREEN,
  setScreen,
  resetUI,
  answerQuestion,
  toggleBonus,
  submitCard,
  nextCard,
  initGame,
  selectCurrentCardData,
} from '@/entities/quiz-session';

export const useQuizActions = () => {
  const dispatch = useDispatch();
  const { index, total } = useSelector(selectCurrentCardData);
  const goToMenu = () => {
    dispatch(resetUI());
  };

  const nextQuizCard = () => {
  dispatch(nextCard());

  const isLastCard = index >= total - 1;

  dispatch(setScreen(isLastCard ? SCREEN.FINAL : SCREEN.GAME));
};

  const restartQuiz = () => {
    dispatch(initGame());
    dispatch(setScreen(SCREEN.GAME));
  };

  const answerQuizQuestion = (cardIndex, questionId, answer) => {
    dispatch(answerQuestion({ cardIndex, questionId, answer }));
  };

  const toggleQuestionBonus = (cardIndex, questionId) => {
    dispatch(toggleBonus({ cardIndex, questionId }));
  };

  const submitQuizCard = () => {
    dispatch(submitCard());
    dispatch(setScreen(SCREEN.CARD_RESULT));
  };

  const closeRules = () => {
    dispatch(setScreen(SCREEN.MENU));
  };

  return {
    goToMenu,
    nextQuizCard,
    restartQuiz,
    answerQuizQuestion,
    toggleQuestionBonus,
    submitQuizCard,
    closeRules,
  };
};