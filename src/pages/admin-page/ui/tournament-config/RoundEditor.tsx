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
  return typeof value === 'number' ? String(value) : '—';
};

const parseNumber = (value: string) => {
  const parsed = Number(value);

  return Number.isFinite(parsed) ? parsed : 0;
};

const RoundEditor = ({ round, onSave, onDeleteRequest }: RoundEditorProps) => {
  const [draftRound, setDraftRound] = useState(round);

  useEffect(() => {
    setDraftRound(round);
  }, [round]);

  const updateDraftRound = <Key extends keyof TournamentRoundConfig>(
    field: Key,
    value: TournamentRoundConfig[Key]
  ) => {
    setDraftRound((currentRound) => ({
      ...currentRound,
      [field]: value,
    }));
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateDraftRound('title', event.target.value);
  };

  const handleDifficultyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    updateDraftRound(
      'difficulty',
      event.target.value as TournamentRoundConfig['difficulty']
    );
  };

  const handleQuestionsCountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    updateDraftRound('questionsCount', parseNumber(event.target.value));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedTitle = draftRound.title.trim();

    if (!normalizedTitle) {
      return;
    }

    onSave({
      ...draftRound,
      title: normalizedTitle,
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
              value={draftRound.title}
              onChange={handleTitleChange}
              placeholder="Round title"
            />
          </FormField>

          <FormField label="Type">
            <input value={round.type} readOnly />
          </FormField>

          <FormField label="Difficulty">
            <select
              value={draftRound.difficulty}
              onChange={handleDifficultyChange}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </FormField>
        </div>

        <div className="admin-round-editor__section">
          <h4>Questions</h4>

          <FormField label="Questions count">
            <input
              type="number"
              min={1}
              value={draftRound.questionsCount}
              onChange={handleQuestionsCountChange}
            />
          </FormField>
        </div>

        <div className="admin-round-editor__section">
          <h4>Timing</h4>

          <FormField label="Question time">
            <input value={`${round.questionTimeSeconds} sec`} readOnly />
          </FormField>

          <FormField label="Correction time">
            <input value={`${round.correctionTimeSeconds} sec`} readOnly />
          </FormField>
        </div>

        <div className="admin-round-editor__section">
          <h4>Bonus</h4>

          <FormField label="Bonus answers limit">
            <input
              value={formatOptionalValue(round.bonusAnswersLimit)}
              readOnly
            />
          </FormField>
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
