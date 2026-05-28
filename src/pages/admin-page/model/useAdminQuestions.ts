import { useEffect, useState } from 'react';
import type { AdminQuestion } from '../ui/admin.types';

type UseAdminQuestionsParams = {
  isUnlocked: boolean;
  adminToken: string | null;
  onStatusChange: (status: string | null) => void;
};

export const useAdminQuestions = ({
  isUnlocked,
  adminToken,
  onStatusChange,
}: UseAdminQuestionsParams) => {
  const [questions, setQuestions] = useState<AdminQuestion[]>([]);

  useEffect(() => {
    if (!isUnlocked) {
      return;
    }

    const loadQuestions = async () => {
      const response = await fetch('/api/questions');

      if (!response.ok) {
        return;
      }

      const data = await response.json();

      setQuestions(data);
    };

    loadQuestions();
  }, [isUnlocked]);

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
    setQuestions,
    deleteQuestion,
    saveQuestion,
  };
};
