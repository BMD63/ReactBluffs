import type { AdminQuestion } from './admin.types';

type QuestionDetailsProps = {
  question: AdminQuestion;
};

const QuestionDetails = ({ question }: QuestionDetailsProps) => {
  return (
    <div className="question-details">
      {question.type === 'audio' && question.media?.url && (
        <audio
          className="question-details__audio"
          controls
          src={question.media.url}
        />
      )}

      {'answer' in question && question.answer && (
        <p>Answer: {question.answer}</p>
      )}

      {'correctAnswer' in question && question.correctAnswer !== undefined && (
        <p>
          Correct answer:{' '}
          {typeof question.correctAnswer === 'boolean'
            ? question.correctAnswer
              ? 'True'
              : 'False'
            : question.correctAnswer}
        </p>
      )}

      {question.aliases?.length ? (
        <p>Aliases: {question.aliases.join(', ')}</p>
      ) : null}

      {question.options?.length ? (
        <p>Options: {question.options.join(', ')}</p>
      ) : null}
    </div>
  );
};

export default QuestionDetails;
