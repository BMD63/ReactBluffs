import type { AdminQuestion } from './admin.types';
import QuestionDetails from './QuestionDetails';

type QuestionListItemProps = {
  question: AdminQuestion;
  isExpanded: boolean;
  onToggleDetails: (questionId: string) => void;
  onDelete: (questionId: string) => void;
  onEdit: (questionId: string) => void;
};

const QuestionListItem = ({
  question,
  isExpanded,
  onToggleDetails,
  onDelete,
  onEdit,
}: QuestionListItemProps) => {
  return (
    <div className="question-item">
      <div className="question-item__header">
        {question.type === 'image' && question.media?.url && (
          <img
            className="question-item__preview"
            src={question.media.url}
            alt={question.media.alt ?? question.text}
          />
        )}

        <p>{question.text}</p>
      </div>

      <div className="question-actions">
        <button type="button" onClick={() => onToggleDetails(question.id)}>
          {isExpanded ? 'Hide' : 'Show'}
        </button>

        <button type="button" onClick={() => onEdit(question.id)}>
          Edit
        </button>

        <button type="button" onClick={() => onDelete(question.id)}>
          Delete
        </button>
      </div>

      {isExpanded && <QuestionDetails question={question} />}
    </div>
  );
};

export default QuestionListItem;
