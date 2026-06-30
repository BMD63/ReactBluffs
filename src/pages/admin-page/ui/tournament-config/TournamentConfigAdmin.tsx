import { useState } from 'react';

import RoundCard from './RoundCard';
import RoundEditor from './RoundEditor';

import type { TournamentConfig } from '@/entities/tournament-config';

type TournamentConfigAdminProps = {
  config: TournamentConfig;
};

const TournamentConfigAdmin = ({ config }: TournamentConfigAdminProps) => {
  const [selectedRoundId, setSelectedRoundId] = useState<string | null>(null);

  const selectedRound =
    config.rounds.find((round) => round.id === selectedRoundId) ?? null;

  return (
    <section>
      <div className="admin-config-layout">
        <div className="admin-rounds-list">
          {config.rounds.map((round, index) => (
            <RoundCard
              key={round.id}
              round={round}
              roundNumber={index + 1}
              onEdit={() => {
                setSelectedRoundId(round.id);
              }}
            />
          ))}
        </div>

        <div className="admin-config-layout__editor">
          {selectedRound ? (
            <RoundEditor round={selectedRound} />
          ) : (
            <p>Select a round to edit.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default TournamentConfigAdmin;
