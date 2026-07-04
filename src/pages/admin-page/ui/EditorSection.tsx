import type { ReactNode } from 'react';

type EditorSectionProps = {
  title: string;
  children: ReactNode;
};

const EditorSection = ({ title, children }: EditorSectionProps) => {
  return (
    <div className="admin-editor-section">
      <h4>{title}</h4>

      {children}
    </div>
  );
};

export default EditorSection;
