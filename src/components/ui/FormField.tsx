interface InputFieldProps {
  id: string
  label: string
  type?: 'text' | 'email'
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  error?: string
}

export function InputField({ id, label, type = 'text', value, onChange, placeholder, error }: InputFieldProps) {
  return (
    <div className="form-field">
      <label htmlFor={id} className="form-field__label">{label}</label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`form-field__input${error ? ' form-field__input--error' : ''}`}
        autoComplete={type === 'email' ? 'email' : 'off'}
      />
      {error && <p className="form-field__error" role="alert">{error}</p>}
    </div>
  )
}

interface TextareaFieldProps {
  id: string
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
  error?: string
  rows?: number
}

export function TextareaField({ id, label, value, onChange, placeholder, error, rows = 6 }: TextareaFieldProps) {
  return (
    <div className="form-field">
      <label htmlFor={id} className="form-field__label">{label}</label>
      <textarea
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className={`form-field__textarea${error ? ' form-field__input--error' : ''}`}
      />
      {error && <p className="form-field__error" role="alert">{error}</p>}
    </div>
  )
}
