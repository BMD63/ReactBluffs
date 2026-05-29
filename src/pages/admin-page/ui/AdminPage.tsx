import { useEffect, useState } from 'react';
import AdminToolbar from './AdminToolbar';
import QuestionList from './QuestionList';
import QuestionEditorModal from './QuestionEditorModal';
import DeleteQuestionModal from './DeleteQuestionModal';
import AdminToast from './AdminToast';
import { useQuestionEditor } from '../model/useQuestionEditor';
import { useAdminQuestions } from '../model/useAdminQuestions';
import { createFormValuesFromQuestion } from '../model/createFormValuesFromQuestion';
import type { AdminQuestionType, FieldErrors } from './admin.types';

import './AdminPage.css';

const ADMIN_TOKEN_STORAGE_KEY = 'quiz-admin-token';

const AdminPage = () => {
  const [password, setPassword] = useState('');

  const [questionType, setQuestionType] = useState<AdminQuestionType | null>(
    null
  );
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [questionIdToDelete, setQuestionIdToDelete] = useState<string | null>(
    null
  );
  const [status, setStatus] = useState<string | null>(null);
  const [isSavingQuestion, setIsSavingQuestion] = useState(false);
  const [isCloseConfirmOpen, setIsCloseConfirmOpen] = useState(false);

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(
    null
  );
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(
    null
  );

  const {
    formValues,
    hasUnsavedChanges,
    updateFormValue,
    resetForm,
    loadFormValues,
    resetToInitialFormValues,
    openEmptyForm,
  } = useQuestionEditor();

  useEffect(() => {
    if (!status) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setStatus(null);
    }, 5000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [status]);

  const adminToken = sessionStorage.getItem(ADMIN_TOKEN_STORAGE_KEY);
  const isUnlocked = Boolean(adminToken);
  const { questions, deleteQuestion, saveQuestion } = useAdminQuestions({
    isUnlocked,
    adminToken,
    onStatusChange: setStatus,
  });

  const handleUnlock = () => {
    if (!password.trim()) {
      return;
    }

    sessionStorage.setItem(ADMIN_TOKEN_STORAGE_KEY, password.trim());

    window.location.reload();
  };

  const buildQuestionPayload = () => {
    if (questionType === 'openText') {
      return {
        id: editingQuestionId ?? crypto.randomUUID(),
        type: 'openText',
        gameMode: 'openAnswer',
        text: formValues.questionText,
        answer: formValues.answer,
        aliases: formValues.aliases
          .split('\n')
          .map((alias) => alias.trim())
          .filter(Boolean),
        category: 'general',
      };
    }

    if (questionType === 'boolean') {
      return {
        id: editingQuestionId ?? crypto.randomUUID(),
        type: 'boolean',
        gameMode: 'bluff',
        text: formValues.questionText,
        correctAnswer: formValues.booleanAnswer === 'true',
        category: 'general',
      };
    }

    return {
      id: editingQuestionId ?? crypto.randomUUID(),
      type: 'multipleChoice',
      gameMode: 'multipleChoice',
      text: formValues.questionText,
      options: [formValues.option1, formValues.option2, formValues.option3],
      correctAnswer: formValues.multipleChoiceAnswer,
      category: 'general',
    };
  };

  const handleCreateQuestion = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setFieldErrors({});

    if (!adminToken) {
      return;
    }

    setStatus('Creating question...');
    setIsSavingQuestion(true);

    try {
      const result = await saveQuestion({
        questionPayload: buildQuestionPayload(),
        isEditing: Boolean(editingQuestionId),
      });

      if (!result.ok) {
        const errors = Object.fromEntries(
          (result.details ?? [])
            .filter((issue: { path?: string[] }) => issue.path?.[0])
            .map((issue: { path: string[]; message: string }) => [
              issue.path[0],
              issue.message,
            ])
        );

        setFieldErrors(errors);
        setStatus(result.error);

        return;
      }

      if (editingQuestionId) {
        loadFormValues(formValues);
      } else {
        openEmptyForm();
      }

      setIsCloseConfirmOpen(false);

      setStatus(editingQuestionId ? 'Question updated!' : 'Question created!');
    } finally {
      setIsSavingQuestion(false);
    }
  };

  const handleResetForm = () => {
    setFieldErrors({});
    setStatus(null);

    resetToInitialFormValues();
  };

  const handleToolbarToggle = () => {
    if (!isCreateFormOpen) {
      setEditingQuestionId(null);
      setFieldErrors({});
      setStatus(null);
      openEmptyForm();
      setIsCreateFormOpen(true);

      return;
    }

    if (hasUnsavedChanges) {
      setIsCloseConfirmOpen(true);

      return;
    }

    closeQuestionForm();
  };

  // ***   JSX   ***

  if (!isUnlocked) {
    return (
      <div className="app">
        <div className="modal">
          <h1>Admin Access</h1>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <button type="button" onClick={handleUnlock}>
            Unlock
          </button>
        </div>
      </div>
    );
  }

  const normalizedSearchQuery = searchQuery.trim().toLowerCase();

  const filteredQuestions = questions.filter((question) => {
    const matchesType = question.type === questionType;

    if (!normalizedSearchQuery) {
      return matchesType;
    }

    // return (
    //   matchesType && question.text.toLowerCase().includes(normalizedSearchQuery)
    // );
    const searchableText = [
      question.text,
      question.answer,
      question.correctAnswer,
      ...(question.aliases ?? []),
      ...(question.options ?? []),
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    return matchesType && searchableText.includes(normalizedSearchQuery);
  });

  const closeQuestionForm = () => {
    setEditingQuestionId(null);
    setIsCreateFormOpen(false);
    setFieldErrors({});
    setStatus(null);
    resetForm();
    setIsCloseConfirmOpen(false);
  };

  const handleEditQuestion = (questionId: string) => {
    const questionToEdit = questions.find(
      (question) => question.id === questionId
    );

    if (!questionToEdit) {
      return;
    }

    setEditingQuestionId(questionId);
    setQuestionType(questionToEdit.type);
    setIsCreateFormOpen(true);
    loadFormValues(createFormValuesFromQuestion(questionToEdit));
  };

  return (
    <div className="app">
      <div className="modal">
        <AdminToast message={status} />
        <h1>Admin</h1>
        <AdminToolbar
          questionType={questionType}
          isCreateFormOpen={isCreateFormOpen}
          onQuestionTypeChange={(type) => {
            setQuestionType(type);
            setSearchQuery('');
            setIsCreateFormOpen(false);
          }}
          onAddQuestion={handleToolbarToggle}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        {questionType && (
          <>
            {isCreateFormOpen && (
              <QuestionEditorModal
                questionType={questionType}
                questionText={formValues.questionText}
                answer={formValues.answer}
                aliases={formValues.aliases}
                status={status}
                booleanAnswer={formValues.booleanAnswer}
                option1={formValues.option1}
                option2={formValues.option2}
                option3={formValues.option3}
                multipleChoiceAnswer={formValues.multipleChoiceAnswer}
                fieldErrors={fieldErrors}
                isEditing={Boolean(editingQuestionId)}
                isSaving={isSavingQuestion}
                isCloseConfirmOpen={isCloseConfirmOpen}
                onCloseWithoutSaving={closeQuestionForm}
                onBackToEditor={() => setIsCloseConfirmOpen(false)}
                onQuestionTextChange={(value) =>
                  updateFormValue('questionText', value)
                }
                onAnswerChange={(value) => updateFormValue('answer', value)}
                onAliasesChange={(value) => updateFormValue('aliases', value)}
                onBooleanAnswerChange={(value) =>
                  updateFormValue('booleanAnswer', value)
                }
                onOption1Change={(value) => updateFormValue('option1', value)}
                onOption2Change={(value) => updateFormValue('option2', value)}
                onOption3Change={(value) => updateFormValue('option3', value)}
                onMultipleChoiceAnswerChange={(value) =>
                  updateFormValue('multipleChoiceAnswer', value)
                }
                onSubmit={handleCreateQuestion}
                onReset={handleResetForm}
                onClose={handleToolbarToggle}
                onClear={openEmptyForm}
              />
            )}

            {questionIdToDelete && (
              <DeleteQuestionModal
                onConfirm={() => {
                  deleteQuestion(questionIdToDelete);
                  setQuestionIdToDelete(null);
                }}
                onCancel={() => setQuestionIdToDelete(null)}
              />
            )}

            <hr />

            <QuestionList
              questions={filteredQuestions}
              expandedQuestionId={expandedQuestionId}
              onToggleDetails={(questionId) =>
                setExpandedQuestionId(
                  expandedQuestionId === questionId ? null : questionId
                )
              }
              onDelete={setQuestionIdToDelete}
              onEdit={handleEditQuestion}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
