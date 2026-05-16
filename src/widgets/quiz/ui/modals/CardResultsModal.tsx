import { Button } from '@/shared/ui/button';
import './modals.css';
import type { Question } from '@/entities/question/model/questionTypes';
import type { CardAnswers } from '@/entities/quiz-session/model/quizSessionModel';
import { QUESTION_TYPE } from '@/entities/question';

import BooleanQuestionResult from './results/BooleanQuestionResult';
import MultipleChoiceQuestionResult from './results/MultipleChoiceQuestionResult';
import OpenAnswerQuestionResult from './results/OpenAnswerQuestionResult';

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

const CardResultsModal = ({
  isOpen,
  cardData,
  cardIndex,
  score,
  onNext,
  isLastCard,
  userAnswers,
  onRestart,
  onMenu,
}: CardResultsModalProps) => {
  if (!isOpen || !cardData) return null;
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Результаты раунда {cardIndex + 1}</h2>
        <p>Набрано баллов: {score}</p>
        <div className="answers-list">
          {cardData.map((question) => {
            switch (question.type) {
              case QUESTION_TYPE.BOOLEAN:
                return (
                  <BooleanQuestionResult
                    key={question.id}
                    question={question}
                    userAnswers={userAnswers}
                  />
                );

              case QUESTION_TYPE.MULTIPLE_CHOICE:
                return (
                  <MultipleChoiceQuestionResult
                    key={question.id}
                    question={question}
                    userAnswers={userAnswers}
                  />
                );

              case QUESTION_TYPE.OPEN_TEXT:
                return (
                  <OpenAnswerQuestionResult
                    key={question.id}
                    question={question}
                    userAnswers={userAnswers}
                  />
                );

              default:
                return null;
            }
          })}
        </div>
        <div className="modal-actions card-actions">
          <Button variant="primary" className="modalBotton" onClick={onNext}>
            {isLastCard ? 'К результатам' : 'Следующий'}
          </Button>
          <Button
            variant="secondary"
            className="restart-btn"
            onClick={onRestart}
          >
            Заново
          </Button>
          <Button variant="secondary" onClick={onMenu}>
            В меню
          </Button>
        </div>

        {/* <Button onClick={alert(JSON.stringify(cardData))}>Check</Button> */}
      </div>
    </div>
  );
};

export default CardResultsModal;
