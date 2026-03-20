import React from 'react'
import { motion } from 'framer-motion'

interface ChipGroupProps {
  label: string
  options: string[]
  selected: string[]
  onChange: (selected: string[]) => void
  multiSelect?: boolean
}

export const ChipGroup: React.FC<ChipGroupProps> = ({
  label,
  options,
  selected,
  onChange,
  multiSelect = true,
}) => {
  const handleChipClick = (value: string) => {
    if (multiSelect) {
      if (selected.includes(value)) {
        onChange(selected.filter((s) => s !== value))
      } else {
        onChange([...selected, value])
      }
    } else {
      onChange(selected[0] === value ? [] : [value])
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-3">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = selected.includes(option)
          return (
            <motion.button
              key={option}
              onClick={() => handleChipClick(option)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 ${
                isSelected
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/20'
                  : 'glass text-slate-400 hover:text-slate-300'
              }`}
            >
              {option}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
