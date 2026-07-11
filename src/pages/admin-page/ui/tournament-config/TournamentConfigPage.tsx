import { useEffect, useState } from 'react';
import isEqual from 'fast-deep-equal';
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
import ConfirmActionModal from '../ConfirmActionModal';

type TournamentConfigPageProps = {
  adminToken: string | null;
  onStatusChange: (message: string) => void;
};

const DEFAULT_TOURNAMENT_CONFIG_ID = 'offline-quiz';
const CONFIG_DELETE_DELAY_MS = 500;
const ROUND_DELETE_DELAY_MS = 500;

const wait = (delay: number) =>
  new Promise<void>((resolve) => {
    window.setTimeout(resolve, delay);
  });

const createEmptyTournamentConfig = (): TournamentConfig => {
  const configId = crypto.randomUUID();

  return {
    id: configId,
    title: 'New configuration',
    description: '',
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

const reorderItems = <Item,>(
  items: Item[],
  fromIndex: number,
  toIndex: number
) => {
  const updatedItems = [...items];
  const [movedItem] = updatedItems.splice(fromIndex, 1);

  if (!movedItem) {
    return items;
  }

  updatedItems.splice(toIndex, 0, movedItem);

  return updatedItems;
};

const TournamentConfigPage = ({
  adminToken,
  onStatusChange,
}: TournamentConfigPageProps) => {
  const [selectedConfigId, setSelectedConfigId] = useState(
    DEFAULT_TOURNAMENT_CONFIG_ID
  );

  const [configs, setConfigs] = useState<TournamentConfig[]>([]);
  const [config, setConfig] = useState<TournamentConfig | null>();
  const [selectedRoundId, setSelectedRoundId] = useState<string | null>(null);
  const [editorTarget, setEditorTarget] = useState<'config' | 'round'>(
    'config'
  );
  const [isDeleteConfigConfirmOpen, setIsDeleteConfigConfirmOpen] =
    useState(false);

  const [isDeleteRoundConfirmOpen, setIsDeleteRoundConfirmOpen] =
    useState(false);

  const [newUnsavedRoundId, setNewUnsavedRoundId] = useState<string | null>(
    null
  );

  const [hasUnsavedRoundChanges, setHasUnsavedRoundChanges] = useState(false);

  useEffect(() => {
    tournamentConfigApi.getConfigs().then(setConfigs);
  }, []);

  const [isBackConfirmOpen, setIsBackConfirmOpen] = useState(false);

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

  const getAdminRequestParams = () => {
    if (!adminToken) {
      onStatusChange('Admin token is missing');
      return null;
    }

    return { adminToken };
  };

  const handleCreateConfig = async () => {
    const adminRequestParams = getAdminRequestParams();

    if (!adminRequestParams) {
      return;
    }

    const newConfig = createEmptyTournamentConfig();

    const createdConfig = await tournamentConfigApi.createConfig(
      newConfig,
      adminRequestParams
    );

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

    const adminRequestParams = getAdminRequestParams();

    if (!adminRequestParams) {
      return null;
    }

    const previousConfig = config;
    const updatedConfig = updater(previousConfig);

    // Сначала мгновенно обновляем интерфейс.
    setConfig(updatedConfig);

    setConfigs((currentConfigs) =>
      currentConfigs.map((configItem) =>
        configItem.id === updatedConfig.id ? updatedConfig : configItem
      )
    );

    try {
      const savedConfig = await tournamentConfigApi.updateConfig(
        updatedConfig,
        adminRequestParams
      );

      return savedConfig;
    } catch (error) {
      /*
       * Откатываем состояние, только если после отправки запроса
       * пользователь не успел сделать ещё одно изменение.
       *
       * Иначе поздняя ошибка старого запроса могла бы затереть
       * более новое состояние формы.
       */
      setConfig((currentConfig) => {
        if (
          currentConfig?.id === updatedConfig.id &&
          isEqual(currentConfig, updatedConfig)
        ) {
          return previousConfig;
        }

        return currentConfig;
      });

      setConfigs((currentConfigs) =>
        currentConfigs.map((configItem) => {
          if (
            configItem.id === updatedConfig.id &&
            isEqual(configItem, updatedConfig)
          ) {
            return previousConfig;
          }

          return configItem;
        })
      );

      onStatusChange(
        error instanceof Error
          ? `Failed to update configuration: ${error.message}`
          : 'Failed to update configuration'
      );

      return null;
    }
  };

  const handleSaveConfig = async (updatedConfig: TournamentConfig) => {
    const savedConfig = await updateCurrentConfig(() => updatedConfig);

    if (!savedConfig) {
      return;
    }

    onStatusChange('Configuration updated!');
  };

  const handleSaveRound = async (updatedRound: TournamentRoundConfig) => {
    const savedConfig = await updateCurrentConfig((currentConfig) => ({
      ...currentConfig,
      rounds: currentConfig.rounds.map((round) =>
        round.id === updatedRound.id ? updatedRound : round
      ),
    }));

    if (!savedConfig) {
      return;
    }

    if (updatedRound.id === newUnsavedRoundId) {
      setNewUnsavedRoundId(null);
    }

    onStatusChange('Round updated!');
  };

  const handleBonusLimitReset = () => {
    onStatusChange(
      'Bonus answers limit was reset because it cannot exceed the questions count.'
    );
  };

  const handleBackToConfiguration = () => {
    const isNewUnsavedRound = selectedRoundId === newUnsavedRoundId;

    if (!isNewUnsavedRound && !hasUnsavedRoundChanges) {
      setEditorTarget('config');
      return;
    }

    setIsBackConfirmOpen(true);
  };

  const deleteSelectedRound = async () => {
    if (!config || !selectedRoundId) {
      return;
    }

    const adminRequestParams = getAdminRequestParams();

    if (!adminRequestParams) {
      return;
    }

    const deletedRoundId = selectedRoundId;
    const previousConfig = config;
    const wasNewUnsavedRound = deletedRoundId === newUnsavedRoundId;

    const updatedConfig: TournamentConfig = {
      ...previousConfig,
      rounds: previousConfig.rounds.filter(
        (round) => round.id !== deletedRoundId
      ),
    };

    const nextSelectedRoundId = updatedConfig.rounds.at(0)?.id ?? null;

    /*
     * Запрос запускаем сразу, но сразу обрабатываем возможный reject,
     * чтобы до окончания задержки не возникло unhandled rejection.
     */
    const updateResultPromise = tournamentConfigApi
      .updateConfig(updatedConfig, adminRequestParams)
      .then(
        (savedConfig) =>
          ({
            ok: true,
            savedConfig,
          }) as const,
        (error: unknown) =>
          ({
            ok: false,
            error,
          }) as const
      );

    // Даём пользователю увидеть подтверждённое действие.
    await wait(ROUND_DELETE_DELAY_MS);

    // Через 500 мс оптимистично убираем раунд из интерфейса.
    setConfig(updatedConfig);

    setConfigs((currentConfigs) =>
      currentConfigs.map((configItem) =>
        configItem.id === updatedConfig.id ? updatedConfig : configItem
      )
    );

    setSelectedRoundId(nextSelectedRoundId);
    setEditorTarget(nextSelectedRoundId ? 'round' : 'config');

    if (wasNewUnsavedRound) {
      setNewUnsavedRoundId(null);
    }

    const updateResult = await updateResultPromise;

    if (updateResult.ok) {
      onStatusChange('Round deleted!');
      return;
    }

    // Сервер не сохранил удаление — возвращаем прежнее состояние.
    setConfig(previousConfig);

    setConfigs((currentConfigs) =>
      currentConfigs.map((configItem) =>
        configItem.id === previousConfig.id ? previousConfig : configItem
      )
    );

    setSelectedRoundId(deletedRoundId);
    setEditorTarget('round');

    if (wasNewUnsavedRound) {
      setNewUnsavedRoundId(deletedRoundId);
    }

    onStatusChange(
      updateResult.error instanceof Error
        ? `Failed to delete round: ${updateResult.error.message}`
        : 'Failed to delete round'
    );
  };

  const deleteSelectedConfig = async () => {
    if (!config) {
      return;
    }

    const adminRequestParams = getAdminRequestParams();

    if (!adminRequestParams) {
      return;
    }

    const deletedConfig = config;
    const previousConfigs = configs;
    const previousSelectedConfigId = selectedConfigId;

    const remainingConfigs = configs.filter(
      (configItem) => configItem.id !== deletedConfig.id
    );

    const nextConfig = remainingConfigs.at(0) ?? null;

    const deleteTimerId = window.setTimeout(() => {
      setConfigs(remainingConfigs);

      if (!nextConfig) {
        setConfig(null);
        setSelectedConfigId('');
        setSelectedRoundId(null);
        setEditorTarget('config');

        return;
      }

      setSelectedConfigId(nextConfig.id);
      setEditorTarget('config');
    }, CONFIG_DELETE_DELAY_MS);

    try {
      await tournamentConfigApi.deleteConfig(
        deletedConfig.id,
        adminRequestParams
      );

      onStatusChange('Configuration deleted!');
    } catch (error) {
      window.clearTimeout(deleteTimerId);

      setConfigs(previousConfigs);
      setConfig(deletedConfig);
      setSelectedConfigId(previousSelectedConfigId);
      setEditorTarget('config');

      onStatusChange(
        error instanceof Error
          ? `Failed to delete configuration: ${error.message}`
          : 'Failed to delete configuration'
      );
    }
  };

  const confirmDeleteRound = () => {
    setIsDeleteRoundConfirmOpen(false);
    void deleteSelectedRound();
  };

  const confirmDeleteConfig = () => {
    setIsDeleteConfigConfirmOpen(false);
    void deleteSelectedConfig();
  };

  const handleDeleteRoundRequest = () => {
    setIsDeleteRoundConfirmOpen(true);
  };

  const handleDeleteConfigRequest = () => {
    setIsDeleteConfigConfirmOpen(true);
  };

  const confirmBackToConfiguration = async () => {
    if (selectedRoundId === newUnsavedRoundId) {
      await deleteSelectedRound();
    }

    setIsBackConfirmOpen(false);
    setEditorTarget('config');
  };

  const handleAddRound = async (updatedConfig: TournamentConfig) => {
    const newRound = createEmptyRound();

    setSelectedRoundId(newRound.id);
    setNewUnsavedRoundId(newRound.id);
    setEditorTarget('round');

    const savedConfig = await updateCurrentConfig(() => ({
      ...updatedConfig,
      rounds: [...updatedConfig.rounds, newRound],
    }));

    if (!savedConfig) {
      setSelectedRoundId(null);
      setNewUnsavedRoundId(null);
      setEditorTarget('config');
    }
  };

  const handleReorderRounds = async (
    activeRoundId: string,
    overRoundId: string
  ) => {
    await updateCurrentConfig((currentConfig) => {
      const fromIndex = currentConfig.rounds.findIndex(
        (round) => round.id === activeRoundId
      );

      const toIndex = currentConfig.rounds.findIndex(
        (round) => round.id === overRoundId
      );

      if (fromIndex === -1 || toIndex === -1) {
        return currentConfig;
      }

      return {
        ...currentConfig,
        rounds: reorderItems(currentConfig.rounds, fromIndex, toIndex),
      };
    });
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
            onReorderRounds={handleReorderRounds}
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
            onDeleteRoundRequest={handleDeleteRoundRequest}
            onDeleteConfigRequest={handleDeleteConfigRequest}
            onBonusLimitReset={handleBonusLimitReset}
            onBackToConfiguration={handleBackToConfiguration}
            onDirtyRoundStateChange={setHasUnsavedRoundChanges}
          />
        </RoundEditorPanel>
        {isBackConfirmOpen && (
          <ConfirmActionModal
            title={
              selectedRoundId === newUnsavedRoundId
                ? 'Discard new round?'
                : 'Discard unsaved changes?'
            }
            description={
              selectedRoundId === newUnsavedRoundId
                ? 'This round has not been saved yet. It will be removed.'
                : 'Your changes have not been saved.'
            }
            confirmLabel={
              selectedRoundId === newUnsavedRoundId
                ? 'Discard round'
                : 'Discard changes'
            }
            isDanger
            onCancel={() => setIsBackConfirmOpen(false)}
            onConfirm={confirmBackToConfiguration}
          />
        )}
        {isDeleteRoundConfirmOpen && (
          <ConfirmActionModal
            title="Delete round?"
            description="This action cannot be undone."
            confirmLabel="Delete"
            isDanger
            onCancel={() => setIsDeleteRoundConfirmOpen(false)}
            onConfirm={confirmDeleteRound}
          />
        )}

        {isDeleteConfigConfirmOpen && (
          <ConfirmActionModal
            title="Delete configuration?"
            description="All rounds in this configuration will be removed."
            confirmLabel="Delete"
            isDanger
            onCancel={() => setIsDeleteConfigConfirmOpen(false)}
            onConfirm={confirmDeleteConfig}
          />
        )}
      </div>
    </section>
  );
};

export default TournamentConfigPage;
