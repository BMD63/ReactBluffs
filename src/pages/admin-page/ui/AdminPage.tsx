import { useEffect, useState } from 'react';
import AdminToolbar from './AdminToolbar';
import QuestionList from './QuestionList';
import AdminHome from './AdminHome';
import AdminNav from './AdminNav';
import QuestionEditorModal from './QuestionEditorModal';
import DeleteQuestionModal from './DeleteQuestionModal';
import AdminLayout from './AdminLayout';
import AdminWorkspace from './AdminWorkspace';
import { TournamentConfigPage } from './tournament-config';
import AdminToast from './AdminToast';
import { useQuestionEditor } from '../model/useQuestionEditor';
import { useAdminQuestions } from '../model//useAdminQuestions';
import { createFormValuesFromQuestion } from '../model/createFormValuesFromQuestion';
import { uploadQuestionMedia } from '@/shared/api/uploadQuestionMedia';
import type {
  AdminQuestionType,
  FieldErrors,
  AdminQuestion,
} from './admin.types';

import './AdminPage.css';

type AdminSection = 'home' | 'questions' | 'tournamentConfig';

const ADMIN_TOKEN_STORAGE_KEY = 'quiz-admin-token';

const AdminPage = () => {
  const [password, setPassword] = useState('');

  const [adminSection, setAdminSection] = useState<AdminSection>('home');

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
  const [isUploadingMedia, setIsUploadingMedia] = useState(false);

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(
    null
  );
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(
    null
  );

  const [shouldCloseAfterSave, setShouldCloseAfterSave] = useState(false);

  const [fileInputResetKey, setFileInputResetKey] = useState(0);
  const [uploadedFileName, setUploadedFileName] = useState('');

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
  const { questions, deleteQuestion, saveQuestion, isLoadingQuestions } =
    useAdminQuestions({
      isUnlocked,
      adminToken,
      questionType,
      onStatusChange: setStatus,
    });

  const handleUnlock = () => {
    if (!password.trim()) {
      return;
    }

    sessionStorage.setItem(ADMIN_TOKEN_STORAGE_KEY, password.trim());

    window.location.reload();
  };

  const handleClearForm = () => {
    openEmptyForm();
    setFileInputResetKey((key) => key + 1);
    setUploadedFileName('');
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

    if (questionType === 'image' || questionType === 'audio') {
      return {
        id: editingQuestionId ?? crypto.randomUUID(),
        type: questionType,
        gameMode: 'openAnswer',
        text: formValues.questionText,
        answer: formValues.answer,
        aliases: formValues.aliases
          .split('\n')
          .map((alias) => alias.trim())
          .filter(Boolean),
        category: 'general',

        media: {
          type: questionType,
          url: formValues.mediaUrl,
          alt: formValues.mediaAlt || undefined,
        },
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
        setStatus(result.error ?? 'Failed to save question');

        return;
      }

      if (shouldCloseAfterSave) {
        setShouldCloseAfterSave(false);
        closeQuestionForm();
        setStatus(
          editingQuestionId ? 'Question updated!' : 'Question created!'
        );

        return;
      }

      if (editingQuestionId) {
        loadFormValues(formValues);
      } else {
        openEmptyForm();
      }

      setFileInputResetKey((key) => key + 1);
      setIsCloseConfirmOpen(false);

      setStatus(editingQuestionId ? 'Question updated!' : 'Question created!');
    } finally {
      setIsSavingQuestion(false);
    }
  };

  const handleMediaFileChange = async (file: File) => {
    setUploadedFileName(file.name);
    if (
      !questionType ||
      (questionType !== 'image' && questionType !== 'audio')
    ) {
      return;
    }

    setIsUploadingMedia(true);

    try {
      if (!adminToken) {
        return;
      }

      const mediaUrl = await uploadQuestionMedia(
        file,
        questionType,
        adminToken
      );

      updateFormValue('mediaUrl', mediaUrl);
    } catch {
      setStatus('Failed to upload media');
    } finally {
      setIsUploadingMedia(false);
    }
  };

  const closeQuestionForm = () => {
    setEditingQuestionId(null);
    setIsCreateFormOpen(false);
    setFieldErrors({});
    setStatus(null);
    resetForm();
    setIsCloseConfirmOpen(false);
    setFileInputResetKey((key) => key + 1);
    setUploadedFileName('');
  };

  const handleResetForm = () => {
    setFieldErrors({});
    setStatus(null);
    setFileInputResetKey((key) => key + 1);
    resetToInitialFormValues();
    setUploadedFileName('');
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

  const isFormEmpty =
    !formValues.questionText &&
    !formValues.answer &&
    !formValues.aliases &&
    !formValues.option1 &&
    !formValues.option2 &&
    !formValues.option3 &&
    !formValues.multipleChoiceAnswer &&
    !formValues.mediaUrl &&
    !formValues.mediaAlt;

  // ***   JSX   ***

  if (!isUnlocked) {
    return (
      <AdminLayout>
        <section className="admin-login">
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
        </section>
      </AdminLayout>
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
    <AdminLayout>
      <AdminToast message={status} />
      <h1>Admin</h1>
      <AdminNav
        activeSection={adminSection}
        onSectionChange={setAdminSection}
      />
      <AdminWorkspace>
        {adminSection === 'home' && <AdminHome />}

        {adminSection === 'tournamentConfig' && <TournamentConfigPage />}

        {adminSection === 'questions' && (
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
        )}

        {adminSection === 'questions' && questionType && (
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
                fileInputResetKey={fileInputResetKey}
                uploadedFileName={uploadedFileName}
                fieldErrors={fieldErrors}
                isEditing={Boolean(editingQuestionId)}
                isSaving={isSavingQuestion}
                isCloseConfirmOpen={isCloseConfirmOpen}
                mediaUrl={formValues.mediaUrl}
                mediaAlt={formValues.mediaAlt}
                isUploadingMedia={isUploadingMedia}
                shouldShowClearButton={!isFormEmpty}
                onSaveAndClose={() => setShouldCloseAfterSave(true)}
                onMediaFileChange={handleMediaFileChange}
                onMediaUrlChange={(value) => updateFormValue('mediaUrl', value)}
                onMediaAltChange={(value) => updateFormValue('mediaAlt', value)}
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
                onClear={handleClearForm}
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
              isLoading={isLoadingQuestions}
            />
          </>
        )}
      </AdminWorkspace>
    </AdminLayout>
  );
};

export default AdminPage;
