import { useEffect, useState } from 'react';
import { Button } from '@/shared/ui/button';
import { QuizTimer } from '@/shared/ui/timer';
import type { Question } from '@/entities/question/model/questionTypes';
import './round-answer-sheet-screen.css';

type RoundAnswerSheetScreenProps = {
  roundNumber: number;
  totalRounds: number;
  questionsCount: number;
  questions: Question[];
  answersByQuestionId: Record<string, string | boolean>;
  bonusAnswersLimit: number;
  bonusQuestionIds: string[];
  selectedBonusCount: number;
  correctionTimeSeconds: number;
  onToggleBonus: (questionId: string) => void;
  onFinishRound: () => void;
  onExit: () => void;
  onRestart: () => void;
  onChangeAnswer: (questionId: string, answer: string | boolean) => void;
};

const RoundAnswerSheetScreen = ({
  roundNumber,
  totalRounds,
  questionsCount,
  questions,
  answersByQuestionId,
  bonusAnswersLimit,
  bonusQuestionIds,
  selectedBonusCount,
  correctionTimeSeconds,
  onToggleBonus,
  onFinishRound,
  onExit,
  onRestart,
  onChangeAnswer,
}: RoundAnswerSheetScreenProps) => {
  const [timeLeft, setTimeLeft] = useState(correctionTimeSeconds);

  useEffect(() => {
    if (timeLeft <= 0) {
      onFinishRound();
      return;
    }

    const timerId = window.setTimeout(() => {
      setTimeLeft((currentTimeLeft) => currentTimeLeft - 1);
    }, 1000);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [timeLeft, onFinishRound]);

  return (
    <section className="mode-selection">
      <div className="mode-selection__header">
        <p className="mode-selection__eyebrow">
          Тур {roundNumber} из {totalRounds}
        </p>

        <h1 className="mode-selection__title">Бланк ответов</h1>
      </div>

      <div className="mode-card mode-card--active">
        <div className="mode-card__icon">📝</div>

        <h2>{questionsCount} вопросов</h2>

        <p>Вы можете проверить и исправить свои ответы.</p>

        <QuizTimer seconds={timeLeft} />

        <div className="round-answer-sheet__answers">
          {questions.map((question, index) => {
            const answer = answersByQuestionId[question.id];
            const isBonusSelected = bonusQuestionIds.includes(question.id);

            const isBonusDisabled =
              !isBonusSelected && selectedBonusCount >= bonusAnswersLimit;

            const shouldShowBonusButton =
              bonusAnswersLimit > 0 && (isBonusSelected || !isBonusDisabled);
            const formattedAnswer =
              answer === undefined
                ? ''
                : answer === true
                  ? 'Да'
                  : answer === false
                    ? 'Нет'
                    : answer;

            return (
              <div key={question.id} className="round-answer-sheet__answer">
                <span>{index + 1}.</span>

                {question.type === 'boolean' ? (
                  <div className="round-answer-sheet__boolean-options">
                    <Button
                      variant={answer === true ? 'primary' : 'secondary'}
                      onClick={() => onChangeAnswer(question.id, true)}
                    >
                      Да
                    </Button>

                    <Button
                      variant={answer === false ? 'primary' : 'secondary'}
                      onClick={() => onChangeAnswer(question.id, false)}
                    >
                      Нет
                    </Button>
                  </div>
                ) : (
                  <input
                    className="quiz-input"
                    value={
                      typeof formattedAnswer === 'string' ? formattedAnswer : ''
                    }
                    onChange={(event) =>
                      onChangeAnswer(question.id, event.target.value)
                    }
                    placeholder="—"
                  />
                )}

                {shouldShowBonusButton && (
                  <Button
                    variant={isBonusSelected ? 'primary' : 'secondary'}
                    onClick={() => onToggleBonus(question.id)}
                  >
                    Бонус
                  </Button>
                )}
              </div>
            );
          })}
        </div>

        <Button variant="primary" onClick={onFinishRound}>
          Завершить тур
        </Button>
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

export default RoundAnswerSheetScreen;
