import { useEffect, useMemo, useState } from 'react';

import type { TournamentConfig } from '@/entities/tournament-config';
import { Button } from '@/shared/ui/button';

import EditorSection from '../EditorSection';
import FormField from '../FormField';

type ConfigurationEditorProps = {
  config: TournamentConfig;
  onSave: (config: TournamentConfig) => void;
  onAddRound: (config: TournamentConfig) => void;
  onDeleteRequest: () => void;
  onDirtyStateChange: (isDirty: boolean) => void;
  onDraftChange: (config: TournamentConfig) => void;
};

const ConfigurationEditor = ({
  config,
  onSave,
  onAddRound,
  onDeleteRequest,
  onDirtyStateChange,
  onDraftChange,
}: ConfigurationEditorProps) => {
  const [title, setTitle] = useState(config.title);
  const [description, setDescription] = useState(config.description);

  const draftConfig = useMemo<TournamentConfig>(
    () => ({
      ...config,
      title: title.trim(),
      description: description.trim(),
    }),
    [config, title, description]
  );

  const hasUnsavedChanges =
    title !== config.title || description !== config.description;

  useEffect(() => {
    setTitle(config.title);
    setDescription(config.description);
  }, [config]);

  useEffect(() => {
    onDraftChange(draftConfig);
    onDirtyStateChange(hasUnsavedChanges);
  }, [draftConfig, hasUnsavedChanges, onDraftChange, onDirtyStateChange]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSave(draftConfig);
  };

  const handleAddRound = () => {
    onAddRound(draftConfig);
  };

  return (
    <section className="configuration-editor">
      <h2>Configuration</h2>

      <form onSubmit={handleSubmit}>
        <EditorSection title="General">
          <FormField label="Title">
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Configuration title"
            />
          </FormField>

          <FormField label="Description">
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Configuration description"
              rows={4}
            />
          </FormField>

          <FormField label="Rounds">
            <input value={config.rounds.length} readOnly />
          </FormField>
        </EditorSection>

        <EditorSection title="Rounds">
          <Button type="button" variant="secondary" onClick={handleAddRound}>
            Add round
          </Button>
        </EditorSection>

        <div className="admin-editor-actions">
          <Button type="submit" variant="primary">
            Save
          </Button>

          <Button type="button" variant="secondary" onClick={onDeleteRequest}>
            Delete
          </Button>
        </div>
      </form>
    </section>
  );
};

export default ConfigurationEditor;
