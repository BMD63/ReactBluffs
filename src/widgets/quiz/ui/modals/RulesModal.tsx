import {
  gameModeConfig,
  type GameMode,
} from '@/entities/game-mode';

import { Button } from '@/shared/ui/button';

import './modals.css';

type RulesModalProps = {
  isOpen: boolean;
  gameMode: GameMode;
  onClose: () => void;
};

const RulesModal = ({
  isOpen,
  gameMode,
  onClose,
}: RulesModalProps) => {
  if (!isOpen) return null;

  const config = gameModeConfig[gameMode];

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Правила: {config.title}</h2>

        <div className="answers-list">
          {config.rules.map((rule) => (
            <p key={rule}>{rule}</p>
          ))}
        </div>

        <Button onClick={onClose}>
          Назад
        </Button>
      </div>
    </div>
  );
};

export default RulesModal;