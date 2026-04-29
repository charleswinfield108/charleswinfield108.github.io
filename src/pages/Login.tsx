import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import LoginForm from '../components/ui/LoginForm'
import './Login.css'

export default function Login() {
  const navigate = useNavigate()

  // Check if user is already logged in
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()
      if (data.session) {
        navigate('/admin')
      }
    }
    checkSession()
  }, [navigate])

  function handleLoginSuccess() {
    navigate('/admin')
  }

  return (
    <main className="login-page">
      <div className="login-page__container">
        <div className="login-page__card">
          <div className="login-page__logo">
            <img
              src="/assets/logo/cw-logo.svg"
              alt="Charles Winfield logo"
            />
          </div>
          <div className="login-page__header">
            <h1>Admin Login</h1>
            <p>Enter your credentials to access the admin panel</p>
          </div>
          <LoginForm onSuccess={handleLoginSuccess} />
        </div>
      </div>
    </main>
  )
}
