import { useEffect } from 'react';

import type { BooleanQuestion } from '@/entities/question/model/questionTypes';
import type { CardAnswers } from '@/entities/quiz-session/model/quizSessionModel';

import { Button } from '@/shared/ui/button';

import './quiz-card.css';

type QuizCardProps = {
  cardData: BooleanQuestion[];
  cardIndex: number;
  userAnswers: CardAnswers;
  totalCards: number;

  onAnswer: (
    cardIndex: number,
    questionId: string,
    answer: boolean
  ) => void;

  onBonus: (
    cardIndex: number,
    questionId: string
  ) => void;

  onSubmit: () => void;
  onRestart: () => void;
  onMenu: () => void;
};

const Card = ({
  cardData,
  cardIndex,
  userAnswers,
  onAnswer,
  onBonus,
  onSubmit,
  totalCards,
  onRestart,
  onMenu,
}: QuizCardProps) => {
  const allQuestionsAnswered =
    Object.keys(userAnswers).length === cardData.length;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [cardIndex]);

  const stringCartIndexes = [
    'ПЕРВЫЙ',
    'ВТОРОЙ',
    'ТРЕТИЙ',
    'ЧЕТВЕРТЫЙ',
    'ПЯТЫЙ',
    'ШЕСТОЙ',
    'СЕДМОЙ',
    'ВОСЬМОЙ',
    'ДЕВЯТЫЙ',
    'ДЕСЯТЫЙ',
  ];

  const stringTotalCards = [
    'ОДНОЙ',
    'ДВУХ',
    'ТРЕХ',
    'ЧЕТЫРЕХ',
    'ПЯТИ',
    'ШЕСТИ',
    'СЕМИ',
    'ВОСЬМИ',
    'ДЕВЯТИ',
    'ДЕСЯТИ',
  ];

  return (
    <div className="card">
      <h2>
        РАУНД {stringCartIndexes[cardIndex]} ИЗ{' '}
        {stringTotalCards[totalCards - 1]}
      </h2>

      {cardData.map((question) => (
        <div key={question.id} className="question">
          <p>{question.text}</p>

          <div className="controls">
            <Button
              variant="answer"
              className={`answer-btn ${
                userAnswers[question.id]?.answer === true
                  ? 'selected'
                  : ''
              }`}
              onClick={() =>
                onAnswer(cardIndex, question.id, true)
              }
            >
              Да
            </Button>

            <Button
              variant="answer"
              className={`answer-btn ${
                userAnswers[question.id]?.answer === false
                  ? 'selected'
                  : ''
              }`}
              onClick={() =>
                onAnswer(cardIndex, question.id, false)
              }
            >
              Нет
            </Button>

            <label className="bonus-label">
              <input
                type="checkbox"
                disabled={
                  Object.values(userAnswers).filter(
                    (answer) => answer.bonus
                  ).length >= 3 &&
                  !userAnswers[question.id]?.bonus
                }
                checked={
                  userAnswers[question.id]?.bonus || false
                }
                onChange={() =>
                  onBonus(cardIndex, question.id)
                }
              />

              Бонусный балл
            </label>
          </div>
        </div>
      ))}

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
        <Button
          variant="secondary"
          className="restart-btn"
          onClick={onMenu}
        >
          В меню
        </Button>
      </div>
    </div>
  );
};

export default Card;