import type { OpenTextQuestion } from '@/entities/question';

import type { CardAnswers } from '@/entities/quiz-session/model/quizSessionModel';

import { getQuestionResultData } from '../helpers/getQuestionResultData';

type OpenAnswerQuestionResultProps = {
  question: OpenTextQuestion;
  userAnswers: CardAnswers;
};

const OpenAnswerQuestionResult = ({
  question,
  userAnswers,
}: OpenAnswerQuestionResultProps) => {
  const { isCorrect, correctAnswerLabel, userAnswerLabel } =
    getQuestionResultData(question, userAnswers);

  return (
    <div className="answer-item">
      <p>{question.text}</p>

      <p>Один из правильных ответов: {correctAnswerLabel}</p>

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

export default OpenAnswerQuestionResult;
