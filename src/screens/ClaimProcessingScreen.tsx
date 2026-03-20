import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, Zap } from 'lucide-react'
import { GlassCard } from '../components/GlassCard'
import { DISRUPTION_TYPES } from '../lib/mockData'

interface ClaimProcessingScreenProps {
  disruptionType: 'rain' | 'aqi' | 'demand'
  zone: string
}

export const ClaimProcessingScreen: React.FC<ClaimProcessingScreenProps> = ({ disruptionType, zone }) => {
  const [processingStep, setProcessingStep] = useState(0)
  const disruption = DISRUPTION_TYPES[disruptionType]

  useEffect(() => {
    const steps = [
      { delay: 0, label: 'Detecting disruption...' },
      { delay: 800, label: 'Validating claim...' },
      { delay: 1600, label: 'Processing payment...' },
    ]

    steps.forEach((step) => {
      const timer = setTimeout(() => {
        setProcessingStep((prev) => prev + 1)
      }, step.delay)

      return () => clearTimeout(timer)
    })
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
      <GlassCard className="max-w-md w-full" variant="lg">
        {/* Alert Banner */}
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-start gap-4 mb-8 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30"
        >
          <motion.div animate={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 0.8, repeat: Infinity }}>
            <AlertTriangle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
          </motion.div>
          <div>
            <h2 className="font-semibold text-white mb-1">Disruption Detected</h2>
            <p className="text-sm text-slate-300">{disruption.description} in {zone}</p>
          </div>
        </motion.div>

        {/* Disruption Info */}
        <div className="text-center mb-8">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="text-6xl mb-4"
          >
            {disruption.icon}
          </motion.div>
          <h3 className="text-2xl font-bold text-white mb-2">{disruption.name}</h3>
          <p className="text-slate-400">Your claim is being processed</p>
        </div>

        {/* Processing Steps */}
        <div className="space-y-3 mb-8">
          {[
            'Detecting disruption...',
            'Validating claim...',
            'Processing payment...',
          ].map((step, index) => (
            <motion.div
              key={index}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                processingStep > index
                  ? 'bg-green-500/20 border border-green-500/40'
                  : processingStep === index
                    ? 'bg-blue-500/20 border border-blue-500/40'
                    : 'bg-slate-700/20 border border-slate-600/40'
              }`}
            >
              <motion.div
                animate={processingStep >= index ? { scale: [1, 1.3, 1] } : {}}
                className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                  processingStep > index
                    ? 'bg-green-500 text-white'
                    : processingStep === index
                      ? 'bg-blue-500'
                      : 'bg-slate-600'
                }`}
              >
                {processingStep > index ? '✓' : processingStep === index ? '' : ''}
                {processingStep === index && (
                  <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}>
                    ⟳
                  </motion.span>
                )}
              </motion.div>
              <span className="text-sm font-medium text-slate-300">{step}</span>
            </motion.div>
          ))}
        </div>

        {/* Loading animation */}
        <motion.div className="flex justify-center gap-2 mb-6">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ height: [8, 24, 8] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="w-2 bg-gradient-to-t from-blue-600 to-purple-600 rounded-full"
            />
          ))}
        </motion.div>

        <p className="text-center text-slate-400 text-sm">
          Processing in progress... Please wait
        </p>
      </GlassCard>
    </motion.div>
  )
}
