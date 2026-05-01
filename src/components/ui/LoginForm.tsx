import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { supabase } from '../../lib/supabaseClient'
import { InputField } from './FormField'
import FeedbackBanner from './FeedbackBanner'
import './FormField.css'
import './FeedbackBanner.css'
import './LoginForm.css'

interface LoginFormState { email: string; password: string }
interface LoginFormErrors { email?: string; password?: string }
type SubmitStatus = 'idle' | 'loading' | 'error'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const INITIAL: LoginFormState = { email: '', password: '' }

export default function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const { t } = useTranslation()
  const [form, setForm] = useState<LoginFormState>(INITIAL)
  const [errors, setErrors] = useState<LoginFormErrors>({})
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const [authError, setAuthError] = useState('')

  const emailRef = useRef<HTMLDivElement>(null)
  const passwordRef = useRef<HTMLDivElement>(null)

  function validate(): LoginFormErrors {
    const errs: LoginFormErrors = {}
    if (!form.email.trim()) {
      errs.email = t('login.error_email_required')
    } else if (!EMAIL_REGEX.test(form.email.trim())) {
      errs.email = t('login.error_email_format')
    }
    if (!form.password) errs.password = t('login.error_password_required')
    return errs
  }

  function handleChange(field: keyof LoginFormState) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm(prev => ({ ...prev, [field]: e.target.value }))
      if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }))
      if (authError) setAuthError('')
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      if (errs.email) emailRef.current?.querySelector('input')?.focus()
      else if (errs.password) passwordRef.current?.querySelector('input')?.focus()
      return
    }

    setStatus('loading')
    setAuthError('')

    const { data, error } = await supabase.auth.signInWithPassword({
      email: form.email.trim().toLowerCase(),
      password: form.password,
    })

    if (error) {
      setStatus('error')
      setAuthError(t('login.auth_error'))
    } else if (data.session) {
      setStatus('idle')
      setForm(INITIAL)
      onSuccess()
    } else {
      setStatus('error')
      setAuthError(t('login.auth_fail'))
    }
  }

  return (
    <form className="login-form" onSubmit={handleSubmit} noValidate>
      {authError && <FeedbackBanner type="error" message={authError} />}

      <div ref={emailRef as React.RefObject<HTMLDivElement>}>
        <InputField
          id="email"
          label={t('login.email_label')}
          type="email"
          value={form.email}
          onChange={handleChange('email')}
          placeholder={t('login.email_placeholder')}
          error={errors.email}
        />
      </div>

      <div ref={passwordRef as React.RefObject<HTMLDivElement>}>
        <InputField
          id="password"
          label={t('login.password_label')}
          type="password"
          value={form.password}
          onChange={handleChange('password')}
          placeholder={t('login.password_placeholder')}
          error={errors.password}
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary login-form__submit"
        disabled={status === 'loading'}
      >
        {status === 'loading' ? t('login.submitting') : t('login.submit')}
      </button>
    </form>
  )
}
