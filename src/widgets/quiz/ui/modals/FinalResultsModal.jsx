import Button from '@/shared/ui/button/Button';
import './modals.css'

const FinalResultsModal = ({ isOpen, totalScore, onRestart, onMenu, }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Итоговый результат</h2>
        <p>Общее количество баллов: {totalScore}</p>
        <nav className = "final-nav modal-actions">
          <Button variant="primary" onClick={onRestart}>Начать заново</Button>
          <Button variant="secondary" onClick={onMenu}> В меню </Button>
        </nav>
      </div>
    </div>
  );
};

export default FinalResultsModal;