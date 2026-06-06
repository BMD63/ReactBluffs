import { Button } from '@/shared/ui/button';

type RoundAnswerSheetScreenProps = {
  roundNumber: number;
  totalRounds: number;
  questionsCount: number;

  onFinishRound: () => void;
  onExit: () => void;
  onRestart: () => void;
};

const RoundAnswerSheetScreen = ({
  roundNumber,
  totalRounds,
  questionsCount,
  onFinishRound,
  onExit,
  onRestart,
}: RoundAnswerSheetScreenProps) => (
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

      <p>Здесь появится время на исправление ответов и проверка тура.</p>

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

export default RoundAnswerSheetScreen;
