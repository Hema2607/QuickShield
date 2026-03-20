import React from 'react'

type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral'

interface StatusBadgeProps {
  label: string
  variant?: BadgeVariant
  size?: 'sm' | 'md'
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  label,
  variant = 'info',
  size = 'md',
}) => {
  const variants: Record<BadgeVariant, string> = {
    success: 'bg-green-500/20 text-green-400 border-green-500/30',
    warning: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    danger: 'bg-red-500/20 text-red-400 border-red-500/30',
    info: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    neutral: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
  }

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
  }

  return (
    <div
      className={`inline-flex items-center rounded-full border font-medium ${variants[variant]} ${sizeClasses[size]} transition-all duration-200`}
    >
      {label}
    </div>
  )
}
