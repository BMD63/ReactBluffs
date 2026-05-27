import { useState } from 'react';
import type { QuestionFormValues } from '../ui/admin.types';
import { EMPTY_QUESTION_FORM_VALUES } from './questionForm.constants';

export const useQuestionEditor = () => {
  const [formValues, setFormValues] = useState<QuestionFormValues>(
    EMPTY_QUESTION_FORM_VALUES
  );

  const [initialFormValues, setInitialFormValues] =
    useState<QuestionFormValues | null>(null);

  const hasUnsavedChanges =
    initialFormValues !== null &&
    JSON.stringify(formValues) !== JSON.stringify(initialFormValues);

  const updateFormValue = (field: keyof QuestionFormValues, value: string) => {
    setFormValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));
  };

  const resetForm = () => {
    setFormValues(EMPTY_QUESTION_FORM_VALUES);
  };

  const loadFormValues = (values: QuestionFormValues) => {
    setFormValues(values);
    setInitialFormValues(values);
  };

  const resetToInitialFormValues = () => {
    setFormValues(initialFormValues ?? EMPTY_QUESTION_FORM_VALUES);
  };

  const openEmptyForm = () => {
    loadFormValues(EMPTY_QUESTION_FORM_VALUES);
  };

  return {
    formValues,
    hasUnsavedChanges,
    updateFormValue,
    resetForm,
    loadFormValues,
    resetToInitialFormValues,
    openEmptyForm,
  };
};
