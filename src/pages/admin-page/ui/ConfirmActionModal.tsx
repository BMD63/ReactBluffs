import { Button } from '@/shared/ui/button';

type ConfirmActionModalProps = {
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDanger?: boolean;
};

const ConfirmActionModal = ({
  title,
  description,
  confirmLabel,
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  isDanger = false,
}: ConfirmActionModalProps) => {
  return (
    <div className="admin-confirm-modal">
      <div className="admin-confirm-modal__card">
        <h3>{title}</h3>

        <p>{description}</p>

        <div className="admin-confirm-modal__actions">
          <Button type="button" variant="secondary" onClick={onCancel}>
            {cancelLabel}
          </Button>

          <Button type="button" variant="primary" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmActionModal;
