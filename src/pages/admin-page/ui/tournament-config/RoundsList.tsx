import RoundCard from './RoundCard';

import type { TournamentConfig } from '@/entities/tournament-config';

type RoundList = {
  config: TournamentConfig;
  selectedRoundId: string | null;
  onSelectRound: (roundId: string) => void;
};

const RoundList = ({ config, selectedRoundId, onSelectRound }: RoundList) => {
  return (
    <section>
      <div className="admin-rounds-list">
        {config.rounds.map((round, index) => (
          <RoundCard
            key={round.id}
            round={round}
            roundNumber={index + 1}
            isActive={round.id === selectedRoundId}
            onSelect={() => {
              onSelectRound(round.id);
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default RoundList;
