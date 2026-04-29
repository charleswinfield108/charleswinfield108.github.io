import { useState } from 'react'
import { ExternalLink as ExternalLinkIcon } from 'lucide-react'
import type { ExternalLink } from '../../types'
import './LinkCard.css'

interface LinkCardProps {
  link: ExternalLink
  index: number
  visible: boolean
}

export function LinkCard({ link, index, visible }: LinkCardProps) {
  const [imgError, setImgError] = useState(false)

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`link-card reveal reveal-delay-${(index % 4) + 1} ${visible ? 'visible' : ''}`}
      aria-label={`Visit ${link.title} (opens in new tab)`}
    >
      <div className="link-card__img-wrap">
        {!imgError ? (
          <img
            src={link.image}
            alt={link.imageAlt}
            className="link-card__img"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="link-card__img-fallback">
            <span className="link-card__img-initial">{link.title.charAt(0)}</span>
          </div>
        )}
      </div>

      <div className="link-card__body">
        <div className="link-card__title-row">
          <h3 className="link-card__title">{link.title}</h3>
          <ExternalLinkIcon size={14} className="link-card__icon" />
        </div>
        <p className="link-card__desc">{link.description}</p>
      </div>
    </a>
  )
}
