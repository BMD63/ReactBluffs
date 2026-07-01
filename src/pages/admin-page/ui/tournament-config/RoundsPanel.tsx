import type { PropsWithChildren } from 'react';

const RoundsPanel = ({ children }: PropsWithChildren) => {
  return <section className="rounds-panel">{children}</section>;
};

export default RoundsPanel;
