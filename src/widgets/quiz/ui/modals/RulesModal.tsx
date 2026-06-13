import { Button } from '@/shared/ui/button';

import './modals.css';

type RulesModalProps = {
  isOpen: boolean;
  title: string;
  rules: string[];
  onClose: () => void;
};

const RulesModal = ({ isOpen, title, rules, onClose }: RulesModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{title}</h2>

        <div className="answers-list rules-list">
          {rules.map((rule, index) => (
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
