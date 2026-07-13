import ConfigurationEditor from './ConfigurationEditor';
import RoundEditor from './RoundEditor';

import type {
  TournamentConfig,
  TournamentRoundConfig,
} from '@/entities/tournament-config';

type TournamentEditorProps = {
  editorTarget: 'config' | 'round';
  canAddRoundFromEditor: boolean;

  config: TournamentConfig;
  selectedRound: TournamentRoundConfig | null;

  onSaveConfig: (config: TournamentConfig) => void;
  onSaveRound: (round: TournamentRoundConfig) => void;
  onDeleteConfigRequest: () => void;
  onAddRound: (config: TournamentConfig) => void;
  onAddRoundFromEditorRequest: (round: TournamentRoundConfig) => void;
  onDeleteRoundRequest: () => void;
  onBonusLimitReset: () => void;
  onBackToConfiguration: () => void;
  onDirtyRoundStateChange: (isDirty: boolean) => void;
};

const TournamentEditor = ({
  editorTarget,
  config,
  selectedRound,
  onSaveConfig,
  onSaveRound,
  onAddRound,
  onAddRoundFromEditorRequest,
  onDeleteRoundRequest,
  onDeleteConfigRequest,
  onBonusLimitReset,
  onBackToConfiguration,
  onDirtyRoundStateChange,
  canAddRoundFromEditor,
}: TournamentEditorProps) => {
  if (editorTarget === 'config') {
    return (
      <ConfigurationEditor
        config={config}
        onSave={onSaveConfig}
        onAddRound={onAddRound}
        onDeleteRequest={onDeleteConfigRequest}
      />
    );
  }

  if (!selectedRound) {
    return <p>Select a round to edit.</p>;
  }

  return (
    <RoundEditor
      round={selectedRound}
      onSave={onSaveRound}
      onDeleteRequest={onDeleteRoundRequest}
      onBonusLimitReset={onBonusLimitReset}
      onBackToConfiguration={onBackToConfiguration}
      onDirtyStateChange={onDirtyRoundStateChange}
      onAddRoundRequest={onAddRoundFromEditorRequest}
      canAddRound={canAddRoundFromEditor}
    />
  );
};

export default TournamentEditor;
