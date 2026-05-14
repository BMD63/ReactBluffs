import {
  QUESTION_TYPE,
  type BooleanQuestion,
} from '../../model/questionTypes';

import type {
  BooleanQuestionAnswer,
} from '../../model/questionAnswerTypes';

export const calculateBooleanCardScore = (
  card: BooleanQuestion[],
  answers: Record<string, BooleanQuestionAnswer>
): number => {
  let score = 0;

  card.forEach((question) => {
    if (question.type !== QUESTION_TYPE.BOOLEAN) {
      return;
    }

    const userAnswer = answers[question.id];

    if (!userAnswer) {
      return;
    }

    if (
      userAnswer.answer === question.correctAnswer
    ) {
      score += 1;

      if (userAnswer.bonus) {
        score += 1;
      }
    }
  });

  return score;
};