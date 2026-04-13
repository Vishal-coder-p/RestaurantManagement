import React from 'react'
import './Card.css'

interface CardProps {
  title: string
  subtitle?: string
  badge?: string
  badgeClassName?: string
  children?: React.ReactNode
  footer?: React.ReactNode
  className?: string
}

const Card: React.FC<CardProps> = ({ title, subtitle, badge, badgeClassName, children, footer, className }) => {
  return (
    <div className={`card ${className ?? ''}`}>
      <div className='card-header'>
        <div>
          <h3>{title}</h3>
          {subtitle && <p className='card-subtitle'>{subtitle}</p>}
        </div>
        {badge && <span className={`card-badge ${badgeClassName ?? ''}`}>{badge}</span>}
      </div>
      <div className='card-body'>{children}</div>
      {footer && <div className='card-footer'>{footer}</div>}
    </div>
  )
}

export default Card
