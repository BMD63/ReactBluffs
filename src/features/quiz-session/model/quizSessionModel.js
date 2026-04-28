export const calculateCardScore = (card, answers) => {
  let score = 0;

  card.forEach((question) => {
    const userAnswer = answers?.[question.id];

    if (userAnswer && userAnswer.answer === question.correctAnswer) {
      score += 1;
      if (userAnswer.bonus) score += 1;
    }
  });

  return score;
};

export const setAnswer = (answers, questionId, answer) => {
  return {
    ...answers,
    [questionId]: {
      answer,
      bonus: false,
    },
  };
};

export const toggleBonus = (answers, questionId) => {
  const currentBonusCount = Object.values(answers || {})
    .filter((a) => a.bonus).length;

  if (currentBonusCount >= 3 && !answers[questionId]?.bonus) {
    return answers;
  }

  return {
    ...answers,
    [questionId]: {
      ...answers[questionId],
      bonus: !answers[questionId]?.bonus,
    },
  };
};