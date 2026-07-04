import { closestCenter, DndContext } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import SortableRoundCard from './SortableRoundCard';

import type { TournamentConfig } from '@/entities/tournament-config';

type SortableRoundsListProps = {
  config: TournamentConfig;
  selectedRoundId: string | null;
  onSelectRound: (roundId: string) => void;
  onReorderRounds: (activeRoundId: string, overRoundId: string) => void;
};

const SortableRoundsList = ({
  config,
  selectedRoundId,
  onSelectRound,
  onReorderRounds,
}: SortableRoundsListProps) => {
  const roundIds = config.rounds.map((round) => round.id);
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    onReorderRounds(String(active.id), String(over.id));
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={roundIds} strategy={verticalListSortingStrategy}>
        {config.rounds.map((round, index) => (
          <SortableRoundCard
            key={round.id}
            round={round}
            roundNumber={index + 1}
            isActive={round.id === selectedRoundId}
            onSelect={() => onSelectRound(round.id)}
          />
        ))}
      </SortableContext>
    </DndContext>
  );
};

export default SortableRoundsList;
