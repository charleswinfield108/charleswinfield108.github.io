import { useState, useRef } from 'react'
import { Send } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { supabase } from '../../lib/supabaseClient'
import { InputField, TextareaField } from './FormField'
import FeedbackBanner from './FeedbackBanner'
import './FormField.css'
import './FeedbackBanner.css'
import './ContactForm.css'

interface FormState {
  name: string
  email: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const INITIAL: FormState = { name: '', email: '', message: '' }

export default function ContactForm() {
  const { t } = useTranslation()
  const [form, setForm] = useState<FormState>(INITIAL)
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<SubmitStatus>('idle')

  const nameRef = useRef<HTMLDivElement>(null)
  const emailRef = useRef<HTMLDivElement>(null)
  const messageRef = useRef<HTMLDivElement>(null)

  function validate(): FormErrors {
    const errs: FormErrors = {}
    if (!form.name.trim()) errs.name = t('form.error_name')
    if (!form.email.trim()) {
      errs.email = t('form.error_email_required')
    } else if (!EMAIL_REGEX.test(form.email.trim())) {
      errs.email = t('form.error_email_format')
    }
    if (!form.message.trim()) errs.message = t('form.error_message')
    return errs
  }

  function handleChange(field: keyof FormState) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm(prev => ({ ...prev, [field]: e.target.value }))
      if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }))
      if (status === 'success') setStatus('idle')
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      if (errs.name) nameRef.current?.querySelector('input')?.focus()
      else if (errs.email) emailRef.current?.querySelector('input')?.focus()
      else if (errs.message) messageRef.current?.querySelector('textarea')?.focus()
      return
    }

    setStatus('loading')
    const payload = {
      name:    form.name.trim(),
      email:   form.email.trim().toLowerCase(),
      message: form.message.trim(),
    }

    const { error } = await supabase.from('messages').insert(payload)

    if (error) {
      setStatus('error')
    } else {
      setStatus('success')
      setForm(INITIAL)
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  const buttonLabel =
    status === 'loading' ? t('form.submitting') :
    status === 'error'   ? t('form.retry') :
    t('form.submit')

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      {status === 'success' && <FeedbackBanner type="success" message={t('form.success')} />}
      {status === 'error'   && <FeedbackBanner type="error"   message={t('form.error')}   />}

      <div ref={nameRef as React.RefObject<HTMLDivElement>}>
        <InputField
          id="name"
          label={t('form.name_label')}
          value={form.name}
          onChange={handleChange('name')}
          placeholder={t('form.name_placeholder')}
          error={errors.name}
        />
      </div>

      <div ref={emailRef as React.RefObject<HTMLDivElement>}>
        <InputField
          id="email"
          label={t('form.email_label')}
          type="email"
          value={form.email}
          onChange={handleChange('email')}
          placeholder={t('form.email_placeholder')}
          error={errors.email}
        />
      </div>

      <div ref={messageRef as React.RefObject<HTMLDivElement>}>
        <TextareaField
          id="message"
          label={t('form.message_label')}
          value={form.message}
          onChange={handleChange('message')}
          placeholder={t('form.message_placeholder')}
          error={errors.message}
          rows={6}
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary contact-form__submit"
        disabled={status === 'loading'}
      >
        {buttonLabel}
        {status !== 'loading' && <Send size={15} />}
      </button>
    </form>
  )
}
