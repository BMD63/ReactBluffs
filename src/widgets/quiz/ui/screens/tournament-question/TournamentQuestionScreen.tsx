import { Button } from '@/shared/ui/button';
import type { Question } from '@/entities/question/model/questionTypes';

type TournamentQuestionScreenProps = {
  roundNumber: number;
  totalRounds: number;
  questionNumber: number;
  totalQuestions: number;
  question: Question | undefined;

  onExit: () => void;
  onRestart: () => void;
  onAnswer: () => void;
};

const TournamentQuestionScreen = ({
  roundNumber,
  totalRounds,
  questionNumber,
  totalQuestions,
  onExit,
  onRestart,
  onAnswer,
  question,
}: TournamentQuestionScreenProps) => (
  <section className="mode-selection">
    <div className="mode-selection__header">
      <p className="mode-selection__eyebrow">
        Тур {roundNumber} из {totalRounds}
      </p>

      <h1 className="mode-selection__title">
        Вопрос {questionNumber} из {totalQuestions}
      </h1>
    </div>

    <div className="mode-card mode-card--active">
      <div className="mode-card__icon">❓</div>

      <h2>{question?.text ?? 'Вопрос не загружен'}</h2>

      <p>Здесь будет отображаться вопрос турнира.</p>

      <Button variant="primary" onClick={onAnswer}>
        Ответить
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

export default TournamentQuestionScreen;
