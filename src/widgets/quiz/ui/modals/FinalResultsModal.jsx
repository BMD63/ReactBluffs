import { Button } from '@/shared/ui/button';
import { pluralizeRu } from '@/shared/lib/format/pluralizeRu';
import './modals.css'

const FinalResultsModal = ({ isOpen, totalScore, onRestart, onMenu, }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="final-result-card">
          <h2 className="final-result-title">Итоговый результат</h2>

          <div className="final-score">
            <span className="final-score-value">{totalScore}</span>
          </div>

          <span className="final-score-label">
            {pluralizeRu(totalScore, ['балл', 'балла', 'баллов'])}
          </span>
        </div>
        <nav className = "final-nav modal-actions">
          <Button variant="primary" onClick={onRestart}>Начать заново</Button>
          <Button variant="secondary" onClick={onMenu}> В меню </Button>
        </nav>
      </div>
    </div>
  );
};

export default FinalResultsModal;