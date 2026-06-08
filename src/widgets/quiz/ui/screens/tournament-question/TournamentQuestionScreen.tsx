import { Button } from '@/shared/ui/button';
import type { Question } from '@/entities/question/model/questionTypes';
import './tournament-question-screen.css';

type TournamentQuestionScreenProps = {
  roundNumber: number;
  totalRounds: number;
  questionNumber: number;
  totalQuestions: number;
  question: Question | undefined;
  answer: string | boolean | undefined;
  onChangeAnswer: (answer: string | boolean) => void;
  onExit: () => void;
  onRestart: () => void;
  onAnswer: () => void;
};

const TournamentQuestionScreen = ({
  roundNumber,
  totalRounds,
  questionNumber,
  totalQuestions,
  answer,
  onChangeAnswer,
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

      <div className="tournament-question-screen__answer">
        {question?.type === 'openText' && (
          <input
            value={typeof answer === 'string' ? answer : ''}
            onChange={(event) => onChangeAnswer(event.target.value)}
            placeholder="Введите ответ"
          />
        )}

        {question?.type === 'boolean' && (
          <div className="tournament-question-screen__boolean-options">
            <Button
              variant={answer === true ? 'primary' : 'secondary'}
              onClick={() => onChangeAnswer(true)}
            >
              Да
            </Button>

            <Button
              variant={answer === false ? 'primary' : 'secondary'}
              onClick={() => onChangeAnswer(false)}
            >
              Нет
            </Button>
          </div>
        )}

        <Button variant="primary" onClick={onAnswer}>
          Ответить
        </Button>
      </div>
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
