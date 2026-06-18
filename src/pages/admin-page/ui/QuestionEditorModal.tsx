import QuestionCreateForm from './QuestionCreateForm';
import type { AdminQuestionType, FieldErrors } from './admin.types';

type QuestionEditorModalProps = {
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
  isUploadingMedia: boolean;
  onMediaFileChange: (file: File) => Promise<void>;
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
  onClose: () => void;
  isCloseConfirmOpen: boolean;
  onCloseWithoutSaving: () => void;
  onBackToEditor: () => void;
  status: string | null;
  onClear: () => void;
};

const QuestionEditorModal = (props: QuestionEditorModalProps) => {
  return (
    <div className="admin-editor-modal-overlay">
      <div className="admin-editor-modal">
        <div className="admin-editor-modal-header">
          <h2>{props.isEditing ? 'Edit question' : 'Create question'}</h2>

          <button
            type="button"
            className="admin-editor-close"
            onClick={props.onClose}
          >
            ×
          </button>
        </div>

        <QuestionCreateForm {...props} />

        {props.isCloseConfirmOpen && (
          <div className="admin-confirm">
            <p>Discard changes?</p>

            <div className="admin-confirm-actions">
              <button type="submit" form="admin-question-form">
                Save and close
              </button>

              <button type="button" onClick={props.onCloseWithoutSaving}>
                Close without saving
              </button>

              <button type="button" onClick={props.onBackToEditor}>
                Back to editor
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionEditorModal;
