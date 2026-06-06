import { Button } from '@/shared/ui/button';

type TournamentResultsScreenProps = {
  roundsCount: number;

  onRestart: () => void;
  onExit: () => void;
};

const TournamentResultsScreen = ({
  roundsCount,
  onRestart,
  onExit,
}: TournamentResultsScreenProps) => (
  <section className="mode-selection">
    <div className="mode-selection__header">
      <p className="mode-selection__eyebrow">Турнир завершён</p>

      <h1 className="mode-selection__title">Спасибо за игру!</h1>
    </div>

    <div className="mode-card mode-card--active">
      <div className="mode-card__icon">🏆</div>

      <h2>Пройдено туров: {roundsCount}</h2>

      <p>Здесь появится итоговый результат турнира.</p>
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

export default TournamentResultsScreen;
