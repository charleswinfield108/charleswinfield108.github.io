import { X } from 'lucide-react'
import type { Message } from '../../types'
import './ViewMessageModal.css'

interface ViewMessageModalProps {
  message: Message | null
  onClose: () => void
}

export function ViewMessageModal({ message, onClose }: ViewMessageModalProps) {
  if (!message) return null

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleEscape = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }

  // Format date nicely
  const date = new Date(message.created_at)
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div
      className="modal-backdrop"
      onClick={handleBackdropClick}
      onKeyDown={handleEscape}
      role="presentation"
    >
      <div className="modal modal-message" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="modal-header">
          <h2 id="modal-title" className="modal-title">Message Details</h2>
          <button
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className="message-detail">
            <div className="detail-row">
              <label className="detail-label">From</label>
              <p className="detail-value">{message.name}</p>
            </div>

            <div className="detail-row">
              <label className="detail-label">Email</label>
              <a href={`mailto:${message.email}`} className="detail-value detail-link">
                {message.email}
              </a>
            </div>

            <div className="detail-row">
              <label className="detail-label">Date</label>
              <p className="detail-value">{formattedDate}</p>
            </div>

            <div className="detail-row detail-row-full">
              <label className="detail-label">Message</label>
              <div className="message-body">
                {message.message}
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button
            className="btn btn-outline"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
