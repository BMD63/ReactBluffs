import type { TournamentRoundConfig } from '@/entities/tournament-config';
import { Button } from '@/shared/ui/button';

type RoundCardProps = {
  round: TournamentRoundConfig;
  roundNumber: number;
  onEdit: () => void;
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

const RoundCard = ({ round, roundNumber, onEdit }: RoundCardProps) => {
  return (
    <article className="admin-round-card">
      <div className="admin-round-card__icon">{getRoundIcon(round.type)}</div>

      <div className="admin-round-card__content">
        <p className="admin-round-card__eyebrow">Round {roundNumber}</p>

        <h3>{round.title}</h3>

        <dl className="admin-round-card__meta">
          <div>
            <dt>Type</dt>
            <dd>{round.type}</dd>
          </div>

          <div>
            <dt>Difficulty</dt>
            <dd>{round.difficulty}</dd>
          </div>

          <div>
            <dt>Questions</dt>
            <dd>{round.questionsCount}</dd>
          </div>

          <div>
            <dt>Question time</dt>
            <dd>{round.questionTimeSeconds} sec</dd>
          </div>

          <div>
            <dt>Correction time</dt>
            <dd>{round.correctionTimeSeconds} sec</dd>
          </div>

          {typeof round.bonusAnswersLimit === 'number' && (
            <div>
              <dt>Bonus limit</dt>
              <dd>{round.bonusAnswersLimit}</dd>
            </div>
          )}
        </dl>
        <Button variant="secondary" onClick={onEdit}>
          Edit
        </Button>
      </div>
    </article>
  );
};

export default RoundCard;
