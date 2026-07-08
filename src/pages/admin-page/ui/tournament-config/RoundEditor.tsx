import { useEffect, useState } from 'react';
import type { z } from 'zod';
import isEqual from 'fast-deep-equal';

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
  onBackToConfiguration: () => void;
  onDirtyStateChange: (isDirty: boolean) => void;
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
  onBackToConfiguration,
  onDirtyStateChange,
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
    setErrors((currentErrors) => {
      if (!currentErrors[field]) {
        return currentErrors;
      }

      return {
        ...currentErrors,
        [field]: undefined,
      };
    });
  };

  const updateDraftField = <Key extends keyof TournamentRoundConfig>(
    field: Key,
    value: TournamentRoundConfig[Key],
    options?: {
      clearError?: boolean;
    }
  ) => {
    updateDraftRound(field, value);

    if (options?.clearError) {
      clearFieldError(field);
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateDraftField('title', event.target.value, {
      clearError: true,
    });
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    updateDraftField(
      'type',
      event.target.value as TournamentRoundConfig['type']
    );
  };

  const handleDifficultyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    updateDraftField(
      'difficulty',
      event.target.value as TournamentRoundConfig['difficulty']
    );
  };

  const handleQuestionsCountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const questionsCount = parseNumber(event.target.value);

    clearFieldError('questionsCount');

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
  };

  useEffect(() => {
    onDirtyStateChange(!isEqual(round, draftRound));
  }, [draftRound, round, onDirtyStateChange]);

  const handleQuestionTimeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    updateDraftField('questionTimeSeconds', parseNumber(event.target.value), {
      clearError: true,
    });
  };

  const handleCorrectionTimeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    updateDraftField('correctionTimeSeconds', parseNumber(event.target.value), {
      clearError: true,
    });
  };

  const handleBonusLimitChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    updateDraftField('bonusAnswersLimit', parseNumber(event.target.value), {
      clearError: true,
    });
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
          <Button type="submit" variant="primary">
            Save
          </Button>

          <Button
            type="button"
            variant="secondary"
            onClick={onBackToConfiguration}
          >
            Back
          </Button>

          <Button type="button" variant="secondary" onClick={onDeleteRequest}>
            Delete
          </Button>
        </div>
      </form>
    </section>
  );
};

export default RoundEditor;
