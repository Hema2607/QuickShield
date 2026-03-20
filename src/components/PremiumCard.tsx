import React from 'react'
import { GlassCard } from './GlassCard'

interface PremiumCardProps {
  title: string
  value: string | number
  subtext?: string
  icon?: React.ReactNode
  highlight?: boolean
}

export const PremiumCard: React.FC<PremiumCardProps> = ({
  title,
  value,
  subtext,
  icon,
  highlight = false,
}) => {
  return (
    <GlassCard className={highlight ? 'shadow-glow border-blue-500/40' : ''}>
      <div className="space-y-2">
        <div className="flex items-start justify-between">
          <p className="text-slate-400 text-sm font-medium uppercase tracking-wide">{title}</p>
          {icon && <div className="text-accent-teal">{icon}</div>}
        </div>
        <p className="text-3xl font-bold text-white">{value}</p>
        {subtext && <p className="text-xs text-slate-500">{subtext}</p>}
      </div>
    </GlassCard>
  )
}
