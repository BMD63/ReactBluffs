import type { BooleanQuestion } from '@/entities/question/model/questionTypes';

type DifficultyCardConfig = {
  questionsPerCard: number;
  manualCardsCount: number;
};

export const generateCards = (
  questions: BooleanQuestion[],
  config: DifficultyCardConfig
): BooleanQuestion[][] => {
  const { questionsPerCard, manualCardsCount } = config;

  const shuffledQuestions = [...questions].sort(
    () => Math.random() - 0.5
  );

  const maxPossibleCards = Math.floor(
    questions.length / questionsPerCard
  );

  const cardsCount = Math.min(
    maxPossibleCards,
    manualCardsCount
  );

  const newCards: BooleanQuestion[][] = [];

  for (let i = 0; i < cardsCount; i++) {
    newCards.push(
      shuffledQuestions.slice(
        i * questionsPerCard,
        (i + 1) * questionsPerCard
      )
    );
  }

  return newCards;
};