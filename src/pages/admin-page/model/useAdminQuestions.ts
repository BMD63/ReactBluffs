import { useEffect, useState } from 'react';

import { questionApi } from '@/entities/question/api/questionApi';

import type { AdminQuestion, AdminQuestionType } from '../ui/admin.types';
import type { QuestionDto } from '@/entities/question/api/questionApi.types';

type UseAdminQuestionsParams = {
  isUnlocked: boolean;
  adminToken: string | null;
  questionType: AdminQuestionType | null;
  onStatusChange: (status: string | null) => void;
};

const getGameModeByQuestionType = (questionType: AdminQuestionType) => {
  if (
    questionType === 'openText' ||
    questionType === 'image' ||
    questionType === 'audio'
  ) {
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
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);

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

        const data = await questionApi.getQuestionDtos({
          gameMode,
        });

        setQuestions(data as AdminQuestion[]);
      } catch {
        onStatusChange('Failed to load questions');
      } finally {
        setIsLoadingQuestions(false);
      }
    };

    loadQuestions();
  }, [isUnlocked, questionType, onStatusChange]);

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

    try {
      await questionApi.deleteQuestion(questionId, {
        adminToken,
      });
    } catch {
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

    try {
      const savedQuestion = (
        isEditing
          ? await questionApi.updateQuestion(
              (questionPayload as { id: string }).id,
              questionPayload as Parameters<
                typeof questionApi.updateQuestion
              >[1],
              { adminToken }
            )
          : await questionApi.createQuestion(
              questionPayload as Parameters<
                typeof questionApi.createQuestion
              >[0],
              { adminToken }
            )
      ) as AdminQuestion;

      const savedAdminQuestion = savedQuestion as AdminQuestion;

      setQuestions((currentQuestions) => {
        if (isEditing) {
          return currentQuestions.map((question) =>
            question.id === savedAdminQuestion.id
              ? savedAdminQuestion
              : question
          );
        }

        return [savedAdminQuestion, ...currentQuestions];
      });

      onStatusChange(isEditing ? 'Question updated!' : 'Question created!');

      return {
        ok: true,
        question: savedAdminQuestion,
      };
    } catch (error) {
      return {
        ok: false,
        error:
          error instanceof Error ? error.message : 'Failed to save question',
        details: null,
      };
    }
  };

  return {
    questions,
    deleteQuestion,
    saveQuestion,
    isLoadingQuestions,
  };
};
