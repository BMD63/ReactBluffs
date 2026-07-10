import type { TournamentConfig } from '../../src/entities/tournament-config';

type TournamentConfigRow = {
  id: string;
  title: string;
  description: string | null;
  rounds: unknown;
};

export const mapTournamentConfigRowToDto = (
  row: TournamentConfigRow
): TournamentConfig => {
  return {
    id: row.id,
    title: row.title,
    description: row.description ?? '',
    rounds: Array.isArray(row.rounds) ? row.rounds : [],
  };
};
