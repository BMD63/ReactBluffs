import { useEffect } from 'react';

import type { MultipleChoiceQuestion } from '@/entities/question/model/questionTypes';
import type { CardAnswers } from '@/entities/quiz-session/model/quizSessionModel';

import { Button } from '@/shared/ui/button';

import './quiz-card.css';

type MultipleChoiceQuizCardProps = {
  cardData: MultipleChoiceQuestion[];
  cardIndex: number;
  userAnswers: CardAnswers;
  totalCards: number;

  onAnswer: (
    cardIndex: number,
    questionId: string,
    answer: string
  ) => void;

  onSubmit: () => void;
  onRestart: () => void;
  onMenu: () => void;
};

const MultipleChoiceQuizCard = ({
  cardData,
  cardIndex,
  userAnswers,
  onAnswer,
  onSubmit,
  totalCards,
  onRestart,
  onMenu,
}: MultipleChoiceQuizCardProps) => {
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
            {question.options.map((option) => (
              <Button
                key={option}
                variant="answer"
                className={`answer-btn ${
                  userAnswers[question.id]?.answer === option
                    ? 'selected'
                    : ''
                }`}
                onClick={() =>
                  onAnswer(cardIndex, question.id, option)
                }
              >
                {option}
              </Button>
            ))}
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

export default MultipleChoiceQuizCard;