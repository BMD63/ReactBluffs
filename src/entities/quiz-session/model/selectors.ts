import { createSelector } from '@reduxjs/toolkit';
import { calculateCardSessionScore } from './quizSessionModel';
import type { RootState } from '@/app/providers/store/store';

const selectQuizSession = (state: RootState) => state.quizSession;

export const selectCurrentCardScore = (state: RootState) =>
  selectQuizSession(state).currentCardScore;

export const selectCards = (state: RootState) => selectQuizSession(state).cards;

export const selectCurrentCardIndex = (state: RootState) =>
  selectQuizSession(state).currentCardIndex;

export const selectAnswersByCard = (state: RootState) =>
  selectQuizSession(state).answersByCard;

export const selectDifficulty = (state: RootState) => state.quizUI.difficulty;

export const selectScreen = (state: RootState) => state.quizUI.currentScreen;

export const selectGameMode = (state: RootState) => state.quizUI.gameMode;

export const selectIsLoading = (state: RootState) => state.quizUI.isLoading;

export const selectError = (state: RootState) => state.quizUI.error;

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

export const selectCurrentTournamentRoundIndex = (state: RootState) =>
  state.quizUI.currentTournamentRoundIndex;

export const selectCurrentTournamentQuestionIndex = (state: RootState) =>
  state.quizUI.currentTournamentQuestionIndex;

export const selectCurrentTournamentQuestions = (state: RootState) =>
  state.quizUI.currentTournamentQuestions;

export const selectTournamentAnswersByQuestionId = (state: RootState) =>
  state.quizUI.tournamentAnswersByQuestionId;
export const selectTournamentBonusQuestionIds = (state: RootState) =>
  state.quizUI.tournamentBonusQuestionIds;
export const selectTotalScore = (state: RootState) => {
  const { cards, answersByCard } = selectQuizSession(state);

  if (!cards.length) return 0;

  return cards.reduce((total, card, index) => {
    return (
      total + calculateCardSessionScore(card, answersByCard?.[index] || {})
    );
  }, 0);
};
export const selectTournamentQuestionIdsByRoundId = (state: RootState) =>
  state.quizUI.tournamentQuestionIdsByRoundId;

export const selectTournamentQuestionsById = (state: RootState) =>
  state.quizUI.tournamentQuestionsById;

export const selectCurrentTournamentRoundResult = (state: RootState) =>
  state.quizUI.currentTournamentRoundResult;
