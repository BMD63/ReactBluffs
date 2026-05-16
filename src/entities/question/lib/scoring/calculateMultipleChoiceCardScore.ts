import {
  QUESTION_TYPE,
  type MultipleChoiceQuestion,
} from '../../model/questionTypes';

import type { MultipleChoiceQuestionAnswer } from '../../model/questionAnswerTypes';

export const calculateMultipleChoiceCardScore = (
  card: MultipleChoiceQuestion[],
  answers: Record<string, MultipleChoiceQuestionAnswer>
): number => {
  let score = 0;

  card.forEach((question) => {
    if (question.type !== QUESTION_TYPE.MULTIPLE_CHOICE) {
      return;
    }

    const userAnswer = answers[question.id];

    if (!userAnswer) {
      return;
    }

    if (userAnswer.answer === question.correctAnswer) {
      score += 1;
    }
  });

  return score;
};
