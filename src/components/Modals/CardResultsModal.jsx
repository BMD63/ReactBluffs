import Button from '../Shared/Button';

const CardResultsModal = ({ isOpen, cardData, cardIndex, score, onNext, isLastCard, userAnswers}) => {
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
              <p>Правильный ответ: {question.correctAnswer ? 'Да' : 'Нет'}</p>
              <p>Ваш ответ: {userAnswers[index].answer ? 'Да' : 'Нет'}</p>
              {(userAnswers[index].answer === question.correctAnswer) && userAnswers[index].bonus && <p>Бонус</p>}
            </div>
          ))}
        </div>
        <Button className= "modalBotton" onClick={onNext}>
          {isLastCard ? 'К результатам' : 'Следующий раунд'}
        </Button>
        {/* <Button onClick={alert(JSON.stringify(cardData))}>Check</Button> */}
      </div>
    </div>
  );
};

export default CardResultsModal;