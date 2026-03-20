import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface SelectDropdownProps {
  label: string
  options: string[]
  value: string
  onChange: (value: string) => void
}

export const SelectDropdown: React.FC<SelectDropdownProps> = ({
  label,
  options,
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-slate-300 mb-2">{label}</label>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full glass px-4 py-3 flex items-center justify-between text-white text-left transition-all duration-200 hover:border-blue-400/50"
      >
        <span>{value}</span>
        <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 glass rounded-lg overflow-hidden z-50 shadow-xl">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                onChange(option)
                setIsOpen(false)
              }}
              className={`w-full px-4 py-3 text-left transition-all duration-200 hover:bg-blue-500/20 ${
                value === option ? 'bg-blue-500/30 text-blue-400 font-semibold' : 'text-slate-300'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
