import type { QuestionType } from '@/entities/question';

export type TournamentDifficulty = 'easy' | 'medium' | 'hard';

export type TournamentRoundType = QuestionType;

export type TournamentRoundConfig = {
  id: string;
  title: string;

  type: TournamentRoundType;
  difficulty: TournamentDifficulty;

  questionsCount: number;

  questionTimeSeconds: number;
  correctionTimeSeconds: number;
};

export type TournamentConfig = {
  id: string;
  title: string;

  rounds: TournamentRoundConfig[];
};
