// @vitest-environment jsdom
import { describe, expect, it } from 'vitest';

import { act, renderHook } from '@testing-library/react';

import { useQuestionEditor } from './useQuestionEditor';

describe('useQuestionEditor', () => {
  it('resets unsaved changes after loading saved values', () => {
    const { result } = renderHook(() => useQuestionEditor());

    act(() => {
      result.current.openEmptyForm();
    });

    act(() => {
      result.current.updateFormValue('questionText', 'New question');
    });

    expect(result.current.hasUnsavedChanges).toBe(true);

    act(() => {
      result.current.loadFormValues({
        ...result.current.formValues,
      });
    });

    expect(result.current.hasUnsavedChanges).toBe(false);
  });
});
