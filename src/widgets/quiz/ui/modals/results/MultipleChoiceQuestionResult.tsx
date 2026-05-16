import type { MultipleChoiceQuestion } from '@/entities/question';

import type { CardAnswers } from '@/entities/quiz-session/model/quizSessionModel';

import { getQuestionResultData } from '../helpers/getQuestionResultData';

type MultipleChoiceQuestionResultProps = {
  question: MultipleChoiceQuestion;
  userAnswers: CardAnswers;
};

const MultipleChoiceQuestionResult = ({
  question,
  userAnswers,
}: MultipleChoiceQuestionResultProps) => {
  const { isCorrect, correctAnswerLabel, userAnswerLabel } =
    getQuestionResultData(question, userAnswers);

  return (
    <div className="answer-item">
      <p>{question.text}</p>

      <p>Правильный ответ: {correctAnswerLabel}</p>

      <p>
        Ваш ответ: {userAnswerLabel}
        {isCorrect ? (
          <span className="result-icon success"> ✔</span>
        ) : (
          <span className="result-icon error"> ✖</span>
        )}
      </p>
    </div>
  );
};

export default MultipleChoiceQuestionResult;
