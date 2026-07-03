import { useEffect, useState } from 'react';

import { Button } from '@/shared/ui/button';
import FormField from '../FormField';
import type { TournamentRoundConfig } from '@/entities/tournament-config';

type RoundEditorProps = {
  round: TournamentRoundConfig;
  onSave: (round: TournamentRoundConfig) => void;
  onDeleteRequest: () => void;
  onBonusLimitReset?: () => void;
};

const parseNumber = (value: string) => {
  const parsed = Number(value);

  return Number.isFinite(parsed) ? parsed : 0;
};

const RoundEditor = ({
  round,
  onSave,
  onDeleteRequest,
  onBonusLimitReset,
}: RoundEditorProps) => {
  const [draftRound, setDraftRound] = useState<TournamentRoundConfig>(round);

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

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    updateDraftRound(
      'type',
      event.target.value as TournamentRoundConfig['type']
    );
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
    const questionsCount = parseNumber(event.target.value);

    setDraftRound((currentRound) => {
      const shouldResetBonusLimit =
        (currentRound.bonusAnswersLimit ?? 0) > questionsCount;

      if (shouldResetBonusLimit) {
        onBonusLimitReset?.();
      }

      return {
        ...currentRound,
        questionsCount,
        bonusAnswersLimit: shouldResetBonusLimit
          ? 0
          : (currentRound.bonusAnswersLimit ?? 0),
      };
    });
  };

  const handleQuestionTimeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    updateDraftRound('questionTimeSeconds', parseNumber(event.target.value));
  };

  const handleCorrectionTimeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    updateDraftRound('correctionTimeSeconds', parseNumber(event.target.value));
  };

  const handleBonusLimitChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    updateDraftRound('bonusAnswersLimit', parseNumber(event.target.value));
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
            <select value={draftRound.type} onChange={handleTypeChange}>
              <option value="openText">Open text</option>
              <option value="multipleChoice">Multiple choice</option>
              <option value="bluff">Bluff</option>
            </select>
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

          <FormField label="Question time (sec)">
            <input
              type="number"
              min={1}
              value={draftRound.questionTimeSeconds}
              onChange={handleQuestionTimeChange}
            />
          </FormField>

          <FormField label="Correction time (sec)">
            <input
              type="number"
              min={0}
              value={draftRound.correctionTimeSeconds}
              onChange={handleCorrectionTimeChange}
            />
          </FormField>
        </div>

        <div className="admin-round-editor__section">
          <h4>Bonus</h4>

          <FormField label="Bonus answers limit">
            <input
              type="number"
              min={0}
              max={draftRound.questionsCount}
              value={draftRound.bonusAnswersLimit ?? 0}
              onChange={handleBonusLimitChange}
            />
          </FormField>
        </div>

        <div className="admin-editor-actions">
          <Button variant="primary">Save</Button>

          <Button type="button" variant="secondary" onClick={onDeleteRequest}>
            Delete round
          </Button>
        </div>
      </form>
    </section>
  );
};

export default RoundEditor;
