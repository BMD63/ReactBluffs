import type { AdminQuestionType } from './admin.types';

type AdminToolbarProps = {
  questionType: AdminQuestionType | null;
  isCreateFormOpen: boolean;
  onQuestionTypeChange: (questionType: AdminQuestionType | null) => void;
  onAddQuestion: () => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
};

const AdminToolbar = ({
  questionType,
  isCreateFormOpen,
  onQuestionTypeChange,
  onAddQuestion,
  searchQuery,
  onSearchChange,
}: AdminToolbarProps) => {
  return (
    <div className="admin-toolbar">
      <label>
        Question type
        <select
          value={questionType ?? ''}
          onChange={(event) =>
            onQuestionTypeChange(
              event.target.value
                ? (event.target.value as AdminQuestionType)
                : null
            )
          }
        >
          <option value="">Select question type</option>
          <option value="openText">Open answer</option>
          <option value="multipleChoice">Multiple choice</option>
          <option value="boolean">Bluff / True-False</option>
        </select>
      </label>
      {questionType && (
        <label className="admin-search">
          Search
          <div className="admin-search-input-wrapper">
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(event) => onSearchChange(event.target.value)}
            />

            {searchQuery && (
              <button
                type="button"
                className="admin-search-clear"
                onClick={() => onSearchChange('')}
              >
                ×
              </button>
            )}
          </div>
        </label>
      )}

      {questionType && (
        <button type="button" onClick={onAddQuestion}>
          {isCreateFormOpen ? 'Close editor' : 'Add question'}
        </button>
      )}
    </div>
  );
};

export default AdminToolbar;
