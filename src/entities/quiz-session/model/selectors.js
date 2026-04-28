import { calculateCardScore } from './quizSessionModel';

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