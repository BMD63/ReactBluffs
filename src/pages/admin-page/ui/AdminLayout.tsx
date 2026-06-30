import type { PropsWithChildren } from 'react';

const AdminLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="admin-layout">
      <main className="admin-layout__content">{children}</main>
    </div>
  );
};

export default AdminLayout;
