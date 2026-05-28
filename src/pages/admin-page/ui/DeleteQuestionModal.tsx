type DeleteQuestionModalProps = {
  onConfirm: () => void;
  onCancel: () => void;
};

const DeleteQuestionModal = ({
  onConfirm,
  onCancel,
}: DeleteQuestionModalProps) => {
  return (
    <div className="admin-editor-modal-overlay">
      <div className="admin-delete-modal">
        <div className="admin-delete-icon">⚠</div>

        <h2>Delete question?</h2>

        <p>This action cannot be undone.</p>

        <div className="admin-confirm-actions">
          <button
            type="button"
            className="admin-delete-button"
            onClick={onConfirm}
          >
            Delete
          </button>

          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteQuestionModal;
