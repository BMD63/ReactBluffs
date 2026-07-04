import SortableRoundsList from './SortableRoundsList';
import type { TournamentConfig } from '@/entities/tournament-config';

type RoundListProps = {
  config: TournamentConfig;
  selectedRoundId: string | null;
  onSelectRound: (roundId: string) => void;
  onReorderRounds: (activeRoundId: string, overRoundId: string) => void;
};

const RoundList = ({
  config,
  selectedRoundId,
  onSelectRound,
  onReorderRounds,
}: RoundListProps) => {
  return (
    <section>
      <div className="admin-rounds-list">
        <SortableRoundsList
          config={config}
          selectedRoundId={selectedRoundId}
          onSelectRound={onSelectRound}
          onReorderRounds={onReorderRounds}
        />
      </div>
    </section>
  );
};

export default RoundList;
