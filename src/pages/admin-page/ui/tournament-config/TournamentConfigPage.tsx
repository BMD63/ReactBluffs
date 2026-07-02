import { useEffect, useState } from 'react';

import { Button } from '@/shared/ui/button';
import {
  tournamentConfigApi,
  type TournamentConfig,
  type TournamentRoundConfig,
} from '@/entities/tournament-config';

import ConfigurationCard from './ConfigurationCard';
import ConfigurationsPanel from './ConfigurationsPanel';
import RoundsPanel from './RoundsPanel';
import RoundEditorPanel from './RoundEditorPanel';
import RoundsList from './RoundsList';
import TournamentEditor from './TournamentEditor';

const DEFAULT_TOURNAMENT_CONFIG_ID = 'offline-quiz';

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

const TournamentConfigPage = () => {
  const [selectedConfigId, setSelectedConfigId] = useState(
    DEFAULT_TOURNAMENT_CONFIG_ID
  );

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

    setConfigs(updatedConfigs);
    setSelectedConfigId(createdConfig.id);
    setEditorTarget('config');
  };

  const updateCurrentConfig = async (
    updater: (config: TournamentConfig) => TournamentConfig
  ) => {
    if (!config) {
      return null;
    }

    const updatedConfig = updater(config);
    const savedConfig = await tournamentConfigApi.updateConfig(updatedConfig);

    setConfig(savedConfig);

    setConfigs((currentConfigs) =>
      currentConfigs.map((configItem) =>
        configItem.id === savedConfig.id ? savedConfig : configItem
      )
    );

    return savedConfig;
  };

  const handleSaveConfig = async (updatedConfig: TournamentConfig) => {
    await updateCurrentConfig(() => updatedConfig);
  };

  const handleSaveRound = async (updatedRound: TournamentRoundConfig) => {
    await updateCurrentConfig((currentConfig) => ({
      ...currentConfig,
      rounds: currentConfig.rounds.map((round) =>
        round.id === updatedRound.id ? updatedRound : round
      ),
    }));
  };

  const handleDeleteRound = async () => {
    if (!selectedRoundId) {
      return;
    }

    const deletedRoundId = selectedRoundId;

    const savedConfig = await updateCurrentConfig((currentConfig) => ({
      ...currentConfig,
      rounds: currentConfig.rounds.filter(
        (round) => round.id !== deletedRoundId
      ),
    }));

    if (!savedConfig) {
      return;
    }

    const nextSelectedRoundId = savedConfig.rounds.at(0)?.id ?? null;

    setSelectedRoundId(nextSelectedRoundId);
    setEditorTarget(nextSelectedRoundId ? 'round' : 'config');
  };

  const handleAddRound = async () => {
    const newRound = createEmptyRound();

    const savedConfig = await updateCurrentConfig((currentConfig) => ({
      ...currentConfig,
      rounds: [...currentConfig.rounds, newRound],
    }));

    if (!savedConfig) {
      return;
    }

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
          <TournamentEditor
            editorTarget={editorTarget}
            config={config}
            selectedRound={selectedRound}
            onSaveConfig={handleSaveConfig}
            onSaveRound={handleSaveRound}
            onAddRound={handleAddRound}
            onDeleteRound={handleDeleteRound}
          />
        </RoundEditorPanel>
      </div>
    </section>
  );
};

export default TournamentConfigPage;
