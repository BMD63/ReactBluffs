import Button from '@/shared/ui/button/Button';
import './modals.css'

const CardResultsModal = ({ isOpen, cardData, cardIndex, score, onNext, isLastCard, userAnswers, onRestart, onMenu,}) => {
  if (!isOpen) return null;
  
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Результаты раунда {cardIndex + 1}</h2>
        <p>Набрано баллов: {score}</p>
        <div className="answers-list">
          {cardData.map((question) => {
            const answer = userAnswers?.[question.id];
            return (
              <div key={question.id} className="answer-item">
                <p>{question.text}</p>
                <p>Правильный ответ: {question.correctAnswer ? 'Да' : 'Нет'}</p>
                <p>
                  Ваш ответ: {answer?.answer ? 'Да' : 'Нет'}
                  {(answer?.answer === question.correctAnswer) ? (
                      <span className="result-icon success"> ✔</span>
                    ) : (
                      <span className="result-icon error"> ✖</span>
                    )}
                </p>
                {(answer?.answer === question.correctAnswer) && answer?.bonus && <p>Бонус</p>}
              </div>
            );
          })}
        </div>
        <div className="modal-actions card-actions">
          <Button 
            variant="primary"
            className= "modalBotton" 
            onClick={onNext}
          >
            {isLastCard ? 'К результатам' : 'Следующий'}
          </Button>
          <Button 
            variant="secondary"
            className="restart-btn"
            onClick={onRestart}
          >
            Заново
          </Button>
          <Button 
            variant="secondary"
            onClick={onMenu}
          > 
            В меню 
          </Button>
        </div>
        
        
        {/* <Button onClick={alert(JSON.stringify(cardData))}>Check</Button> */}
      </div>
    </div>
  );
};

export default CardResultsModal;