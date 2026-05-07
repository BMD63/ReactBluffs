import { createSelector } from '@reduxjs/toolkit';
import { calculateCardScore } from './quizSessionModel';

const selectQuizSession = (state) => state.quizSession;

export const selectCurrentCardScore = (state) =>
  selectQuizSession(state).currentCardScore;

export const selectCards = (state) =>
  selectQuizSession(state).cards;

export const selectCurrentCardIndex = (state) =>
  selectQuizSession(state).currentCardIndex;

export const selectAnswersByCard = (state) =>
  selectQuizSession(state).answersByCard;

export const selectDifficulty = (state) =>
  state.quizUI.difficulty;

export const selectScreen = (state) =>
  state.quizUI.currentScreen;

export const selectCurrentCardData = createSelector(
  [selectCards, selectCurrentCardIndex, selectAnswersByCard],
  (cards = [], currentCardIndex = 0, answersByCard = []) => {
    const currentCard = cards[currentCardIndex];

    return {
      currentCard,
      currentCardAnswers: answersByCard?.[currentCardIndex] || {},
      currentCardIndex,
      totalCards: cards.length,
    };
  }
);

export const selectIsFinished = createSelector(
  [selectCards, selectCurrentCardIndex],
  (cards, currentCardIndex) => {
    return cards.length > 0 && currentCardIndex >= cards.length;
  }
);

export const selectTotalScore = (state) => {
  const { cards, answersByCard } = selectQuizSession(state);

  if (!cards.length) return 0;

  return cards.reduce((total, card, index) => {
    return total + calculateCardScore(
      card,
      answersByCard?.[index] || {}
    );
  }, 0);
};