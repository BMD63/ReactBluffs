import { Button } from '@/shared/ui/button';
import './round-intro-screen.css';

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
  const canRestart = roundNumber > 1;
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

        <div className="round-intro__primary-actions">
          <Button variant="secondary" disabled onClick={onRules}>
            Правила (скоро)
          </Button>

          <Button variant="primary" onClick={onStartRound}>
            Начать тур
          </Button>
        </div>
      </div>

      <div className="round-intro__secondary-actions">
        <Button variant="secondary" onClick={onExit}>
          Выйти
        </Button>

        {canRestart && (
          <Button variant="secondary" onClick={onRestart}>
            Начать заново
          </Button>
        )}
      </div>
    </section>
  );
};

export default RoundIntroScreen;
