import type { AdminQuestion } from './admin.types';
import QuestionListItem from './QuestionListItem';

type QuestionListProps = {
  questions: AdminQuestion[];
  expandedQuestionId: string | null;
  onToggleDetails: (questionId: string) => void;
  onDelete: (questionId: string) => void;
  onEdit: (questionId: string) => void;
};

const QuestionList = ({
  questions,
  expandedQuestionId,
  onToggleDetails,
  onDelete,
  onEdit,
}: QuestionListProps) => {
  return (
    <>
      <h2>Questions ({questions.length})</h2>

      {questions.length === 0 ? (
        <p>No questions for this type yet.</p>
      ) : (
        <div className="questions-list">
          {questions.map((question) => (
            <QuestionListItem
              key={question.id}
              question={question}
              isExpanded={expandedQuestionId === question.id}
              onToggleDetails={onToggleDetails}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default QuestionList;
