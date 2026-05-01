import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import { supabase } from '../lib/supabaseClient'
import { MessagesTable } from '../components/ui/MessagesTable'
import { ViewMessageModal } from '../components/ui/ViewMessageModal'
import { DeleteConfirmDialog } from '../components/ui/DeleteConfirmDialog'
import type { Message } from '../types'
import './Admin.css'

export default function Admin() {
  const navigate = useNavigate()
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  // Check session on mount
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()
      if (!data.session) {
        navigate('/login')
        return
      }
      fetchMessages()
    }
    checkSession()
  }, [navigate])

  // Fetch all messages
  const fetchMessages = async () => {
    try {
      setLoading(true)
      setError(null)
      const { data, error: fetchError } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false })

      if (fetchError) {
        throw new Error(fetchError.message)
      }
      setMessages(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load messages')
    } finally {
      setLoading(false)
    }
  }

  // Delete a message
  const handleDeleteMessage = async (id: string) => {
    try {
      setIsDeleting(true)
      const { error: deleteError } = await supabase
        .from('messages')
        .delete()
        .eq('id', id)

      if (deleteError) {
        throw new Error(deleteError.message)
      }

      setMessages(prev => prev.filter(msg => msg.id !== id))
      setDeleteConfirmId(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete message')
    } finally {
      setIsDeleting(false)
    }
  }

  // Logout
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
      navigate('/')
    } catch (err) {
      console.error('Logout error:', err)
    }
  }

  return (
    <main className="admin-page">
      <div className="container">
        {/* Header */}
        <div className="admin-header">
          <div>
            <span className="section-label">Admin Panel</span>
            <h1 className="admin-title">Back Office</h1>
          </div>
          <button
            onClick={handleLogout}
            className="btn btn-primary admin-logout-btn"
            title="Sign out and return to home"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>

        {/* Messages Table */}
        <div className="admin-content">
          <MessagesTable
            messages={messages}
            isLoading={loading}
            error={error}
            onViewMessage={setSelectedMessage}
            onDeleteMessage={(id) => setDeleteConfirmId(id)}
            isDeleting={isDeleting}
          />
        </div>
      </div>

      {/* View Message Modal */}
      <ViewMessageModal
        message={selectedMessage}
        onClose={() => setSelectedMessage(null)}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        isOpen={deleteConfirmId !== null}
        onConfirm={() => deleteConfirmId && handleDeleteMessage(deleteConfirmId)}
        onCancel={() => setDeleteConfirmId(null)}
        isLoading={isDeleting}
      />
    </main>
  )
}
