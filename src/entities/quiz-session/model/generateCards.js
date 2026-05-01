import { gameConfig } from './gameConfig';

export const generateCards = (questions) => {
  const { questionsPerCard } = gameConfig;

  const shuffledQuestions = [...questions].sort(
    () => Math.random() - 0.5
  );

  const newCards = [];

  for (let i = 0; i < shuffledQuestions.length; i += questionsPerCard) {
    newCards.push(
      shuffledQuestions.slice(i, i + questionsPerCard)
    );
  }

  return newCards;
};