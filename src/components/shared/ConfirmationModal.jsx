// src/components/shared/ConfirmationModal.jsx
import { Modal } from "./index";

/**
 * Confirmation modal component with confirm/cancel actions
 * @param {boolean} open - Modal visibility state
 * @param {function} onClose - Close handler
 * @param {string} title - Modal title
 * @param {string} message - Modal message
 * @param {string} confirmText - Confirm button text
 * @param {string} cancelText - Cancel button text
 * @param {function} onConfirm - Confirm action handler
 * @param {boolean} [loading=false] - Loading state
 * @returns {JSX.Element} Modal with confirmation options
 */
export const ConfirmationModal = ({
    open,
    onClose,
    title,
    message,
    confirmText,
    cancelText,
    onConfirm,
    loading = false
  }) => (
    <Modal open={open} onClose={onClose}>
      <div className="space-y-4 text-center">
        <h4 className="text-lg font-semibold text-text-primary">{title}</h4>
        <p className="text-sm text-text-secondary">{message}</p>
        <div className="flex space-x-2 justify-center">
          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:bg-red-400"
          >
            {loading ? 'Processing...' : confirmText}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-card-border text-text-primary rounded-md hover:bg-card-border/80"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </Modal>
  );