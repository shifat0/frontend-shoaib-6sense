import { ConfirmationModalProps } from "../lib/definitions";

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  operation,
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg space-y-4">
        <span className="text-gray-800">
          Are you sure you want to {operation} this user?
        </span>
        <div className="flex items-center justify-center gap-3">
          <button onClick={onConfirm} className="btn">
            Confirm
          </button>
          <button onClick={onClose} className="btn">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
