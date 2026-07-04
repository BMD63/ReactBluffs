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
    <div
      ref={setNodeRef}
      style={style}
      className="sortable-round-card"
      {...attributes}
      {...listeners}
    >
      <RoundCard {...props} />
    </div>
  );
};

export default SortableRoundCard;
