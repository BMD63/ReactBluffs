export const generateCards = (questions) => {
  const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);

  const cardsCount = Math.floor(shuffledQuestions.length / 7);
  const newCards = [];

  for (let i = 0; i < cardsCount; i++) {
    newCards.push(shuffledQuestions.slice(i * 7, (i + 1) * 7));
  }

  return newCards;
};