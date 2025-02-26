import Button from '../Shared/Button';

const FinalResultsModal = ({ isOpen, totalScore, onRestart }) => {
  const handleNewPlayer = () => {
    localStorage.setItem('rulesShown', 'false')
    window.scrollTo(0, 0);
    onRestart();
  }
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Итоговый результат</h2>
        <p>Общее количество баллов: {totalScore}</p>
        <Button onClick={onRestart}>Начать заново</Button>
        <button onClick={handleNewPlayer}> Новый игрок </button>
      </div>
    </div>
  );
};

export default FinalResultsModal;