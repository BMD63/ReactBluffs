import type { ReactNode } from 'react';

type FormFieldProps = {
  label: string;
  hint?: string | undefined;
  error?: string | undefined;
  children: ReactNode;
};

const FormField = ({ label, hint, error, children }: FormFieldProps) => {
  return (
    <label className="admin-form-field">
      <span className="admin-form-field__label">{label}</span>

      {children}

      {error && <span className="admin-form-field__error">{error}</span>}

      {hint && !error && <span className="admin-form-field__hint">{hint}</span>}
    </label>
  );
};

export default FormField;
