import type { AdminQuestionType, FieldErrors } from './admin.types';

type QuestionCreateFormProps = {
  questionType: AdminQuestionType;
  questionText: string;
  answer: string;
  aliases: string;
  booleanAnswer: string;
  option1: string;
  option2: string;
  option3: string;
  multipleChoiceAnswer: string;
  fieldErrors: FieldErrors;
  isEditing: boolean;
  isSaving: boolean;
  mediaUrl: string;
  mediaAlt: string;
  onMediaUrlChange: (value: string) => void;
  onMediaAltChange: (value: string) => void;
  onQuestionTextChange: (value: string) => void;
  onAnswerChange: (value: string) => void;
  onAliasesChange: (value: string) => void;
  onBooleanAnswerChange: (value: string) => void;
  onOption1Change: (value: string) => void;
  onOption2Change: (value: string) => void;
  onOption3Change: (value: string) => void;
  onMultipleChoiceAnswerChange: (value: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onReset: () => void;
  onClear: () => void;
};

const QuestionCreateForm = ({
  questionType,
  questionText,
  answer,
  aliases,
  booleanAnswer,
  option1,
  option2,
  option3,
  multipleChoiceAnswer,
  fieldErrors,
  isEditing,
  isSaving,
  mediaUrl,
  mediaAlt,
  onMediaUrlChange,
  onMediaAltChange,
  onQuestionTextChange,
  onAnswerChange,
  onAliasesChange,
  onBooleanAnswerChange,
  onOption1Change,
  onOption2Change,
  onOption3Change,
  onMultipleChoiceAnswerChange,
  onSubmit,
  onReset,
  onClear,
}: QuestionCreateFormProps) => {
  return (
    <form id="admin-question-form" className="admin-form" onSubmit={onSubmit}>
      <label>
        Question text
        <textarea
          placeholder="Enter question text"
          value={questionText}
          onChange={(event) => onQuestionTextChange(event.target.value)}
        />
        {fieldErrors.text && <p className="error-text">{fieldErrors.text}</p>}
      </label>

      {questionType === 'openText' && (
        <>
          <label>
            Correct answer
            <input
              type="text"
              placeholder="Enter correct answer"
              value={answer}
              onChange={(event) => onAnswerChange(event.target.value)}
            />
            {fieldErrors.answer && (
              <p className="error-text">{fieldErrors.answer}</p>
            )}
          </label>
          <label>
            Aliases
            <textarea
              placeholder="One alias per line"
              value={aliases}
              onChange={(event) => onAliasesChange(event.target.value)}
            />
            <small>Alternative accepted answers. One alias per line.</small>
          </label>
        </>
      )}

      {(questionType === 'image' || questionType === 'audio') && (
        <>
          <label>
            Correct answer
            <input
              type="text"
              placeholder="Enter correct answer"
              value={answer}
              onChange={(event) => onAnswerChange(event.target.value)}
            />
            {fieldErrors.answer && (
              <p className="error-text">{fieldErrors.answer}</p>
            )}
          </label>

          <label>
            Media URL
            <input
              type="text"
              placeholder="Enter media URL"
              value={mediaUrl}
              onChange={(event) => onMediaUrlChange(event.target.value)}
            />
          </label>

          <label>
            Media alt
            <input
              type="text"
              placeholder="Enter media alt"
              value={mediaAlt}
              onChange={(event) => onMediaAltChange(event.target.value)}
            />
          </label>

          <label>
            Aliases
            <textarea
              placeholder="One alias per line"
              value={aliases}
              onChange={(event) => onAliasesChange(event.target.value)}
            />
            <small>Alternative accepted answers. One alias per line.</small>
          </label>
        </>
      )}

      {questionType === 'boolean' && (
        <label>
          Correct answer
          <select
            value={booleanAnswer}
            onChange={(event) => onBooleanAnswerChange(event.target.value)}
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </label>
      )}

      {questionType === 'multipleChoice' && (
        <>
          <label>
            Option 1
            <input
              type="text"
              value={option1}
              onChange={(event) => onOption1Change(event.target.value)}
            />
          </label>

          <label>
            Option 2
            <input
              type="text"
              value={option2}
              onChange={(event) => onOption2Change(event.target.value)}
            />
          </label>

          <label>
            Option 3
            <input
              type="text"
              value={option3}
              onChange={(event) => onOption3Change(event.target.value)}
            />
          </label>

          <label>
            Correct answer
            <select
              value={multipleChoiceAnswer}
              onChange={(event) =>
                onMultipleChoiceAnswerChange(event.target.value)
              }
            >
              <option value="">Select correct answer</option>
              {[option1, option2, option3].filter(Boolean).map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {fieldErrors.correctAnswer && (
              <p className="error-text">{fieldErrors.correctAnswer}</p>
            )}
          </label>
        </>
      )}

      <div className="admin-form-actions">
        <button type="submit" disabled={isSaving}>
          {isSaving
            ? isEditing
              ? 'Saving...'
              : 'Creating...'
            : isEditing
              ? 'Save question'
              : 'Create question'}
        </button>
        <button type="button" onClick={onReset}>
          Cancel
        </button>
        <button type="button" onClick={onClear}>
          Clear form
        </button>
      </div>
    </form>
  );
};

export default QuestionCreateForm;
