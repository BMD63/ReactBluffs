import { useEffect, useState } from 'react';

import { Button } from '@/shared/ui/button';
import type { TournamentRoundConfig } from '@/entities/tournament-config';

type RoundEditorProps = {
  round: TournamentRoundConfig;
  onSave: (round: TournamentRoundConfig) => void;
};

const formatOptionalValue = (value: number | undefined) => {
  return typeof value === 'number' ? value : '—';
};

const RoundEditor = ({ round, onSave }: RoundEditorProps) => {
  const [title, setTitle] = useState(round.title);

  useEffect(() => {
    setTitle(round.title);
  }, [round.id, round.title]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedTitle = title.trim();

    if (!normalizedTitle) {
      return;
    }

    onSave({
      ...round,
      title: normalizedTitle,
    });
  };

  return (
    <section className="admin-round-editor">
      <h3>Edit round</h3>

      <form onSubmit={handleSubmit}>
        <div className="admin-round-editor__section">
          <h4>General</h4>

          <label>
            Title
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Round title"
            />
          </label>

          <dl className="admin-round-editor__details">
            <div>
              <dt>Type</dt>
              <dd>{round.type}</dd>
            </div>

            <div>
              <dt>Difficulty</dt>
              <dd>{round.difficulty}</dd>
            </div>
          </dl>
        </div>

        <div className="admin-round-editor__section">
          <h4>Questions</h4>

          <dl className="admin-round-editor__details">
            <div>
              <dt>Questions count</dt>
              <dd>{round.questionsCount}</dd>
            </div>
          </dl>
        </div>

        <div className="admin-round-editor__section">
          <h4>Timing</h4>

          <dl className="admin-round-editor__details">
            <div>
              <dt>Question time</dt>
              <dd>{round.questionTimeSeconds} sec</dd>
            </div>

            <div>
              <dt>Correction time</dt>
              <dd>{round.correctionTimeSeconds} sec</dd>
            </div>
          </dl>
        </div>

        <div className="admin-round-editor__section">
          <h4>Bonus</h4>

          <dl className="admin-round-editor__details">
            <div>
              <dt>Bonus answers limit</dt>
              <dd>{formatOptionalValue(round.bonusAnswersLimit)}</dd>
            </div>
          </dl>
        </div>

        <Button variant="primary">Save</Button>
      </form>
    </section>
  );
};

export default RoundEditor;
