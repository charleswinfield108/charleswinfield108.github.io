import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { supabase } from '../lib/supabaseClient'
import LoginForm from '../components/ui/LoginForm'
import './Login.css'

export default function Login() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()
      if (data.session) navigate('/admin')
    }
    checkSession()
  }, [navigate])

  return (
    <main className="login-page">
      <div className="login-page__container">
        <div className="login-page__card">
          <div className="login-page__logo">
            <img src="/assets/logo/cw-logo.svg" alt="Charles Winfield logo" />
          </div>
          <div className="login-page__header">
            <h1>{t('login.title')}</h1>
            <p>{t('login.subtitle')}</p>
          </div>
          <LoginForm onSuccess={() => navigate('/admin')} />
        </div>
      </div>
    </main>
  )
}
