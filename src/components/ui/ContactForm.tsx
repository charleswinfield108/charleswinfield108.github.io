import { useState, useRef } from 'react'
import { Send } from 'lucide-react'
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
  const [form, setForm] = useState<FormState>(INITIAL)
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<SubmitStatus>('idle')

  const nameRef = useRef<HTMLDivElement>(null)
  const emailRef = useRef<HTMLDivElement>(null)
  const messageRef = useRef<HTMLDivElement>(null)

  function validate(): FormErrors {
    const errs: FormErrors = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!form.email.trim()) {
      errs.email = 'Email is required'
    } else if (!EMAIL_REGEX.test(form.email.trim())) {
      errs.email = 'Please enter a valid email address'
    }
    if (!form.message.trim()) errs.message = 'Message is required'
    return errs
  }

  function handleChange(field: keyof FormState) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm(prev => ({ ...prev, [field]: e.target.value }))
      if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: undefined }))
      }
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
    status === 'loading' ? 'Sending…' :
    status === 'error'   ? 'Try Again' :
    'Send Message'

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      {status === 'success' && (
        <FeedbackBanner
          type="success"
          message="Message sent! I'll get back to you soon."
        />
      )}
      {status === 'error' && (
        <FeedbackBanner
          type="error"
          message="Something went wrong. Please try again."
        />
      )}

      <div ref={nameRef as React.RefObject<HTMLDivElement>}>
        <InputField
          id="name"
          label="Name"
          value={form.name}
          onChange={handleChange('name')}
          placeholder="Your name"
          error={errors.name}
        />
      </div>

      <div ref={emailRef as React.RefObject<HTMLDivElement>}>
        <InputField
          id="email"
          label="Email"
          type="email"
          value={form.email}
          onChange={handleChange('email')}
          placeholder="your@email.com"
          error={errors.email}
        />
      </div>

      <div ref={messageRef as React.RefObject<HTMLDivElement>}>
        <TextareaField
          id="message"
          label="Message"
          value={form.message}
          onChange={handleChange('message')}
          placeholder="Tell me about your project…"
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
