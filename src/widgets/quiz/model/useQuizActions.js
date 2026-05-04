import { useDispatch } from 'react-redux';

import {
  answerQuestion,
  toggleBonus,
  submitCard,
  nextCard,
} from '@/entities/quiz-session/model/quizSessionSlice';

import {
  SCREEN,
  setScreen,
  resetUI,
} from '@/entities/quiz-session/model/quizUISlice';

import { initGame } from '@/entities/quiz-session/model/thunks/initGame';

export const useQuizActions = () => {
  const dispatch = useDispatch();

  const goToMenu = () => {
    dispatch(resetUI());
  };

  const nextQuizCard = () => {
    dispatch(nextCard());
    dispatch(setScreen(SCREEN.GAME));
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