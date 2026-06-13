import { Button } from '@/shared/ui/button';
import type { TournamentRoundResult } from '@/entities/quiz-session/model/calculateTournamentRoundResult';
import './tournament-results-screen.css';

type TournamentResultsScreenProps = {
  roundsCount: number;
  results: TournamentRoundResult[];
  onRestart: () => void;
  onExit: () => void;
};

const TournamentResultsScreen = ({
  roundsCount,
  results,
  onRestart,
  onExit,
}: TournamentResultsScreenProps) => {
  const totalScore = results.reduce((sum, result) => sum + result.score, 0);

  return (
    <section className="mode-selection">
      <div className="mode-selection__header">
        <p className="mode-selection__eyebrow">Турнир завершён</p>

        <h1 className="mode-selection__title">Спасибо за игру!</h1>
      </div>

      <div className="mode-card mode-card--active">
        <div className="mode-card__icon">🏆</div>

        <h2>Результаты турнира</h2>

        <div className="tournament-results__summary">
          <p>
            Пройдено туров: {results.length} / {roundsCount}
          </p>

          <div className="tournament-results__rounds">
            {results.map((result, index) => (
              <div key={index} className="tournament-results__round">
                <span>{result.roundTitle}</span>
                <span>{result.score} баллов</span>
              </div>
            ))}
          </div>

          <p className="tournament-results__total">
            Итоговый счёт: {totalScore} баллов
          </p>
        </div>
      </div>

      <div className="mode-selection__actions">
        <Button variant="primary" onClick={onRestart}>
          Начать заново
        </Button>

        <Button variant="secondary" onClick={onExit}>
          Выйти
        </Button>
      </div>
    </section>
  );
};

export default TournamentResultsScreen;
