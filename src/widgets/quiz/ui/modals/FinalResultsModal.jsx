import Button from '@/shared/ui/button/Button';

const FinalResultsModal = ({ isOpen, totalScore, onRestart, onNewPlayer, onMenu, }) => {
  const handleNewPlayer = () => {
    localStorage.clear();
    onNewPlayer();
    window.scrollTo(0, 0);
    onRestart();
  }
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Итоговый результат</h2>
        <p>Общее количество баллов: {totalScore}</p>
        <nav>
          <Button onClick={onRestart}>Начать заново</Button>
          <Button onClick={handleNewPlayer}> Новый игрок </Button>
          <Button onClick={onMenu}> В меню </Button>
        </nav>
      </div>
    </div>
  );
};

export default FinalResultsModal;