import type { OpenTextQuestion } from '../../model/questionTypes';

import type { CardAnswers } from '@/entities/quiz-session/model/quizSessionModel';

import { isAnswerAccepted } from '../isAnswerAccepted';

export const calculateOpenAnswerCardScore = (
  card: OpenTextQuestion[],
  answers: CardAnswers
): number => {
  let score = 0;

  card.forEach((question) => {
    const userAnswer = answers[question.id];

    if (!userAnswer || typeof userAnswer.answer !== 'string') {
      return;
    }

    if (
      isAnswerAccepted({
        userAnswer: userAnswer.answer,
        correctAnswers: question.correctAnswers,
      })
    ) {
      score += 1;
    }
  });

  return score;
};
