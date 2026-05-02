import { calculateCardScore } from './quizSessionModel';
import { createSelector } from '@reduxjs/toolkit';

const selectQuizSession = (state) => state.quizSession;

export const selectCurrentCardScore = (state) => selectQuizSession(state).currentCardScore;
export const selectCards = (state) => selectQuizSession(state).cards;
export const selectCurrentCardIndex = (state) => selectQuizSession(state).currentCard;
export const selectUserAnswers = (state) => selectQuizSession(state).userAnswers;

const selectQuizUI = (state) => state.quizUI;
export const selectDifficulty = (state) => state.quizUI.difficulty;
export const selectScreen = (state) => state.quizUI.currentScreen;
export const selectShowRules = (state) => selectQuizUI(state).showRules;
export const selectShowCardResults = (state) => selectQuizUI(state).showCardResults;

export const selectCurrentCardData = createSelector(
  [selectCards, selectCurrentCardIndex, selectUserAnswers],
  (cards = [], currentCard = 0, userAnswers = []) => {
    const card = cards[currentCard];

    return {
      card,
      answers: userAnswers?.[currentCard] || {},
      index: currentCard,
      total: cards.length,
    };
  }
);

export const selectIsFinished = createSelector(
  [selectCards, selectCurrentCardIndex],
  (cards, currentCard) => {
    return cards.length > 0 && currentCard >= cards.length;
  }
);

export const selectTotalScore = (state) => {
  const { cards, userAnswers } = selectQuizSession(state);

  if (!cards.length) return 0;

  return cards.reduce((total, card, index) => {
    return total + calculateCardScore(
      card,
      userAnswers?.[index] || {}
    );
  }, 0);
};
