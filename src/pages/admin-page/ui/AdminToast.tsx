type AdminToastProps = {
  message: string | null;
};

const getToastType = (message: string) => {
  if (message.toLowerCase().includes('failed')) {
    return 'error';
  }

  if (
    message.toLowerCase().includes('created') ||
    message.toLowerCase().includes('updated') ||
    message.toLowerCase().includes('deleted')
  ) {
    return 'success';
  }

  return 'info';
};

const AdminToast = ({ message }: AdminToastProps) => {
  if (!message) {
    return null;
  }

  return (
    <div
      className={`admin-toast admin-toast--${getToastType(message)}`}
      role="status"
    >
      {message}
    </div>
  );
};

export default AdminToast;
