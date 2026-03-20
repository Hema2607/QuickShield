import React from 'react'
import { motion } from 'framer-motion'

interface SimulationButtonProps {
  label: string
  icon: React.ReactNode
  description: string
  onClick: () => void
  disabled?: boolean
}

export const SimulationButton: React.FC<SimulationButtonProps> = ({
  label,
  icon,
  description,
  onClick,
  disabled = false,
}) => {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      className={`w-full glass-lg p-6 text-left transition-all duration-300 group ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-blue-400/40'
      }`}
    >
      <div className="flex items-center gap-4">
        <div className="text-3xl p-3 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
          {icon}
        </div>
        <div className="flex-1 text-left">
          <h3 className="font-semibold text-white text-base">{label}</h3>
          <p className="text-xs text-slate-400 mt-0.5">{description}</p>
        </div>
        <div className="text-xl group-hover:translate-x-1 transition-transform">→</div>
      </div>
    </motion.button>
  )
}
