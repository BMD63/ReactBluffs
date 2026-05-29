import { useEffect, useState } from 'react';
import type { AdminQuestion, AdminQuestionType } from '../ui/admin.types';

type UseAdminQuestionsParams = {
  isUnlocked: boolean;
  adminToken: string | null;
  questionType: AdminQuestionType | null;
  onStatusChange: (status: string | null) => void;
};

const getGameModeByQuestionType = (questionType: AdminQuestionType) => {
  if (questionType === 'openText') {
    return 'openAnswer';
  }

  if (questionType === 'boolean') {
    return 'bluff';
  }

  return 'multipleChoice';
};

export const useAdminQuestions = ({
  isUnlocked,
  adminToken,
  questionType,
  onStatusChange,
}: UseAdminQuestionsParams) => {
  const [questions, setQuestions] = useState<AdminQuestion[]>([]);

  useEffect(() => {
    if (!isUnlocked || !questionType) {
      setQuestions([]);
      return;
    }

    const loadQuestions = async () => {
      setQuestions([]);
      setIsLoadingQuestions(true);

      try {
        const gameMode = getGameModeByQuestionType(questionType);

        const response = await fetch(`/api/questions?gameMode=${gameMode}`);

        if (!response.ok) {
          onStatusChange('Failed to load questions');
          return;
        }

        const data = await response.json();

        setQuestions(data);
      } finally {
        setIsLoadingQuestions(false);
      }
    };

    loadQuestions();
  }, [isUnlocked, questionType, onStatusChange]);

  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);

  const deleteQuestion = async (questionId: string) => {
    if (!adminToken) {
      return;
    }

    const questionToDelete = questions.find(
      (question) => question.id === questionId
    );

    if (!questionToDelete) {
      return;
    }

    setQuestions((currentQuestions) =>
      currentQuestions.filter((question) => question.id !== questionId)
    );

    onStatusChange('Question deleted');

    const response = await fetch(`/api/questions?id=${questionId}`, {
      method: 'DELETE',
      headers: {
        'x-admin-token': adminToken,
      },
    });

    if (!response.ok) {
      setQuestions((currentQuestions) => [
        questionToDelete,
        ...currentQuestions,
      ]);

      onStatusChange('Failed to delete question');
    }
  };

  const saveQuestion = async ({
    questionPayload,
    isEditing,
  }: {
    questionPayload: unknown;
    isEditing: boolean;
  }) => {
    if (!adminToken) {
      return {
        ok: false,
        error: 'Admin token is missing',
        details: null,
      };
    }

    const response = await fetch('/api/questions', {
      method: isEditing ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-token': adminToken,
      },
      body: JSON.stringify(questionPayload),
    });

    if (!response.ok) {
      const errorData = await response.json();

      return {
        ok: false,
        error: errorData.error ?? 'Failed to save question',
        details: errorData.details ?? null,
      };
    }

    const savedQuestion = await response.json();

    setQuestions((currentQuestions) => {
      if (isEditing) {
        return currentQuestions.map((question) =>
          question.id === savedQuestion.id ? savedQuestion : question
        );
      }

      return [savedQuestion, ...currentQuestions];
    });

    onStatusChange(isEditing ? 'Question updated!' : 'Question created!');

    return {
      ok: true,
      question: savedQuestion,
    };
  };

  return {
    questions,
    deleteQuestion,
    saveQuestion,
    isLoadingQuestions,
  };
};
