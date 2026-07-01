import type { PropsWithChildren } from 'react';

const RoundEditorPanel = ({ children }: PropsWithChildren) => {
  return <section className="round-editor-panel">{children}</section>;
};

export default RoundEditorPanel;
