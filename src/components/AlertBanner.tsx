import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'

interface AlertBannerProps {
  isVisible: boolean
  title: string
  description?: string
}

export const AlertBanner: React.FC<AlertBannerProps> = ({
  isVisible,
  title,
  description,
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          className="fixed top-0 left-0 right-0 z-50 gradient-blur mx-4 mt-4 rounded-lg border border-yellow-500/50"
        >
          <div className="flex items-start gap-4 p-4">
            <motion.div
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5 }}
              className="mt-0.5"
            >
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
            </motion.div>
            <div className="flex-1">
              <h3 className="font-semibold text-white mb-1">{title}</h3>
              {description && <p className="text-sm text-slate-400">{description}</p>}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
