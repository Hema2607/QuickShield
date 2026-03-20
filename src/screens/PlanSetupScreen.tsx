import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Clock, TrendingUp } from 'lucide-react'
import { GlassCard } from '../components/GlassCard'
import { StatusBadge } from '../components/StatusBadge'
import { Button } from '../components/Button'
import { SelectDropdown } from '../components/SelectDropdown'
import { ChipGroup } from '../components/ChipGroup'
import { ZONES, WORKING_HOURS, RISK_LEVELS } from '../lib/mockData'
import { calculateRiskLevel, calculatePremium } from '../lib/utils'

interface PlanSetupScreenProps {
  riderName: string
  onPlanActivated: (plan: { zone: string; hours: string[]; premium: number }) => void
  onBack: () => void
}

export const PlanSetupScreen: React.FC<PlanSetupScreenProps> = ({
  riderName,
  onPlanActivated,
  onBack,
}) => {
  const [selectedZone, setSelectedZone] = useState(ZONES[0])
  const [selectedHours, setSelectedHours] = useState<string[]>([WORKING_HOURS[0]])
  const [isActivating, setIsActivating] = useState(false)

  const riskLevel = useMemo(() => calculateRiskLevel(selectedZone, selectedHours), [selectedZone, selectedHours])
  const premium = useMemo(() => calculatePremium(riskLevel), [riskLevel])

  const handleActivate = () => {
    setIsActivating(true)
    setTimeout(() => {
      onPlanActivated({
        zone: selectedZone,
        hours: selectedHours,
        premium,
      })
    }, 800)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
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
      className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 p-4 md:p-8"
    >
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.button
          onClick={onBack}
          className="mb-8 text-slate-400 hover:text-white transition-colors flex items-center gap-2"
        >
          ← Back
        </motion.button>

        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
          {/* Title */}
          <motion.div variants={itemVariants}>
            <h1 className="text-4xl font-bold text-white mb-2">Setup Your Plan</h1>
            <p className="text-slate-400">
              Customize your coverage based on your delivery zone and working hours, {riderName}
            </p>
          </motion.div>

          {/* Zone and Hours Selection */}
          <motion.div variants={itemVariants} className="glass-lg p-8 space-y-8">
            <SelectDropdown
              label="Select Work Zone"
              options={ZONES}
              value={selectedZone}
              onChange={setSelectedZone}
            />

            <ChipGroup
              label="Active Working Hours (Select All That Apply)"
              options={WORKING_HOURS}
              selected={selectedHours}
              onChange={setSelectedHours}
              multiSelect={true}
            />
          </motion.div>

          {/* Premium Display Cards */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GlassCard className="text-center">
              <MapPin className="w-6 h-6 text-teal-400 mx-auto mb-3" />
              <p className="text-slate-400 text-sm mb-2">Selected Zone</p>
              <p className="text-2xl font-bold text-white">{selectedZone.split(' ')[0]}</p>
            </GlassCard>

            <GlassCard className="text-center">
              <Clock className="w-6 h-6 text-purple-400 mx-auto mb-3" />
              <p className="text-slate-400 text-sm mb-2">Hours per Week</p>
              <p className="text-2xl font-bold text-white">{selectedHours.length * 4}h</p>
            </GlassCard>

            <GlassCard className="text-center">
              <TrendingUp className="w-6 h-6 text-orange-400 mx-auto mb-3" />
              <p className="text-slate-400 text-sm mb-2">Risk Level</p>
              <StatusBadge
                label={RISK_LEVELS[riskLevel].label}
                variant={
                  riskLevel === 'low'
                    ? 'success'
                    : riskLevel === 'medium'
                      ? 'warning'
                      : 'danger'
                }
              />
            </GlassCard>
          </motion.div>

          {/* Premium Display */}
          <motion.div
            variants={itemVariants}
            className="gradient-blur p-8 rounded-xl border border-blue-500/40"
          >
            <div className="text-center">
              <p className="text-slate-400 mb-2">Your Weekly Premium</p>
              <p className="text-5xl font-bold text-gradient mb-2">₹{premium}</p>
              <p className="text-slate-500 text-sm">
                Premium varies based on zone and hours selected
              </p>
            </div>
          </motion.div>

          {/* Info text */}
          <motion.div variants={itemVariants} className="space-y-3 text-sm">
            <div className="glass p-4 rounded-lg flex gap-3">
              <span className="text-blue-400">ℹ️</span>
              <p className="text-slate-400">
                <strong className="text-white">Instant Claims:</strong> File claims instantly when disruptions occur
              </p>
            </div>
            <div className="glass p-4 rounded-lg flex gap-3">
              <span className="text-purple-400">✓</span>
              <p className="text-slate-400">
                <strong className="text-white">AI-Powered Detection:</strong> Our AI monitors rain, AQI, and demand
              </p>
            </div>
            <div className="glass p-4 rounded-lg flex gap-3">
              <span className="text-teal-400">⚡</span>
              <p className="text-slate-400">
                <strong className="text-white">Instant Payouts:</strong> Get paid instantly to your account
              </p>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div variants={itemVariants} className="flex gap-4">
            <Button onClick={onBack} variant="outline" size="lg" fullWidth>
              Cancel
            </Button>
            <Button
              onClick={handleActivate}
              variant="primary"
              size="lg"
              fullWidth
              loading={isActivating}
            >
              Activate Weekly Plan
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}
