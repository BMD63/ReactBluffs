import { Button } from '@/shared/ui/button';

type RoundIntroScreenProps = {
  roundNumber: number;
  totalRounds: number;
  title: string;
  questionsCount: number;
  questionTimeSeconds: number;
  correctionTimeSeconds: number;
  difficulty: string;
  type: string;

  onRules: () => void;
  onStartRound: () => void;
  onExit: () => void;
  onRestart: () => void;
};

const RoundIntroScreen = ({
  roundNumber,
  totalRounds,
  title,
  questionsCount,
  questionTimeSeconds,
  correctionTimeSeconds,
  difficulty,
  type,
  onRules,
  onStartRound,
  onExit,
  onRestart,
}: RoundIntroScreenProps) => {
  return (
    <section className="mode-selection">
      <div className="mode-selection__header">
        <p className="mode-selection__eyebrow">
          Тур {roundNumber} из {totalRounds}
        </p>

        <h1 className="mode-selection__title">{title}</h1>
      </div>

      <div className="mode-card mode-card--active">
        <div className="mode-card__icon">🏆</div>

        <h2>{questionsCount} вопросов</h2>

        <p>Тип вопросов: {type}</p>
        <p>Сложность: {difficulty}</p>
        <p>Время на вопрос: {questionTimeSeconds} сек.</p>
        <p>Дополнительное время: {correctionTimeSeconds} сек.</p>

        <Button variant="secondary" onClick={onRules}>
          Правила
        </Button>

        <Button variant="primary" onClick={onStartRound}>
          Начать тур
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

export default RoundIntroScreen;
