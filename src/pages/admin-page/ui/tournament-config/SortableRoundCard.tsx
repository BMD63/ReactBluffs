import type { ComponentProps } from 'react';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import RoundCard from './RoundCard';

type SortableRoundCardProps = ComponentProps<typeof RoundCard>;

const SortableRoundCard = (props: SortableRoundCardProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: props.round.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="sortable-round-card">
      <button
        type="button"
        className="sortable-round-card__handle"
        aria-label={`Move round ${props.roundNumber}`}
        {...attributes}
        {...listeners}
      >
        ⋮⋮
      </button>

      <RoundCard {...props} />
    </div>
  );
};

export default SortableRoundCard;
