import {
  QUESTION_TYPE,
  type BooleanQuestion,
  type Question,
} from '../../model/questionTypes';

import type {
  BooleanQuestionAnswer,
  QuestionAnswer,
} from '../../model/questionAnswerTypes';

import {
  calculateBooleanCardScore,
} from './calculateBooleanCardScore';

type CardAnswers = Record<string, QuestionAnswer>;

const isBooleanQuestion = (
  question: Question
): question is BooleanQuestion => {
  return question.type === QUESTION_TYPE.BOOLEAN;
};

const isBooleanAnswer = (
  answer: QuestionAnswer
): answer is BooleanQuestionAnswer => {
  return typeof answer.answer === 'boolean' && 'bonus' in answer;
};

const isBooleanAnswersRecord = (
  answers: CardAnswers
): answers is Record<string, BooleanQuestionAnswer> => {
  return Object.values(answers).every(isBooleanAnswer);
};

export const calculateCardScore = (
  card: Question[],
  answers: CardAnswers
): number => {
  const isBooleanCard = card.every(isBooleanQuestion);
  if (isBooleanCard && isBooleanAnswersRecord(answers)) {
    return calculateBooleanCardScore(card, answers);
    }

  return 0;
};