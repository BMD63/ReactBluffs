import { useEffect } from 'react';

import type { OpenTextQuestion } from '@/entities/question/model/questionTypes';
import type { CardAnswers } from '@/entities/quiz-session/model/quizSessionModel';

import { Button } from '@/shared/ui/button';

import './quiz-card.css';

type OpenAnswerQuizCardProps = {
  cardData: OpenTextQuestion[];
  cardIndex: number;
  userAnswers: CardAnswers;
  totalCards: number;

  onAnswer: (cardIndex: number, questionId: string, answer: string) => void;

  onSubmit: () => void;
  onRestart: () => void;
  onMenu: () => void;
};

const OpenAnswerQuizCard = ({
  cardData,
  cardIndex,
  userAnswers,
  onAnswer,
  onSubmit,
  totalCards,
  onRestart,
  onMenu,
}: OpenAnswerQuizCardProps) => {
  const allQuestionsAnswered = cardData.every((question) => {
    const answer = userAnswers[question.id]?.answer;

    return typeof answer === 'string' && answer.trim().length > 0;
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [cardIndex]);

  return (
    <div className="card">
      <h2>
        РАУНД {cardIndex + 1} ИЗ {totalCards}
      </h2>

      {cardData.map((question) => {
        const answer = userAnswers[question.id]?.answer;
        const value = typeof answer === 'string' ? answer : '';

        return (
          <div key={question.id} className="question">
            <p>{question.text}</p>

            <input
              className="answer-input"
              value={value}
              placeholder="Введите ответ"
              onChange={(event) =>
                onAnswer(cardIndex, question.id, event.target.value)
              }
            />
          </div>
        );
      })}

      <div className="card-actions">
        <Button
          variant="submit"
          className="submit-btn"
          disabled={!allQuestionsAnswered}
          onClick={onSubmit}
        >
          Ответить
        </Button>

        {cardIndex > 0 && (
          <Button
            variant="secondary"
            className="restart-btn"
            onClick={onRestart}
          >
            Начать сначала
          </Button>
        )}

        <Button variant="secondary" className="restart-btn" onClick={onMenu}>
          В меню
        </Button>
      </div>
    </div>
  );
};

export default OpenAnswerQuizCard;
