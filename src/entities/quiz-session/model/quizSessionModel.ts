import type { BooleanQuestion } from '@/entities/question/model/questionTypes';
import type {
  BooleanQuestionAnswer,
} from '@/entities/question/model/questionAnswerTypes';

export type QuestionAnswer = {
  answer: boolean;
  bonus: boolean;
};

export type CardAnswers =
  Record<string, BooleanQuestionAnswer>;

export const calculateCardScore = (
  card: BooleanQuestion[],
  answers: CardAnswers
): number => {
  let score = 0;

  card.forEach((question) => {
    const userAnswer = answers?.[question.id];

    if (
      userAnswer &&
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
    .filter((answer) => answer.bonus).length;

  if (
    currentBonusCount >= 3 &&
    !answers[questionId]?.bonus
  ) {
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