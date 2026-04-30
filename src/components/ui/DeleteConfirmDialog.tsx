import { AlertCircle } from 'lucide-react'
import './ViewMessageModal.css'

interface DeleteConfirmDialogProps {
  isOpen: boolean
  onConfirm: () => void
  onCancel: () => void
  isLoading?: boolean
}

export function DeleteConfirmDialog({
  isOpen,
  onConfirm,
  onCancel,
  isLoading = false,
}: DeleteConfirmDialogProps) {
  if (!isOpen) return null

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !isLoading) {
      onCancel()
    }
  }

  const handleEscape = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && !isLoading) {
      onCancel()
    }
  }

  return (
    <div
      className="modal-backdrop"
      onClick={handleBackdropClick}
      onKeyDown={handleEscape}
      role="presentation"
    >
      <div className="modal modal-dialog-confirm" role="alertdialog" aria-modal="true">
        <div className="modal-header" style={{ borderBottom: 'none' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', width: '100%' }}>
            <AlertCircle size={24} color="#ef4444" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <h2 className="modal-title" style={{ marginBottom: '8px' }}>Delete Message</h2>
              <p className="modal-dialog-message" style={{ marginBottom: '0' }}>
                Are you sure you want to delete this message? This action cannot be undone.
              </p>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button
            className="btn btn-outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            className="btn btn-danger"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}
