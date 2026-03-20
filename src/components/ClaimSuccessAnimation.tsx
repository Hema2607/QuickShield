import React from 'react'
import { motion } from 'framer-motion'

interface ClaimSuccessAnimationProps {
  amount: number
  isVisible: boolean
}

export const ClaimSuccessAnimation: React.FC<ClaimSuccessAnimationProps> = ({
  amount,
  isVisible,
}) => {
  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 pointer-events-none flex items-center justify-center"
    >
      {/* Background overlay */}
      <motion.div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Success card */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.5, opacity: 0, y: -20 }}
        transition={{ type: 'spring', damping: 15, stiffness: 200 }}
        className="relative z-10 glass-lg p-8 max-w-sm text-center"
      >
        {/* Checkmark animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            delay: 0.2,
            type: 'spring',
            damping: 10,
            stiffness: 200,
          }}
          className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center"
        >
          <motion.div
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-green-400 text-3xl font-bold"
          >
            ✓
          </motion.div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold text-white mb-2"
        >
          Claim Approved!
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-slate-400 mb-4"
        >
          Your instant payout has been processed
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="text-4xl font-bold text-green-400 mb-2"
        >
          ₹{amount}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-xs text-slate-500"
        >
          Credited instantly to your account
        </motion.p>

        {/* Pulse ring */}
        <motion.div
          animate={{
            boxShadow: [
              '0 0 0 0 rgba(16, 185, 129, 0.4)',
              '0 0 0 20px rgba(16, 185, 129, 0)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-lg"
        />
      </motion.div>
    </motion.div>
  )
}
