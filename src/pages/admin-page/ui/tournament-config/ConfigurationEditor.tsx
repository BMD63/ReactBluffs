import { useEffect, useState } from 'react';

import { Button } from '@/shared/ui/button';
import EditorSection from '../EditorSection';

import type { TournamentConfig } from '@/entities/tournament-config';

import FormField from '../FormField';

type ConfigurationEditorProps = {
  config: TournamentConfig;
  onSave: (config: TournamentConfig) => void;
  onAddRound: () => void;
  onDeleteRequest: () => void;
};

const ConfigurationEditor = ({
  config,
  onSave,
  onAddRound,
  onDeleteRequest,
}: ConfigurationEditorProps) => {
  const [title, setTitle] = useState(config.title);
  const [description, setDescription] = useState(config.description);

  useEffect(() => {
    setTitle(config.title);
    setDescription(config.description);
  }, [config]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedTitle = title.trim();

    if (!normalizedTitle) {
      return;
    }

    onSave({
      ...config,
      title: normalizedTitle,
      description: description.trim(),
    });
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

          {/* <FormField label="ID">
            <input value={config.id} readOnly />
          </FormField> */}

          <FormField label="Rounds">
            <input value={config.rounds.length} readOnly />
          </FormField>
        </EditorSection>

        <EditorSection title="Rounds">
          <Button type="button" variant="secondary" onClick={onAddRound}>
            + Add round
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
