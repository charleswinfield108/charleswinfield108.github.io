import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import './Admin.css'

export default function Admin() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [messages, setMessages] = useState<any[]>([])
  const [error, setError] = useState<string>('')

  // Check session and load messages
  useEffect(() => {
    const checkAndLoad = async () => {
      // Check if user is authenticated
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        navigate('/login')
        return
      }

      // Load messages from Supabase
      try {
        const { data, error: fetchError } = await supabase
          .from('messages')
          .select('*')
          .order('created_at', { ascending: false })

        if (fetchError) {
          setError('Failed to load messages')
        } else {
          setMessages(data || [])
        }
      } catch (err) {
        setError('An error occurred while loading messages')
      } finally {
        setIsLoading(false)
      }
    }

    checkAndLoad()
  }, [navigate])

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/login')
  }

  if (isLoading) {
    return (
      <main className="admin-page">
        <div className="admin-page__container">
          <p>Loading...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="admin-page">
      <div className="admin-page__container">
        <div className="admin-page__header">
          <h1>Admin Back Office</h1>
          <button onClick={handleLogout} className="btn btn-outline">
            Sign Out
          </button>
        </div>

        {error && (
          <div className="admin-page__error">
            {error}
          </div>
        )}

        {messages.length === 0 ? (
          <div className="admin-page__empty">
            <p>No messages yet</p>
          </div>
        ) : (
          <div className="admin-page__messages">
            {messages.map((msg) => (
              <div key={msg.id} className="admin-page__message">
                <div className="admin-page__message-header">
                  <h3>{msg.name}</h3>
                  <span className="admin-page__message-email">{msg.email}</span>
                </div>
                <p className="admin-page__message-body">{msg.message}</p>
                <span className="admin-page__message-date">
                  {new Date(msg.created_at).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
