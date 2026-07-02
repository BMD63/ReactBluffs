import { useEffect, useState } from 'react';

import { Button } from '@/shared/ui/button';
import FormField from '../FormField';
import type { TournamentRoundConfig } from '@/entities/tournament-config';

type RoundEditorProps = {
  round: TournamentRoundConfig;
  onSave: (round: TournamentRoundConfig) => void;
  onDeleteRequest: () => void;
};

const formatOptionalValue = (value: number | undefined) => {
  return typeof value === 'number' ? value : '—';
};

const RoundEditor = ({ round, onSave, onDeleteRequest }: RoundEditorProps) => {
  const [title, setTitle] = useState(round.title);
  const [difficulty, setDifficulty] = useState<
    TournamentRoundConfig['difficulty']
  >(round.difficulty);

  useEffect(() => {
    setTitle(round.title);
  }, [round.id, round.title]);

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
      difficulty,
    });
  };

  return (
    <section className="admin-round-editor">
      <h3>Edit round</h3>

      <form onSubmit={handleSubmit}>
        <div className="admin-round-editor__section">
          <h4>General</h4>

          <FormField label="Title">
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Round title"
            />
          </FormField>

          <dl className="admin-round-editor__details">
            <div>
              <dt>Type</dt>
              <dd>{round.type}</dd>
            </div>

            <FormField label="Difficulty">
              <select
                value={difficulty}
                onChange={(event) =>
                  setDifficulty(event.target.value as typeof difficulty)
                }
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </FormField>
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
        <Button type="button" variant="secondary" onClick={onDeleteRequest}>
          Delete round
        </Button>
      </form>
    </section>
  );
};

export default RoundEditor;
