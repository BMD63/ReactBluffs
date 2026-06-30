import { useEffect, useState } from 'react';

import TournamentConfigAdmin from './TournamentConfigAdmin';
import TournamentConfigHeader from './TournamentConfigHeader';

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
      <TournamentConfigHeader
        configs={configs}
        selectedConfigId={selectedConfigId}
        selectedConfig={config}
        onSelectConfig={setSelectedConfigId}
        onCreateConfig={() => {
          console.log('Create configuration');
        }}
      />

      <TournamentConfigAdmin config={config} />
    </section>
  );
};

export default TournamentConfigManager;
