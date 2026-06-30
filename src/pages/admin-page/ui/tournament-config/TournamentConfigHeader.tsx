import type { TournamentConfig } from '@/entities/tournament-config';
import { Button } from '@/shared/ui/button';
type TournamentConfigHeaderProps = {
  configs: TournamentConfig[];
  selectedConfigId: string;
  selectedConfig: TournamentConfig;
  onSelectConfig: (configId: string) => void;
  onCreateConfig: () => void;
};

const TournamentConfigHeader = ({
  configs,
  selectedConfigId,
  selectedConfig,
  onSelectConfig,
  onCreateConfig,
}: TournamentConfigHeaderProps) => {
  return (
    <section className="admin-config-header">
      <p className="admin-config-header__eyebrow">Tournament configuration</p>

      <div className="admin-config-header__controls">
        <label className="admin-config-header__select">
          Configuration
          <select
            value={selectedConfigId}
            onChange={(event) => onSelectConfig(event.target.value)}
          >
            {configs.map((config) => (
              <option key={config.id} value={config.id}>
                {config.title}
              </option>
            ))}
          </select>
        </label>

        <Button variant="secondary" onClick={onCreateConfig}>
          New configuration
        </Button>
      </div>

      <div className="admin-config-header__summary">
        <h2>{selectedConfig.title}</h2>

        <p>{selectedConfig.rounds.length} rounds</p>
      </div>
    </section>
  );
};

export default TournamentConfigHeader;
