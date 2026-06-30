import type { PropsWithChildren } from 'react';

const AdminWorkspace = ({ children }: PropsWithChildren) => {
  return <section className="admin-workspace">{children}</section>;
};

export default AdminWorkspace;
