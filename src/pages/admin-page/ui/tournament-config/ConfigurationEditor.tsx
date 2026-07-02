import { useEffect, useState } from 'react';

import { Button } from '@/shared/ui/button';
import type { TournamentConfig } from '@/entities/tournament-config';

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

  useEffect(() => {
    setTitle(config.title);
  }, [config.id, config.title]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedTitle = title.trim();

    if (!normalizedTitle) {
      return;
    }

    onSave({
      ...config,
      title: normalizedTitle,
    });
  };

  return (
    <section className="configuration-editor">
      <h2>Configuration</h2>

      <form onSubmit={handleSubmit}>
        <div className="configuration-editor__section">
          <h3>General</h3>

          <label>
            Title
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Configuration title"
            />
          </label>

          <dl className="configuration-editor__details">
            <div>
              <dt>ID</dt>
              <dd>{config.id}</dd>
            </div>

            <div>
              <dt>Rounds</dt>
              <dd>{config.rounds.length}</dd>
            </div>
          </dl>
        </div>
        <div className="configuration-editor__section">
          <h3>Rounds</h3>

          <Button type="button" variant="secondary" onClick={onAddRound}>
            + Add round
          </Button>
        </div>
        <Button variant="primary">Save</Button>
        <Button type="button" variant="secondary" onClick={onDeleteRequest}>
          Delete configuration
        </Button>
      </form>
    </section>
  );
};

export default ConfigurationEditor;
