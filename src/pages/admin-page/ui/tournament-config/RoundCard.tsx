import type { TournamentRoundConfig } from '@/entities/tournament-config';

type RoundCardProps = {
  round: TournamentRoundConfig;
  roundNumber: number;
  isActive: boolean;
  onSelect: () => void;
};

const getRoundIcon = (type: TournamentRoundConfig['type']) => {
  if (type === 'audio') {
    return '🎵';
  }

  if (type === 'image') {
    return '🖼️';
  }

  if (type === 'boolean') {
    return '🎭';
  }

  if (type === 'multipleChoice') {
    return '☑️';
  }

  return '✍️';
};

const RoundCard = ({
  round,
  roundNumber,
  isActive,
  onSelect,
}: RoundCardProps) => {
  return (
    <button
      type="button"
      className={
        isActive
          ? 'admin-round-card admin-round-card--active'
          : 'admin-round-card'
      }
      onClick={onSelect}
    >
      <div className="admin-round-card__icon">{getRoundIcon(round.type)}</div>

      <p className="admin-round-card__eyebrow">Round {roundNumber}</p>

      <h3>{round.title}</h3>

      <p className="admin-round-card__summary">
        {round.difficulty} · {round.questionsCount} questions
      </p>

      <p className="admin-round-card__time">{round.questionTimeSeconds} sec</p>
    </button>
  );
};

export default RoundCard;
