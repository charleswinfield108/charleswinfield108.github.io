import { useState, useRef } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { InputField } from './FormField'
import FeedbackBanner from './FeedbackBanner'
import './FormField.css'
import './FeedbackBanner.css'
import './LoginForm.css'

interface LoginFormState {
  email: string
  password: string
}

interface LoginFormErrors {
  email?: string
  password?: string
}

type SubmitStatus = 'idle' | 'loading' | 'error'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const INITIAL: LoginFormState = { email: '', password: '' }

interface LoginFormProps {
  onSuccess: () => void
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const [form, setForm] = useState<LoginFormState>(INITIAL)
  const [errors, setErrors] = useState<LoginFormErrors>({})
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const [authError, setAuthError] = useState<string>('')

  const emailRef = useRef<HTMLDivElement>(null)
  const passwordRef = useRef<HTMLDivElement>(null)

  function validate(): LoginFormErrors {
    const errs: LoginFormErrors = {}
    if (!form.email.trim()) {
      errs.email = 'Email is required'
    } else if (!EMAIL_REGEX.test(form.email.trim())) {
      errs.email = 'Please enter a valid email address'
    }
    if (!form.password) errs.password = 'Password is required'
    return errs
  }

  function handleChange(field: keyof LoginFormState) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm(prev => ({ ...prev, [field]: e.target.value }))
      if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: undefined }))
      }
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
      setAuthError('Invalid login credentials')
    } else if (data.session) {
      setStatus('idle')
      setForm(INITIAL)
      onSuccess()
    } else {
      setStatus('error')
      setAuthError('Login failed. Please try again.')
    }
  }

  const buttonLabel =
    status === 'loading' ? 'Signing In…' : 'Sign In'

  return (
    <form className="login-form" onSubmit={handleSubmit} noValidate>
      {authError && (
        <FeedbackBanner
          type="error"
          message={authError}
        />
      )}

      <div ref={emailRef as React.RefObject<HTMLDivElement>}>
        <InputField
          id="email"
          label="Email Address"
          type="email"
          value={form.email}
          onChange={handleChange('email')}
          placeholder="admin@example.com"
          error={errors.email}
        />
      </div>

      <div ref={passwordRef as React.RefObject<HTMLDivElement>}>
        <InputField
          id="password"
          label="Password"
          type="password"
          value={form.password}
          onChange={handleChange('password')}
          placeholder="••••••••"
          error={errors.password}
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary login-form__submit"
        disabled={status === 'loading'}
      >
        {buttonLabel}
      </button>
    </form>
  )
}
