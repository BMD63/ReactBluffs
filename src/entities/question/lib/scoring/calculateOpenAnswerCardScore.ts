import type {
  OpenTextQuestion,
} from '../../model/questionTypes';

import type {
  CardAnswers,
} from '@/entities/quiz-session/model/quizSessionModel';

import { normalizeAnswer } from '../normalizeAnswer';

export const calculateOpenAnswerCardScore = (
  card: OpenTextQuestion[],
  answers: CardAnswers
): number => {
  let score = 0;

  card.forEach((question) => {
    const userAnswer =
      answers[question.id];

    if (
      !userAnswer ||
      typeof userAnswer.answer !== 'string'
    ) {
      return;
    }

    const normalizedUserAnswer =
      normalizeAnswer(userAnswer.answer);

    const normalizedCorrectAnswers =
      question.correctAnswers.map(
        normalizeAnswer
      );

    if (
      normalizedCorrectAnswers.includes(
        normalizedUserAnswer
      )
    ) {
      score += 1;
    }
  });

  return score;
};