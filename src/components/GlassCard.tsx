import React from 'react'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  variant?: 'default' | 'lg' | 'gradient'
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  onClick,
  variant = 'default',
}) => {
  const baseClasses = 'rounded-lg transition-all duration-300'
  const variantClasses = {
    default: 'glass p-6',
    lg: 'glass-lg p-8',
    gradient: 'gradient-blur p-8',
  }

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  )
}
