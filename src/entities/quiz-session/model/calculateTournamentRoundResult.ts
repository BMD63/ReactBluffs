import { isAnswerAccepted } from '@/entities/question/lib/isAnswerAccepted';
import type { Question } from '@/entities/question/model/questionTypes';

type CalculateTournamentRoundResultParams = {
  roundTitle: string;
  questions: Question[];
  answersByQuestionId: Record<string, string | boolean>;
  bonusQuestionIds: string[];
};

export type TournamentQuestionResult = {
  questionId: string;
  questionText: string;
  userAnswer: string | boolean | undefined;
  correctAnswer: string | boolean;
  isCorrect: boolean;
  isBonus: boolean;
  score: number;
};

export type TournamentRoundResult = {
  roundTitle: string;
  correctAnswersCount: number;
  questionsCount: number;
  bonusCorrectCount: number;
  bonusAnswersCount: number;
  score: number;
  questionResults: TournamentQuestionResult[];
};

const getCorrectAnswer = (question: Question): string | boolean => {
  if (question.type === 'boolean') {
    return question.correctAnswer;
  }

  if (question.type === 'multipleChoice') {
    return question.correctAnswer;
  }

  return question.correctAnswers[0] ?? '';
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
  roundTitle,
  questions,
  answersByQuestionId,
  bonusQuestionIds,
}: CalculateTournamentRoundResultParams): TournamentRoundResult => {
  const questionResults = questions.map((question) => {
    const userAnswer = answersByQuestionId[question.id];
    const isCorrect = isQuestionAnsweredCorrectly(question, userAnswer);
    const isBonus = bonusQuestionIds.includes(question.id);
    const score = isCorrect ? (isBonus ? 2 : 1) : 0;

    return {
      questionId: question.id,
      questionText: question.text,
      userAnswer,
      correctAnswer: getCorrectAnswer(question),
      isCorrect,
      isBonus,
      score,
    };
  });

  const correctAnswersCount = questionResults.filter(
    (result) => result.isCorrect
  ).length;

  const bonusCorrectCount = questionResults.filter(
    (result) => result.isBonus && result.isCorrect
  ).length;

  const score = questionResults.reduce((sum, result) => sum + result.score, 0);

  return {
    roundTitle,
    correctAnswersCount,
    questionsCount: questions.length,
    bonusCorrectCount,
    bonusAnswersCount: bonusQuestionIds.length,
    score,
    questionResults,
  };
};
