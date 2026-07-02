import type { ReactNode } from 'react';

type FormFieldProps = {
  label: string;
  hint?: string;
  children: ReactNode;
};

const FormField = ({ label, hint, children }: FormFieldProps) => {
  return (
    <label className="admin-form-field">
      <span className="admin-form-field__label">{label}</span>

      {children}

      {hint && <span className="admin-form-field__hint">{hint}</span>}
    </label>
  );
};

export default FormField;
