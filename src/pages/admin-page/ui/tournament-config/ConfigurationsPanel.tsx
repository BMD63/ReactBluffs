import type { PropsWithChildren } from 'react';

const ConfigurationsPanel = ({ children }: PropsWithChildren) => {
  return <section className="configurations-panel">{children}</section>;
};

export default ConfigurationsPanel;
