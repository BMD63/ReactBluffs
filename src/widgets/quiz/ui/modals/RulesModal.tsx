import { gameModeConfig, type GameMode } from '@/entities/game-mode';

import { Button } from '@/shared/ui/button';

import './modals.css';

type RulesModalProps = {
  isOpen: boolean;
  gameMode: GameMode;
  onClose: () => void;
};

const RulesModal = ({ isOpen, gameMode, onClose }: RulesModalProps) => {
  if (!isOpen) return null;

  const config = gameModeConfig[gameMode];

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Правила: {config.title}</h2>

        <div className="answers-list rules-list">
          {config.rules.map((rule, index) => (
            <div key={rule} className="answer-item">
              <p>
                <strong>{index + 1}.</strong> {rule}
              </p>
            </div>
          ))}
        </div>
        <div className="modal-actions">
          <Button variant="primary" onClick={onClose}>
            Назад
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RulesModal;
