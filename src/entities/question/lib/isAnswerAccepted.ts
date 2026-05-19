import { normalizeAnswer } from './normalizeAnswer';
import { calculateLevenshteinDistance } from './calculateLevenshteinDistance';

type IsAnswerAcceptedParams = {
  userAnswer: string;
  correctAnswers: string[];
};

export const isAnswerAccepted = ({
  userAnswer,
  correctAnswers,
}: IsAnswerAcceptedParams): boolean => {
  const normalizedUserAnswer = normalizeAnswer(userAnswer);

  return correctAnswers.map(normalizeAnswer).some((correctAnswer) => {
    if (correctAnswer === normalizedUserAnswer) {
      return true;
    }

    if (normalizedUserAnswer.length < 5) {
      return false;
    }

    const distance = calculateLevenshteinDistance(
      normalizedUserAnswer,
      correctAnswer
    );

    return distance <= 1;
  });
};
