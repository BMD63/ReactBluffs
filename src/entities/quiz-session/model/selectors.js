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

export const selectCurrentCardData = createSelector(
  [(state) => state.quizSession],
  (s) => ({
    card: s.cards[s.currentCard],
    answers: s.userAnswers[s.currentCard],
    index: s.currentCard,
    total: s.cards.length,
    isFinished: s.currentCard >= s.cards.length
  })
);