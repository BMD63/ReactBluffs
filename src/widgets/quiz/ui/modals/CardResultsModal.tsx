import { Button } from '@/shared/ui/button';
import './modals.css'
import { QUESTION_TYPE } from '@/entities/question';
import type { Question } from '@/entities/question/model/questionTypes';
import type { CardAnswers } from '@/entities/quiz-session/model/quizSessionModel';
import { normalizeAnswer } from '@/entities/question';

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
            const userAnswerLabel =
              typeof answer?.answer === 'boolean'
                ? answer.answer
                  ? 'Да'
                  : 'Нет'
                : answer?.answer ?? '—';
            const isCorrect =
              question.type === QUESTION_TYPE.BOOLEAN
                ? answer?.answer ===
                  question.correctAnswer

                : question.type ===
                    QUESTION_TYPE.MULTIPLE_CHOICE
                  ? answer?.answer ===
                    question.correctAnswer

                  : question.type ===
                      QUESTION_TYPE.OPEN_TEXT
                    ? question.correctAnswers
                        .map(normalizeAnswer)
                        .includes(
                          normalizeAnswer(
                            String(
                              answer?.answer ?? ''
                            )
                          )
                        )

                    : false;

            const correctAnswerLabel =
              question.type === QUESTION_TYPE.BOOLEAN
                ? question.correctAnswer
                  ? 'Да'
                  : 'Нет'

                : question.type ===
                    QUESTION_TYPE.MULTIPLE_CHOICE
                  ? question.correctAnswer

                  : question.type ===
                      QUESTION_TYPE.OPEN_TEXT
                    ? question.correctAnswers[0]

                    : '—';
            return (
              <div key={question.id} className="answer-item">
                <p>{question.text}</p>
                <p>Правильный ответ: {correctAnswerLabel}</p>
                <p>
                  Ваш ответ: {userAnswerLabel}
                  {isCorrect ? (
                      <span className="result-icon success"> ✔</span>
                    ) : (
                      <span className="result-icon error"> ✖</span>
                    )}
                </p>
                {isCorrect && hasBonus && <p>Бонус</p>}
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