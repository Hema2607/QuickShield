import React from 'react'
import { motion } from 'framer-motion'
import { Clock, CreditCard, ArrowRight } from 'lucide-react'
import { GlassCard } from '../components/GlassCard'
import { Button } from '../components/Button'
import { DISRUPTION_TYPES } from '../lib/mockData'
import { formatTime } from '../lib/utils'

interface PayoutResultScreenProps {
  disruptionType: 'rain' | 'aqi' | 'demand'
  amount: number
  transactionId: string
  zone: string
  onClose: () => void
}

export const PayoutResultScreen: React.FC<PayoutResultScreenProps> = ({
  disruptionType,
  amount,
  transactionId,
  zone,
  onClose,
}) => {
  const disruption = DISRUPTION_TYPES[disruptionType]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 },
    },
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 p-4 md:p-8 flex items-center justify-center"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md"
      >
        {/* Success Card */}
        <motion.div variants={itemVariants} className="gradient-blur p-8 rounded-xl mb-6 text-center">
          {/* Checkmark Animation */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: 'spring',
              damping: 10,
              stiffness: 200,
            }}
            className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center"
          >
            <motion.span
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-green-400 text-5xl font-bold"
            >
              ✓
            </motion.span>
          </motion.div>

          <motion.h2 variants={itemVariants} className="text-3xl font-bold text-white mb-2">
            Claim Approved!
          </motion.h2>

          <motion.p variants={itemVariants} className="text-slate-400 mb-6">
            Your instant payout has been processed
          </motion.p>

          {/* Amount Display */}
          <motion.div
            variants={itemVariants}
            className="mb-8 p-6 rounded-lg bg-green-500/10 border border-green-500/30"
          >
            <p className="text-slate-400 text-sm mb-2">Amount Credited</p>
            <p className="text-5xl font-bold text-green-400">₹{amount}</p>
          </motion.div>

          {/* Disruption Type */}
          <motion.div variants={itemVariants} className="text-center mb-6">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl mb-3"
            >
              {disruption.icon}
            </motion.div>
            <p className="text-white font-semibold">{disruption.name}</p>
            <p className="text-slate-400 text-sm mt-1">Zone: {zone}</p>
          </motion.div>
        </motion.div>

        {/* Transaction Details */}
        <motion.div variants={itemVariants} className="glass-lg p-6 space-y-4 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              Transaction ID
            </span>
            <span className="font-mono text-sm text-white">{transactionId}</span>
          </div>

          <div className="h-px bg-slate-700/50" />

          <div className="flex items-center justify-between">
            <span className="text-slate-400 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Timestamp
            </span>
            <span className="text-white">{formatTime(new Date())}</span>
          </div>

          <div className="h-px bg-slate-700/50" />

          <div className="flex items-center justify-between">
            <span className="text-slate-400">Status</span>
            <motion.span
              animate={{ opacity: [0.6, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-green-400 font-semibold"
            >
              Completed
            </motion.span>
          </div>
        </motion.div>

        {/* Info Cards */}
        <motion.div variants={itemVariants} className="space-y-3 mb-6">
          <GlassCard className="text-sm">
            <p className="text-slate-400">
              <strong className="text-white">Next Steps:</strong> The amount will appear in your account within
              2-3 minutes
            </p>
          </GlassCard>
          <GlassCard className="text-sm">
            <p className="text-slate-400">
              <strong className="text-white">Tip:</strong> You can file multiple claims if disruptions occur
              multiple times
            </p>
          </GlassCard>
        </motion.div>

        {/* Action Buttons */}
        <motion.div variants={itemVariants} className="space-y-3">
          <Button onClick={onClose} variant="primary" size="lg" fullWidth className="flex items-center justify-center gap-2">
            Back to Dashboard <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>

        {/* Celebration animation */}
        <motion.div className="fixed inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: window.innerWidth / 2,
                y: window.innerHeight / 2,
                opacity: 1,
              }}
              animate={{
                x: window.innerWidth / 2 + (Math.random() - 0.5) * 400,
                y: window.innerHeight / 2 - Math.random() * 400,
                opacity: 0,
              }}
              transition={{
                duration: 2,
                delay: i * 0.1,
              }}
              className="text-2xl"
            >
              ✨
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
