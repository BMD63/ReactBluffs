import { calculateCardScore } from './quizSessionModel';
import { createSelector } from '@reduxjs/toolkit';

export const selectTotalScore = (state) => {
  const { cards, userAnswers } = state.quizSession;

  if (!cards.length) return 0;

  return cards.reduce((total, card, index) => {
    return total + calculateCardScore(
      card,
      userAnswers?.[index] || {}
    );
  }, 0);
};

const selectQuizSession = (state) => state.quizSession;

export const selectCurrentCardScore = (state) =>
  selectQuizSession(state).currentCardScore;

export const selectCards = (state) => selectQuizSession(state).cards;
export const selectCurrentCardIndex = (state) => selectQuizSession(state).currentCard;
export const selectUserAnswers = (state) => selectQuizSession(state).userAnswers;

export const selectCurrentCardData = createSelector(
  [selectCards, selectCurrentCardIndex, selectUserAnswers],
  (cards, currentCard, userAnswers) => {
    const card = cards[currentCard];

    return {
      card,
      answers: userAnswers[currentCard],
      index: currentCard,
      total: cards.length,
      isFinished: currentCard >= cards.length,
    };
  }
);

const selectQuizUI = (state) => state.quizUI;

export const selectShowRules = (state) =>
  selectQuizUI(state).showRules;

export const selectShowCardResults = (state) =>
  selectQuizUI(state).showCardResults;