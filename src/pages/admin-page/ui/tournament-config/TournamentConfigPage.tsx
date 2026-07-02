import { useEffect, useState } from 'react';
import { Button } from '@/shared/ui/button';
import ConfigurationCard from './ConfigurationCard';
import ConfigurationsPanel from './ConfigurationsPanel';
import RoundsPanel from './RoundsPanel';
import RoundEditor from './RoundEditor';
import RoundEditorPanel from './RoundEditorPanel';
import ConfigurationEditor from './ConfigurationEditor';
import {
  tournamentConfigApi,
  type TournamentConfig,
} from '@/entities/tournament-config';
import RoundsList from './RoundsList';

const DEFAULT_TOURNAMENT_CONFIG_ID = 'offline-quiz';

const TournamentConfigPage = () => {
  const [selectedConfigId, setSelectedConfigId] = useState(
    DEFAULT_TOURNAMENT_CONFIG_ID
  );

  const createEmptyTournamentConfig = (): TournamentConfig => {
    const configId = crypto.randomUUID();

    return {
      id: configId,
      title: 'New configuration',

      rounds: [],
    };
  };

  const createEmptyRound = () => {
    return {
      id: crypto.randomUUID(),
      title: 'New round',
      type: 'openText' as const,
      difficulty: 'easy' as const,
      questionsCount: 1,
      questionTimeSeconds: 30,
      correctionTimeSeconds: 60,
    };
  };

  const [configs, setConfigs] = useState<TournamentConfig[]>([]);
  const [config, setConfig] = useState<TournamentConfig | null>();
  const [selectedRoundId, setSelectedRoundId] = useState<string | null>(null);
  const [editorTarget, setEditorTarget] = useState<'config' | 'round'>(
    'config'
  );

  useEffect(() => {
    tournamentConfigApi.getConfigs().then(setConfigs);
  }, []);

  useEffect(() => {
    tournamentConfigApi.getConfig(selectedConfigId).then((loadedConfig) => {
      setConfig(loadedConfig);

      if (!loadedConfig) {
        setSelectedRoundId(null);
        return;
      }

      setSelectedRoundId(loadedConfig.rounds.at(0)?.id ?? null);
    });
  }, [selectedConfigId]);

  const handleCreateConfig = async () => {
    const newConfig = createEmptyTournamentConfig();
    const createdConfig = await tournamentConfigApi.createConfig(newConfig);
    const updatedConfigs = await tournamentConfigApi.getConfigs();

    setConfigs(await tournamentConfigApi.getConfigs());
    setSelectedConfigId(createdConfig.id);
  };

  const handleSaveConfig = async (updatedConfig: TournamentConfig) => {
    const savedConfig = await tournamentConfigApi.updateConfig(updatedConfig);

    setConfig(savedConfig);

    setConfigs((currentConfigs) =>
      currentConfigs.map((configItem) =>
        configItem.id === savedConfig.id ? savedConfig : configItem
      )
    );
  };

  const handleAddRound = async () => {
    if (!config) {
      return;
    }

    const newRound = createEmptyRound();

    const updatedConfig: TournamentConfig = {
      ...config,
      rounds: [...config.rounds, newRound],
    };

    const savedConfig = await tournamentConfigApi.updateConfig(updatedConfig);

    setConfig(savedConfig);

    setConfigs((currentConfigs) =>
      currentConfigs.map((configItem) =>
        configItem.id === savedConfig.id ? savedConfig : configItem
      )
    );

    setSelectedRoundId(newRound.id);
    setEditorTarget('round');
  };

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

            <Button variant="secondary" onClick={handleCreateConfig}>
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
                  setEditorTarget('config');
                }}
              />
            ))}
          </div>
        </ConfigurationsPanel>

        <RoundsPanel>
          <RoundsList
            config={config}
            selectedRoundId={selectedRoundId}
            onSelectRound={(roundId) => {
              setSelectedRoundId(roundId);
              setEditorTarget('round');
            }}
          />
        </RoundsPanel>

        <RoundEditorPanel>
          {editorTarget === 'config' && (
            <ConfigurationEditor
              config={config}
              onSave={handleSaveConfig}
              onAddRound={handleAddRound}
            />
          )}

          {editorTarget === 'round' &&
            (selectedRound ? (
              <RoundEditor round={selectedRound} />
            ) : (
              <p>Select a round to edit.</p>
            ))}
        </RoundEditorPanel>
      </div>
    </section>
  );
};

export default TournamentConfigPage;
