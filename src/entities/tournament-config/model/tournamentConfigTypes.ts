import type { QuestionType } from '@/entities/question';

export const TOURNAMENT_DIFFICULTIES = ['easy', 'medium', 'hard'] as const;

export type TournamentDifficulty = (typeof TOURNAMENT_DIFFICULTIES)[number];

export type TournamentRoundType = QuestionType;

export type TournamentRoundConfig = {
  id: string;
  title: string;

  type: TournamentRoundType;
  difficulty: TournamentDifficulty;

  questionsCount: number;

  questionTimeSeconds: number;
  correctionTimeSeconds: number;

  bonusAnswersLimit?: number;
};

export type TournamentConfig = {
  id: string;
  title: string;
  description: string;

  rounds: TournamentRoundConfig[];
};
