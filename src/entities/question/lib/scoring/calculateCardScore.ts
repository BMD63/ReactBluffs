import {
  QUESTION_TYPE,
  type BooleanQuestion,
  type Question,
  type MultipleChoiceQuestion,
} from '../../model/questionTypes';

import type {
  BooleanQuestionAnswer,
  QuestionAnswer,
  MultipleChoiceQuestionAnswer,
} from '../../model/questionAnswerTypes';

import {
  calculateBooleanCardScore,
} from './calculateBooleanCardScore';
import {
  calculateMultipleChoiceCardScore,
} from './calculateMultipleChoiceCardScore';

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

const isMultipleChoiceQuestion = (
  question: Question
): question is MultipleChoiceQuestion => {
  return question.type === QUESTION_TYPE.MULTIPLE_CHOICE;
};

const isMultipleChoiceAnswer = (
  answer: QuestionAnswer
): answer is MultipleChoiceQuestionAnswer => {
  return typeof answer.answer === 'string' && !('bonus' in answer);
};

const isMultipleChoiceAnswersRecord = (
  answers: CardAnswers
): answers is Record<string, MultipleChoiceQuestionAnswer> => {
  return Object.values(answers).every(isMultipleChoiceAnswer);
};

export const calculateCardScore = (
  card: Question[],
  answers: CardAnswers
): number => {
  const isBooleanCard = card.every(isBooleanQuestion);
  if (isBooleanCard && isBooleanAnswersRecord(answers)) {
    return calculateBooleanCardScore(card, answers);
    }
    const isMultipleChoiceCard = card.every(isMultipleChoiceQuestion);
if (
    isMultipleChoiceCard &&
    isMultipleChoiceAnswersRecord(answers)
    ) {
    return calculateMultipleChoiceCardScore(card, answers);
    }
  return 0;
};