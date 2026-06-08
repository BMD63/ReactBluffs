import type { Question } from '@/entities/question/model/questionTypes';
import type { TournamentConfig } from '@/entities/tournament-config';

type CreateTournamentQuestionPlanParams = {
  tournamentConfig: TournamentConfig;
  questionsByRoundId: Record<string, Question[]>;
};

type TournamentQuestionPlan = {
  questionIdsByRoundId: Record<string, string[]>;
  questionsById: Record<string, Question>;
};

const shuffleQuestions = (questions: Question[]): Question[] => {
  const shuffledQuestions = [...questions];

  for (let index = shuffledQuestions.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(Math.random() * (index + 1));

    const currentQuestion = shuffledQuestions[index];
    const randomQuestion = shuffledQuestions[randomIndex];

    if (!currentQuestion || !randomQuestion) {
      continue;
    }

    shuffledQuestions[index] = randomQuestion;
    shuffledQuestions[randomIndex] = currentQuestion;
  }

  return shuffledQuestions;
};

export const createTournamentQuestionPlan = ({
  tournamentConfig,
  questionsByRoundId,
}: CreateTournamentQuestionPlanParams): TournamentQuestionPlan => {
  const usedQuestionIds = new Set<string>();
  const questionIdsByRoundId: Record<string, string[]> = {};
  const questionsById: Record<string, Question> = {};

  tournamentConfig.rounds.forEach((round) => {
    const roundQuestions = questionsByRoundId[round.id] ?? [];

    const availableQuestions = roundQuestions.filter(
      (question) => !usedQuestionIds.has(question.id)
    );

    const selectedQuestions = shuffleQuestions(availableQuestions).slice(
      0,
      round.questionsCount
    );

    if (selectedQuestions.length < round.questionsCount) {
      throw new Error(
        `Not enough questions for round "${round.title}". Required: ${round.questionsCount}, available: ${availableQuestions.length}`
      );
    }

    questionIdsByRoundId[round.id] = selectedQuestions.map(
      (question) => question.id
    );

    selectedQuestions.forEach((question) => {
      usedQuestionIds.add(question.id);
      questionsById[question.id] = question;
    });
  });

  return {
    questionIdsByRoundId,
    questionsById,
  };
};
