import { useEffect, useState } from 'react';
import { Button } from '@/shared/ui/button';
import TournamentConfigAdmin from './TournamentConfigAdmin';
import ConfigurationCard from './ConfigurationCard';

import {
  tournamentConfigApi,
  type TournamentConfig,
} from '@/entities/tournament-config';

const DEFAULT_TOURNAMENT_CONFIG_ID = 'offline-quiz';

const TournamentConfigManager = () => {
  const [selectedConfigId, setSelectedConfigId] = useState(
    DEFAULT_TOURNAMENT_CONFIG_ID
  );

  const [configs, setConfigs] = useState<TournamentConfig[]>([]);
  const [config, setConfig] = useState<TournamentConfig | null>();

  useEffect(() => {
    tournamentConfigApi.getConfigs().then(setConfigs);
  }, []);

  useEffect(() => {
    tournamentConfigApi.getConfig(selectedConfigId).then(setConfig);
  }, [selectedConfigId]);

  if (config === undefined) {
    return <p>Loading...</p>;
  }

  if (config === null) {
    return <p>Tournament configuration not found.</p>;
  }

  return (
    <section>
      <div className="admin-config-manager__header">
        <div>
          <p className="admin-config-header__eyebrow">Configurations</p>
          <h2>Choose configuration</h2>
        </div>

        <Button
          variant="secondary"
          onClick={() => {
            console.log('Create configuration');
          }}
        >
          New configuration
        </Button>
      </div>
      <div className="admin-config-cards">
        {configs.map((configItem) => (
          <ConfigurationCard
            key={configItem.id}
            config={configItem}
            isActive={configItem.id === selectedConfigId}
            onOpen={() => {
              setSelectedConfigId(configItem.id);
            }}
          />
        ))}
      </div>

      <TournamentConfigAdmin config={config} />
    </section>
  );
};

export default TournamentConfigManager;
