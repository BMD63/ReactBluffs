import { Button } from '@/shared/ui/button';

type RoundResultsScreenProps = {
  roundNumber: number;
  totalRounds: number;
  title: string;

  onNextRound: () => void;
  onExit: () => void;
  onRestart: () => void;
};

const RoundResultsScreen = ({
  roundNumber,
  totalRounds,
  title,
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
      <div className="mode-card__icon">✅</div>

      <h2>{title}</h2>

      <p>Результаты тура появятся здесь.</p>

      <Button variant="primary" onClick={onNextRound}>
        Следующий тур
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
