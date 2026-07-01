import { useEffect, useState } from 'react';
import { Button } from '@/shared/ui/button';
import ConfigurationCard from './ConfigurationCard';
import ConfigurationsPanel from './ConfigurationsPanel';
import RoundsPanel from './RoundsPanel';
import RoundEditor from './RoundEditor';
import RoundEditorPanel from './RoundEditorPanel';
import {
  tournamentConfigApi,
  type TournamentConfig,
} from '@/entities/tournament-config';
import RoundList from './RoundsList';

const DEFAULT_TOURNAMENT_CONFIG_ID = 'offline-quiz';

const TournamentConfigPage = () => {
  const [selectedConfigId, setSelectedConfigId] = useState(
    DEFAULT_TOURNAMENT_CONFIG_ID
  );

  const [configs, setConfigs] = useState<TournamentConfig[]>([]);
  const [config, setConfig] = useState<TournamentConfig | null>();
  const [selectedRoundId, setSelectedRoundId] = useState<string | null>(null);

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

  const selectedRound =
    config.rounds.find((round) => round.id === selectedRoundId) ?? null;

  return (
    <section className="tournament-config-page">
      <div className="tournament-config-page__layout">
        <ConfigurationsPanel>
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
        </ConfigurationsPanel>

        <RoundsPanel>
          <RoundList
            config={config}
            selectedRoundId={selectedRoundId}
            onSelectRound={setSelectedRoundId}
          />
        </RoundsPanel>

        <RoundEditorPanel>
          {selectedRound ? (
            <RoundEditor round={selectedRound} />
          ) : (
            <p>Select a round to edit.</p>
          )}
        </RoundEditorPanel>
      </div>
    </section>
  );
};

export default TournamentConfigPage;
