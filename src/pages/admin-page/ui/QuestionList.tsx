import type { AdminQuestion } from './admin.types';
import QuestionListItem from './QuestionListItem';

type QuestionListProps = {
  questions: AdminQuestion[];
  expandedQuestionId: string | null;
  onToggleDetails: (questionId: string) => void;
  onDelete: (questionId: string) => void;
  onEdit: (questionId: string) => void;
  isLoading: boolean;
};

const QuestionList = ({
  questions,
  expandedQuestionId,
  onToggleDetails,
  onDelete,
  onEdit,
  isLoading,
}: QuestionListProps) => {
  return (
    <>
      <h2>Questions {isLoading ? '(loading...)' : `(${questions.length})`}</h2>

      {isLoading ? (
        <div className="questions-list">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="question-item question-item--skeleton">
              <div className="question-skeleton-line question-skeleton-line--title" />
              <div className="question-skeleton-line question-skeleton-line--short" />
            </div>
          ))}
        </div>
      ) : questions.length === 0 ? (
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
