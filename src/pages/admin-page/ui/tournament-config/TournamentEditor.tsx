import ConfigurationEditor from './ConfigurationEditor';
import RoundEditor from './RoundEditor';

import type {
  TournamentConfig,
  TournamentRoundConfig,
} from '@/entities/tournament-config';

type TournamentEditorTarget = 'config' | 'round';

type TournamentEditorProps = {
  editorTarget: 'config' | 'round';

  config: TournamentConfig;
  selectedRound: TournamentRoundConfig | null;

  onSaveConfig: (config: TournamentConfig) => void;
  onSaveRound: (round: TournamentRoundConfig) => void;

  onAddRound: () => void;
};

const TournamentEditor = ({
  editorTarget,
  config,
  selectedRound,
  onSaveConfig,
  onSaveRound,
  onAddRound,
}: TournamentEditorProps) => {
  if (editorTarget === 'config') {
    return (
      <ConfigurationEditor
        config={config}
        onSave={onSaveConfig}
        onAddRound={onAddRound}
      />
    );
  }

  if (!selectedRound) {
    return <p>Select a round to edit.</p>;
  }

  return <RoundEditor round={selectedRound} onSave={onSaveRound} />;
};

export default TournamentEditor;
