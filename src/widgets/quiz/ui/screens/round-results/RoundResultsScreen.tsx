import { Button } from '@/shared/ui/button';
import type { TournamentRoundResult } from '@/entities/quiz-session/model/calculateTournamentRoundResult';
import './round-results-screen.css';

type RoundResultsScreenProps = {
  roundNumber: number;
  totalRounds: number;
  title: string;
  result: TournamentRoundResult;
  isLastRound: boolean;
  onNextRound: () => void;
  onExit: () => void;
  onRestart: () => void;
};

const RoundResultsScreen = ({
  roundNumber,
  totalRounds,
  title,
  result,
  isLastRound,
  onNextRound,
  onExit,
  onRestart,
}: RoundResultsScreenProps) => (
  <section className="mode-selection">
    <div className="mode-selection__header">
      <p className="mode-selection__eyebrow">
        Тур {roundNumber} из {totalRounds}
      </p>

      <h1 className="mode-selection__title">Тур завершён</h1>
    </div>

    <div className="mode-card mode-card--active">
      <h2>{title}</h2>

      <div className="round-results__summary">
        <span>
          Правильных: {result.correctAnswersCount} / {result.questionsCount}
        </span>

        {result.bonusAnswersCount > 0 && (
          <span>
            Бонусы: {result.bonusCorrectCount} / {result.bonusAnswersCount}
          </span>
        )}

        <span>Очки: {result.score}</span>
      </div>

      <div className="round-results__answers">
        {result.questionResults.map((questionResult, index) => (
          <div
            key={questionResult.questionId}
            className={
              questionResult.isCorrect
                ? 'round-results__answer round-results__answer--correct'
                : 'round-results__answer round-results__answer--incorrect'
            }
          >
            <div>
              <strong>{index + 1}.</strong> {questionResult.questionText}
            </div>

            <div>
              {questionResult.isCorrect ? '✅' : '❌'} Ваш ответ:{' '}
              {questionResult.userAnswer === undefined
                ? '—'
                : questionResult.userAnswer === true
                  ? 'Да'
                  : questionResult.userAnswer === false
                    ? 'Нет'
                    : questionResult.userAnswer}
            </div>

            {!questionResult.isCorrect && (
              <div>
                ✅ Правильный ответ:{' '}
                {questionResult.correctAnswer === true
                  ? 'Да'
                  : questionResult.correctAnswer === false
                    ? 'Нет'
                    : questionResult.correctAnswer}
              </div>
            )}

            <div>Очки: {questionResult.score}</div>
          </div>
        ))}
      </div>

      <Button variant="primary" onClick={onNextRound}>
        {isLastRound ? 'Результаты турнира' : 'Следующий тур'}
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

export default RoundResultsScreen;
