import React from 'react'
import { motion } from 'framer-motion'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: ButtonVariant
  size?: ButtonSize
  disabled?: boolean
  className?: string
  loading?: boolean
  fullWidth?: boolean
  type?: 'button' | 'submit'
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  loading = false,
  fullWidth = false,
  type = 'button',
}) => {
  const variants = {
    primary:
      'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/30',
    secondary:
      'bg-slate-700 text-white hover:bg-slate-600 border border-slate-600',
    outline:
      'border border-blue-500/50 text-blue-400 hover:bg-blue-500/10',
    ghost: 'text-slate-400 hover:text-white hover:bg-white/5',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm font-medium',
    md: 'px-4 py-2.5 text-base font-semibold',
    lg: 'px-6 py-3.5 text-lg font-semibold',
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      className={`
        rounded-lg transition-all duration-200
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <span className="animate-spin">⏳</span>
          Processing...
        </span>
      ) : (
        children
      )}
    </motion.button>
  )
}
