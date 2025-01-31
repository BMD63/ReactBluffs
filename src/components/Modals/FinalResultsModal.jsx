import Button from '../Shared/Button';

const FinalResultsModal = ({ isOpen, totalScore, onRestart }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Итоговый результат</h2>
        <p>Общее количество баллов: {totalScore}</p>
        <Button onClick={onRestart}>Начать заново</Button>
      </div>
    </div>
  );
};

export default FinalResultsModal;