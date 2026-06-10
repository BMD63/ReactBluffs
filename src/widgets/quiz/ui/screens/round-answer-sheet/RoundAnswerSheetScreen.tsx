import { Button } from '@/shared/ui/button';
import type { Question } from '@/entities/question/model/questionTypes';
import './round-answer-sheet-screen.css';

type RoundAnswerSheetScreenProps = {
  roundNumber: number;
  totalRounds: number;
  questionsCount: number;
  questions: Question[];
  answersByQuestionId: Record<string, string | boolean>;

  onFinishRound: () => void;
  onExit: () => void;
  onRestart: () => void;
  onChangeAnswer: (questionId: string, answer: string | boolean) => void;
};

const RoundAnswerSheetScreen = ({
  roundNumber,
  totalRounds,
  questionsCount,
  questions,
  answersByQuestionId,
  onFinishRound,
  onExit,
  onRestart,
  onChangeAnswer,
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

      <div className="round-answer-sheet__answers">
        {questions.map((question, index) => {
          const answer = answersByQuestionId[question.id];

          const formattedAnswer =
            answer === undefined
              ? ''
              : answer === true
                ? 'Да'
                : answer === false
                  ? 'Нет'
                  : answer;

          return (
            <div key={question.id} className="round-answer-sheet__answer">
              <span>{index + 1}.</span>

              {question.type === 'boolean' ? (
                <div className="round-answer-sheet__boolean-options">
                  <Button
                    variant={answer === true ? 'primary' : 'secondary'}
                    onClick={() => onChangeAnswer(question.id, true)}
                  >
                    Да
                  </Button>

                  <Button
                    variant={answer === false ? 'primary' : 'secondary'}
                    onClick={() => onChangeAnswer(question.id, false)}
                  >
                    Нет
                  </Button>
                </div>
              ) : (
                <input
                  value={
                    typeof formattedAnswer === 'string' ? formattedAnswer : ''
                  }
                  onChange={(event) =>
                    onChangeAnswer(question.id, event.target.value)
                  }
                  placeholder="—"
                />
              )}
            </div>
          );
        })}
      </div>

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
