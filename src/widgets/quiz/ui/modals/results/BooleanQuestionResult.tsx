import type {
  BooleanQuestion,
} from '@/entities/question';

import type {
  CardAnswers,
} from '@/entities/quiz-session/model/quizSessionModel';

import { getQuestionResultData } from '../helpers/getQuestionResultData';

type BooleanQuestionResultProps = {
  question: BooleanQuestion;
  userAnswers: CardAnswers;
};

const BooleanQuestionResult = ({
  question,
  userAnswers,
}: BooleanQuestionResultProps) => {
  const {
    hasBonus,
    isCorrect,
    correctAnswerLabel,
    userAnswerLabel,
  } = getQuestionResultData(
    question,
    userAnswers
  );

  return (
    <div className="answer-item">
      <p>{question.text}</p>

      <p>
        Правильный ответ:{' '}
        {correctAnswerLabel}
      </p>

      <p>
        Ваш ответ: {userAnswerLabel}

        {isCorrect ? (
          <span className="result-icon success">
            {' '}
            ✔
          </span>
        ) : (
          <span className="result-icon error">
            {' '}
            ✖
          </span>
        )}
      </p>

      {isCorrect && hasBonus && (
        <p>Бонус</p>
      )}
    </div>
  );
};

export default BooleanQuestionResult;