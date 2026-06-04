import { Button } from '@/shared/ui/button';

type TournamentIntroScreenProps = {
  title: string;
  roundsCount: number;
  firstRoundTitle: string;

  onBack: () => void;
};

const TournamentIntroScreen = ({
  title,
  roundsCount,
  firstRoundTitle,
  onBack,
}: TournamentIntroScreenProps) => {
  return (
    <section className="mode-selection">
      <div className="mode-selection__header">
        <p className="mode-selection__eyebrow">Оффлайн-квиз</p>

        <h1 className="mode-selection__title">{title}</h1>
      </div>

      <div className="mode-card mode-card--active">
        <div className="mode-card__icon">🏆</div>

        <h2>{roundsCount} туров</h2>
        <p>Вопросы появляются по одному</p>
        <p>После каждого тура можно будет проверить ответы</p>
        <p>Первый тур: {firstRoundTitle}</p>
      </div>

      <div className="mode-selection__actions">
        <Button variant="secondary" onClick={onBack}>
          ← Назад
        </Button>
      </div>
    </section>
  );
};

export default TournamentIntroScreen;
