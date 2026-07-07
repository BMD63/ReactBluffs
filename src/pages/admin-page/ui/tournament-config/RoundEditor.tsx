import { useEffect, useState } from 'react';
import type { z } from 'zod';

import { Button } from '@/shared/ui/button';
import {
  roundSchema,
  type TournamentRoundConfig,
} from '@/entities/tournament-config';

import FormField from '../FormField';
import EditorSection from '../EditorSection';

type RoundEditorProps = {
  round: TournamentRoundConfig;
  onSave: (round: TournamentRoundConfig) => void;
  onDeleteRequest: () => void;
  onBonusLimitReset: () => void;
};

type RoundFormErrors = z.inferFlattenedErrors<
  typeof roundSchema
>['fieldErrors'];

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
  const [errors, setErrors] = useState<RoundFormErrors>({});

  useEffect(() => {
    setDraftRound(round);
    setErrors({});
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

  const clearFieldError = (field: keyof RoundFormErrors) => {
    setErrors((currentErrors) => ({
      ...currentErrors,
      [field]: undefined,
    }));
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateDraftRound('title', event.target.value);
    clearFieldError('title');
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    updateDraftRound(
      'type',
      event.target.value as TournamentRoundConfig['type']
    );
    clearFieldError('type');
  };

  const handleDifficultyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    updateDraftRound(
      'difficulty',
      event.target.value as TournamentRoundConfig['difficulty']
    );
    clearFieldError('difficulty');
  };

  const handleQuestionsCountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const questionsCount = parseNumber(event.target.value);

    setDraftRound((currentRound) => {
      const shouldResetBonusLimit =
        (currentRound.bonusAnswersLimit ?? 0) > questionsCount;

      if (shouldResetBonusLimit) {
        onBonusLimitReset();
      }

      return {
        ...currentRound,
        questionsCount,
        bonusAnswersLimit: shouldResetBonusLimit
          ? 0
          : (currentRound.bonusAnswersLimit ?? 0),
      };
    });
    clearFieldError('questionsCount');
  };

  const handleQuestionTimeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    updateDraftRound('questionTimeSeconds', parseNumber(event.target.value));
    clearFieldError('questionTimeSeconds');
  };

  const handleCorrectionTimeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    updateDraftRound('correctionTimeSeconds', parseNumber(event.target.value));
    clearFieldError('correctionTimeSeconds');
  };

  const handleBonusLimitChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    updateDraftRound('bonusAnswersLimit', parseNumber(event.target.value));
    clearFieldError('bonusAnswersLimit');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = roundSchema.safeParse(draftRound);

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return;
    }

    setErrors({});

    onSave(result.data);
  };

  return (
    <section className="admin-round-editor">
      <h3>Edit round</h3>

      <form onSubmit={handleSubmit}>
        <EditorSection title="General">
          <FormField label="Title" error={errors.title?.[0]}>
            <input
              value={draftRound.title}
              onChange={handleTitleChange}
              placeholder="Round title"
            />
          </FormField>

          <FormField label="Type" error={errors.type?.[0]}>
            <select value={draftRound.type} onChange={handleTypeChange}>
              <option value="openText">Open text</option>
              <option value="multipleChoice">Multiple choice</option>
              <option value="bluff">Bluff</option>
            </select>
          </FormField>

          <FormField label="Difficulty" error={errors.difficulty?.[0]}>
            <select
              value={draftRound.difficulty}
              onChange={handleDifficultyChange}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </FormField>
        </EditorSection>

        <EditorSection title="Questions">
          <FormField label="Questions count" error={errors.questionsCount?.[0]}>
            <input
              type="number"
              min={1}
              value={draftRound.questionsCount}
              onChange={handleQuestionsCountChange}
            />
          </FormField>
        </EditorSection>

        <EditorSection title="Timing">
          <FormField
            label="Question time (sec)"
            error={errors.questionTimeSeconds?.[0]}
          >
            <input
              type="number"
              min={1}
              value={draftRound.questionTimeSeconds}
              onChange={handleQuestionTimeChange}
            />
          </FormField>

          <FormField
            label="Correction time (sec)"
            error={errors.correctionTimeSeconds?.[0]}
          >
            <input
              type="number"
              min={0}
              value={draftRound.correctionTimeSeconds}
              onChange={handleCorrectionTimeChange}
            />
          </FormField>
        </EditorSection>

        <EditorSection title="Bonus">
          <FormField
            label="Bonus answers limit"
            error={errors.bonusAnswersLimit?.[0]}
          >
            <input
              type="number"
              min={0}
              max={draftRound.questionsCount}
              value={draftRound.bonusAnswersLimit ?? 0}
              onChange={handleBonusLimitChange}
            />
          </FormField>
        </EditorSection>

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
