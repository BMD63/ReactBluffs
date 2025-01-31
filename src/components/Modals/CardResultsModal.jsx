import Button from '../Shared/Button';

const CardResultsModal = ({ isOpen, cardData, cardIndex, score, onNext, isLastCard }) => {
  if (!isOpen) return null;
  // console.log(score);
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Результаты раунда {cardIndex + 1}</h2>
        <p>Набрано баллов: {score}</p>
        <div className="answers-list">
          {cardData.map((question, index) => (
            <div key={index} className="answer-item">
              <p>{question.question}</p>
              <p>Правильный ответ: {question.answer ? 'Да' : 'Нет'}</p>
              <p>Ваш ответ: {question.userAnswer ? 'Да' : 'Нет'}</p>
            </div>
          ))}
        </div>
        <Button className= "modalBotton" onClick={onNext}>
          {isLastCard ? 'К результатам' : 'Следующий раунд'}
        </Button>
      </div>
    </div>
  );
};

export default CardResultsModal;