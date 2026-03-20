import React from 'react'

interface InputProps {
  placeholder?: string
  type?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  icon?: React.ReactNode
}

export const Input: React.FC<InputProps> = ({
  placeholder,
  type = 'text',
  value,
  onChange,
  className = '',
  icon,
}) => {
  return (
    <div className="relative">
      {icon && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
          {icon}
        </div>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`
          w-full glass px-4 py-3 text-white placeholder-slate-500
          transition-all duration-200 focus:outline-none focus:border-blue-400/50
          ${icon ? 'pl-12' : ''}
          ${className}
        `}
      />
    </div>
  )
}
