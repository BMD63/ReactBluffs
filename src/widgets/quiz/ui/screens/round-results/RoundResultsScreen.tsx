import { Button } from '@/shared/ui/button';
import type { TournamentRoundResult } from '@/entities/quiz-session/model/calculateTournamentRoundResult';

type RoundResultsScreenProps = {
  roundNumber: number;
  totalRounds: number;
  title: string;
  result: TournamentRoundResult;
  onNextRound: () => void;
  onExit: () => void;
  onRestart: () => void;
};

const RoundResultsScreen = ({
  roundNumber,
  totalRounds,
  title,
  result,
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

      <div>
        <p>
          Правильных ответов: {result.correctAnswersCount} /{' '}
          {result.questionsCount}
        </p>

        <p>
          Бонусных попаданий: {result.bonusCorrectCount} /{' '}
          {result.bonusAnswersCount}
        </p>

        <p>Очков за тур: {result.score}</p>
      </div>

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
