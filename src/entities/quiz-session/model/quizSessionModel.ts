import type { QuestionAnswer } from '@/entities/question/model/questionAnswerTypes';
import type { Question } from '@/entities/question/model/questionTypes';

import { calculateCardScore } from '@/entities/question';

export type CardAnswers = Record<string, QuestionAnswer>;

export const setAnswer = (
  answers: CardAnswers,
  questionId: string,
  answer: boolean
): CardAnswers => {
  return {
    ...answers,
    [questionId]: {
      answer,
      bonus: false,
    },
  };
};

export const toggleBonus = (
  answers: CardAnswers,
  questionId: string
): CardAnswers => {
  const currentBonusCount = Object.values(answers || {}).filter(
    (answer) => 'bonus' in answer && answer.bonus
  ).length;

  if (
    currentBonusCount >= 3 &&
    !(
      answers[questionId] &&
      'bonus' in answers[questionId] &&
      answers[questionId].bonus
    )
  ) {
    return answers;
  }

  const currentAnswer = answers[questionId];

  if (!currentAnswer || !('bonus' in currentAnswer)) {
    return answers;
  }

  return {
    ...answers,
    [questionId]: {
      ...currentAnswer,
      bonus: !currentAnswer.bonus,
    },
  };
};

export const calculateCardSessionScore = (
  card: Question[],
  answers: CardAnswers
): number => {
  return calculateCardScore(card, answers);
};

export const applyQuestionAnswer = (
  answers: CardAnswers,
  questionId: string,
  answer: boolean | string
): CardAnswers => {
  return {
    ...answers,
    [questionId]:
      typeof answer === 'boolean'
        ? {
            answer,
            bonus: false,
          }
        : {
            answer,
          },
  };
};
