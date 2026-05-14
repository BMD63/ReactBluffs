import {
  QUESTION_TYPE,
  type Question,
} from '@/entities/question/model/questionTypes';
import type {
  QuestionAnswer,
} from '@/entities/question/model/questionAnswerTypes';

export type CardAnswers =
  Record<string, QuestionAnswer>;

export const calculateCardScore = (
  card: Question[],
  answers: CardAnswers
): number => {
  let score = 0;

  card.forEach((question) => {
    const userAnswer = answers?.[question.id];

    if (!userAnswer) return;

    if (question.type !== QUESTION_TYPE.BOOLEAN) {
      return;
    }

    if (userAnswer.answer === question.correctAnswer) {
      score += 1;

      if ('bonus' in userAnswer && userAnswer.bonus) {
        score += 1;
      }
    }
  });

  return score;
};

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
  const currentBonusCount = Object.values(answers || {})
    .filter((answer) => 'bonus' in answer && answer.bonus)
    .length;

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