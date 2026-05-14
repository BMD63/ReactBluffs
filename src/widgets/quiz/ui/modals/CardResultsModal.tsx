import { Button } from '@/shared/ui/button';
import './modals.css'

import type { Question } from '@/entities/question/model/questionTypes';
import type { CardAnswers } from '@/entities/quiz-session/model/quizSessionModel';

type CardResultsModalProps = {
  isOpen: boolean;
  cardData?: Question[];
  cardIndex: number;
  score: number;
  isLastCard: boolean;
  userAnswers: CardAnswers;
  onNext: () => void;
  onRestart: () => void;
  onMenu: () => void;
};

const CardResultsModal = ({ isOpen, cardData, cardIndex, score, onNext, isLastCard, userAnswers, onRestart, onMenu,}:CardResultsModalProps) => {
  if (!isOpen || !cardData) return null;
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Результаты раунда {cardIndex + 1}</h2>
        <p>Набрано баллов: {score}</p>
        <div className="answers-list">
          {cardData.map((question) => {
            const userAnswer = userAnswers[question.id];
            const hasBonus =
              Boolean(userAnswer && 'bonus' in userAnswer && userAnswer.bonus);
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
                {(answer?.answer === question.correctAnswer) && hasBonus && <p>Бонус</p>}
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