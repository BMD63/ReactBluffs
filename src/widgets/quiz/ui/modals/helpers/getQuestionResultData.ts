import {
  QUESTION_TYPE,
  normalizeAnswer,
  type Question,
} from '@/entities/question';

import type { CardAnswers } from '@/entities/quiz-session/model/quizSessionModel';

export const getQuestionResultData = (
  question: Question,
  answers: CardAnswers
) => {
  const answer = answers[question.id];

  const userAnswerLabel =
    typeof answer?.answer === 'boolean'
      ? answer.answer
        ? 'Да'
        : 'Нет'
      : (answer?.answer ?? '—');

  const isCorrect =
    question.type === QUESTION_TYPE.BOOLEAN
      ? answer?.answer === question.correctAnswer
      : question.type === QUESTION_TYPE.MULTIPLE_CHOICE
        ? answer?.answer === question.correctAnswer
        : question.type === QUESTION_TYPE.OPEN_TEXT
          ? question.correctAnswers
              .map(normalizeAnswer)
              .includes(normalizeAnswer(String(answer?.answer ?? '')))
          : false;

  const correctAnswerLabel =
    question.type === QUESTION_TYPE.BOOLEAN
      ? question.correctAnswer
        ? 'Да'
        : 'Нет'
      : question.type === QUESTION_TYPE.MULTIPLE_CHOICE
        ? question.correctAnswer
        : question.type === QUESTION_TYPE.OPEN_TEXT
          ? question.correctAnswers[0]
          : '—';

  const hasBonus = Boolean(answer && 'bonus' in answer && answer.bonus);

  return {
    answer,
    hasBonus,
    isCorrect,
    correctAnswerLabel,
    userAnswerLabel,
  };
};
