import { isAnswerAccepted } from '@/entities/question/lib/isAnswerAccepted';
import type { Question } from '@/entities/question/model/questionTypes';

type CalculateTournamentRoundResultParams = {
  questions: Question[];
  answersByQuestionId: Record<string, string | boolean>;
  bonusQuestionIds: string[];
};

export type TournamentRoundResult = {
  correctAnswersCount: number;
  questionsCount: number;
  bonusCorrectCount: number;
  bonusAnswersCount: number;
  score: number;
};

const isQuestionAnsweredCorrectly = (
  question: Question,
  answer: string | boolean | undefined
): boolean => {
  if (answer === undefined) {
    return false;
  }

  if (question.type === 'boolean') {
    return answer === question.correctAnswer;
  }

  if (question.type === 'multipleChoice') {
    return answer === question.correctAnswer;
  }

  if (
    question.type === 'openText' ||
    question.type === 'image' ||
    question.type === 'audio'
  ) {
    if (typeof answer !== 'string') {
      return false;
    }

    return isAnswerAccepted({
      userAnswer: answer,
      correctAnswers: question.correctAnswers,
    });
  }

  return false;
};

export const calculateTournamentRoundResult = ({
  questions,
  answersByQuestionId,
  bonusQuestionIds,
}: CalculateTournamentRoundResultParams): TournamentRoundResult => {
  const correctAnswersCount = questions.filter((question) =>
    isQuestionAnsweredCorrectly(question, answersByQuestionId[question.id])
  ).length;

  const bonusCorrectCount = questions.filter(
    (question) =>
      bonusQuestionIds.includes(question.id) &&
      isQuestionAnsweredCorrectly(question, answersByQuestionId[question.id])
  ).length;

  const score = correctAnswersCount + bonusCorrectCount;

  return {
    correctAnswersCount,
    questionsCount: questions.length,
    bonusCorrectCount,
    bonusAnswersCount: bonusQuestionIds.length,
    score,
  };
};
