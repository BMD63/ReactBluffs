import { useEffect, useState } from 'react';
import { Button } from '@/shared/ui/button';
import type { Question } from '@/entities/question/model/questionTypes';
import './tournament-question-screen.css';

type TournamentQuestionScreenProps = {
  roundNumber: number;
  totalRounds: number;
  questionNumber: number;
  totalQuestions: number;
  question: Question | undefined;
  answer: string | boolean | undefined;
  isBonusSelected: boolean;
  shouldShowBonusButton: boolean;
  onToggleBonus: () => void;
  onChangeAnswer: (answer: string | boolean) => void;
  onExit: () => void;
  onRestart: () => void;
  onAnswer: () => void;
  questionTimeSeconds: number;
};

const TournamentQuestionScreen = ({
  roundNumber,
  totalRounds,
  questionNumber,
  totalQuestions,
  question,
  answer,
  isBonusSelected,
  shouldShowBonusButton,
  onToggleBonus,
  onChangeAnswer,
  onExit,
  onRestart,
  onAnswer,
  questionTimeSeconds,
}: TournamentQuestionScreenProps) => {
  const [timeLeft, setTimeLeft] = useState(questionTimeSeconds);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const isTextAnswerQuestion =
    question?.type === 'openText' ||
    question?.type === 'image' ||
    question?.type === 'audio';

  const isImageQuestion = question?.type === 'image';

  const answerBlock = (
    <div
      className={
        isTextAnswerQuestion
          ? 'tournament-question-screen__answer tournament-question-screen__answer--text'
          : 'tournament-question-screen__answer'
      }
    >
      {isTextAnswerQuestion && (
        <input
          value={typeof answer === 'string' ? answer : ''}
          onChange={(event) => onChangeAnswer(event.target.value)}
          placeholder="Введите ответ"
        />
      )}

      {question?.type === 'boolean' && (
        <div className="tournament-question-screen__boolean-options">
          <Button
            variant={answer === true ? 'primary' : 'secondary'}
            onClick={() => onChangeAnswer(true)}
          >
            Да
          </Button>

          <Button
            variant={answer === false ? 'primary' : 'secondary'}
            onClick={() => onChangeAnswer(false)}
          >
            Нет
          </Button>
        </div>
      )}

      {question?.type === 'multipleChoice' && (
        <div className="tournament-question-screen__multiple-options">
          {question.options.map((option) => (
            <Button
              key={option}
              variant={answer === option ? 'primary' : 'secondary'}
              onClick={() => onChangeAnswer(option)}
            >
              {option}
            </Button>
          ))}
        </div>
      )}

      {question?.type === 'boolean' && shouldShowBonusButton && (
        <Button
          variant={isBonusSelected ? 'primary' : 'secondary'}
          onClick={onToggleBonus}
        >
          Бонусный балл
        </Button>
      )}

      <Button variant="primary" onClick={onAnswer}>
        Ответить
      </Button>
    </div>
  );

  useEffect(() => {
    setIsImageLoading(question?.type === 'image');
  }, [question?.id, question?.type]);

  useEffect(() => {
    setTimeLeft(questionTimeSeconds);
  }, [questionNumber, questionTimeSeconds]);

  const timerClassName =
    timeLeft <= 10
      ? 'tournament-question-screen__timer tournament-question-screen__timer--danger'
      : timeLeft <= 20
        ? 'tournament-question-screen__timer tournament-question-screen__timer--warning'
        : 'tournament-question-screen__timer';

  useEffect(() => {
    if (timeLeft <= 0) {
      onAnswer();
      return;
    }

    const timerId = window.setTimeout(() => {
      setTimeLeft((currentTimeLeft) => currentTimeLeft - 1);
    }, 1000);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [timeLeft, onAnswer]);

  return (
    <section className="mode-selection">
      <div className="mode-selection__header">
        <p className="mode-selection__eyebrow">
          Тур {roundNumber} из {totalRounds}
        </p>

        <h1 className="mode-selection__title tournament-question-screen__title">
          Вопрос {questionNumber} из {totalQuestions}
        </h1>
      </div>

      <div
        className={[
          'mode-card mode-card--active tournament-question-screen__card',
          question?.type === 'image' &&
            'tournament-question-screen__card--image',
          question?.type === 'audio' &&
            'tournament-question-screen__card--audio',
          question?.type === 'openText' &&
            'tournament-question-screen__card--text',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <div className="tournament-question-screen__question-scroll">
          <h2 className="tournament-question-screen__question">
            {question?.text ?? 'Вопрос не загружен'}
          </h2>
        </div>

        {question?.type === 'image' ? (
          <div className="tournament-question-screen__image-layout">
            <div className="tournament-question-screen__image-wrapper">
              {isImageLoading && (
                <div className="tournament-question-screen__image-skeleton" />
              )}

              <img
                className="tournament-question-screen__image"
                src={question.media.url}
                alt={question.media.alt ?? question.text}
                onLoad={() => setIsImageLoading(false)}
                onError={() => setIsImageLoading(false)}
              />
            </div>

            <div className="tournament-question-screen__controls">
              <div className={timerClassName}>⏳ {timeLeft} сек.</div>
              {answerBlock}
            </div>
          </div>
        ) : (
          <>
            {question?.type === 'audio' && (
              <audio
                className="tournament-question-screen__audio"
                controls
                src={question.media.url}
              />
            )}

            <div className="tournament-question-screen__bottom-controls">
              <div className={timerClassName}>⏳ {timeLeft} сек.</div>
              {answerBlock}
            </div>
          </>
        )}
      </div>
      <div className="mode-selection__actions">
        <Button variant="secondary" onClick={onExit}>
          Выйти
        </Button>

        <Button variant="secondary" onClick={onRestart}>
          Начать заново
        </Button>
      </div>
    </section>
  );
};

export default TournamentQuestionScreen;
