import { Trash2, Eye } from 'lucide-react'
import type { Message } from '../../types'
import './MessagesTable.css'

interface MessagesTableProps {
  messages: Message[]
  isLoading: boolean
  error: string | null
  onViewMessage: (message: Message) => void
  onDeleteMessage: (id: string) => void
  isDeleting: boolean
}

export function MessagesTable({
  messages,
  isLoading,
  error,
  onViewMessage,
  onDeleteMessage,
  isDeleting,
}: MessagesTableProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (isLoading) {
    return (
      <div className="messages-table-loading">
        <div className="spinner" />
        <p>Loading messages...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="messages-table-error" role="alert">
        <p>{error}</p>
      </div>
    )
  }

  if (messages.length === 0) {
    return (
      <div className="messages-table-empty">
        <p>No messages yet. Contact submissions will appear here.</p>
      </div>
    )
  }

  return (
    <div className="messages-table-wrapper">
      <div className="messages-table-count">
        {messages.length} message{messages.length !== 1 ? 's' : ''}
      </div>
      <table className="messages-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {messages.map(message => (
            <tr key={message.id} className="message-row">
              <td className="cell-name">{message.name}</td>
              <td className="cell-email">
                <a href={`mailto:${message.email}`}>{message.email}</a>
              </td>
              <td className="cell-date">{formatDate(message.created_at)}</td>
              <td className="cell-actions">
                <button
                  className="btn-icon btn-view"
                  onClick={() => onViewMessage(message)}
                  title="View message"
                  aria-label={`View message from ${message.name}`}
                >
                  <Eye size={16} />
                </button>
                <button
                  className="btn-icon btn-delete"
                  onClick={() => onDeleteMessage(message.id)}
                  disabled={isDeleting}
                  title="Delete message"
                  aria-label={`Delete message from ${message.name}`}
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
