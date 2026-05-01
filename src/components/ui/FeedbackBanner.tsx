import { CheckCircle, XCircle } from 'lucide-react'

interface FeedbackBannerProps {
  type: 'success' | 'error'
  message: string
}

export default function FeedbackBanner({ type, message }: FeedbackBannerProps) {
  return (
    <div className={`feedback-banner feedback-banner--${type}`} role="alert">
      {type === 'success'
        ? <CheckCircle size={20} className="feedback-banner__icon" />
        : <XCircle size={20} className="feedback-banner__icon" />
      }
      <span>{message}</span>
    </div>
  )
}
