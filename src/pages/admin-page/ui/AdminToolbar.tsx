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
      <div className="admin-toolbar-item">
        <label htmlFor="admin-question-type">Question type</label>

        <select
          id="admin-question-type"
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
          <option value="image">Image question</option>
          <option value="audio">Audio question</option>
          <option value="multipleChoice">Multiple choice</option>
          <option value="boolean">Bluff / True-False</option>
        </select>
      </div>

      {questionType && (
        <div className="admin-toolbar-item">
          <label htmlFor="admin-search">Search</label>

          <div className="admin-search-input-wrapper">
            <input
              id="admin-search"
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
        </div>
      )}

      {questionType && (
        <div className="admin-toolbar-item">
          <span className="admin-toolbar-placeholder">Actions</span>

          <button
            type="button"
            className="admin-toolbar-action"
            onClick={onAddQuestion}
          >
            {isCreateFormOpen ? 'Close editor' : 'Add question'}
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminToolbar;
