import React from 'react'
import { motion } from 'framer-motion'
import { Cloud, Wind, TrendingDown, Shield, Zap, DollarSign } from 'lucide-react'
import { GlassCard } from '../components/GlassCard'
import { PremiumCard } from '../components/PremiumCard'
import { StatusBadge } from '../components/StatusBadge'
import { SimulationButton } from '../components/SimulationButton'
import { DISRUPTION_TYPES, SAMPLE_CLAIMS } from '../lib/mockData'
import { calculateTrustScore, formatDate } from '../lib/utils'

interface DashboardScreenProps {
  riderName: string
  zone: string
  premium: number
  onSimulateDisruption: (type: 'rain' | 'aqi' | 'demand') => void
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  riderName,
  zone,
  premium,
  onSimulateDisruption,
}) => {
  const trustScore = calculateTrustScore()

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
      className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 p-4 md:p-8 pt-20"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
          {/* Greeting Section */}
          <motion.div variants={itemVariants}>
            <h1 className="text-4xl font-bold text-white mb-1">Welcome back, {riderName}</h1>
            <div className="flex items-center gap-4 mt-3">
              <StatusBadge label="Coverage Active" variant="success" />
              <span className="text-slate-400 text-sm">Zone: {zone}</span>
            </div>
          </motion.div>

          {/* Key Metrics */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <PremiumCard
              title="Weekly Premium"
              value={`₹${premium}`}
              icon={<DollarSign className="w-5 h-5" />}
              subtext="Automatically renewed"
            />
            <PremiumCard
              title="Earnings Protected"
              value="₹50,000"
              icon={<Shield className="w-5 h-5" />}
              subtext="Per disruption event"
            />
            <PremiumCard
              title="Trust Score"
              value={`${trustScore}/100`}
              icon={<Zap className="w-5 h-5" />}
              highlight={trustScore > 80}
              subtext="Based on claims history"
            />
          </motion.div>

          {/* Disruption Simulation Panel */}
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4">Simulate Disruptions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <SimulationButton
                label={DISRUPTION_TYPES.rain.name}
                icon={DISRUPTION_TYPES.rain.icon}
                description={`Instant payout: ₹${DISRUPTION_TYPES.rain.payout}`}
                onClick={() => onSimulateDisruption('rain')}
              />
              <SimulationButton
                label={DISRUPTION_TYPES.aqi.name}
                icon={DISRUPTION_TYPES.aqi.icon}
                description={`Instant payout: ₹${DISRUPTION_TYPES.aqi.payout}`}
                onClick={() => onSimulateDisruption('aqi')}
              />
              <SimulationButton
                label={DISRUPTION_TYPES.demand.name}
                icon={DISRUPTION_TYPES.demand.icon}
                description={`Instant payout: ₹${DISRUPTION_TYPES.demand.payout}`}
                onClick={() => onSimulateDisruption('demand')}
              />
            </div>
          </motion.div>

          {/* Claims History */}
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4">Recent Claims</h2>
            {SAMPLE_CLAIMS.length > 0 ? (
              <div className="space-y-3">
                {SAMPLE_CLAIMS.map((claim, index) => (
                  <motion.div
                    key={claim.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass p-4 flex items-center justify-between hover:border-blue-400/50 transition-all"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="text-2xl">{DISRUPTION_TYPES[claim.type as keyof typeof DISRUPTION_TYPES].icon}</div>
                      <div>
                        <p className="font-semibold text-white">
                          {DISRUPTION_TYPES[claim.type as keyof typeof DISRUPTION_TYPES].name}
                        </p>
                        <p className="text-sm text-slate-500">
                          {formatDate(claim.date)} • {claim.zone}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-400">₹{claim.amount}</p>
                      <StatusBadge label="Approved" variant="success" size="sm" />
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <GlassCard className="text-center py-12">
                <p className="text-slate-400">No claims yet. Simulate a disruption to test the system.</p>
              </GlassCard>
            )}
          </motion.div>

          {/* Info Section */}
          <motion.div variants={itemVariants} className="glass p-6 rounded-lg border border-blue-500/20">
            <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
              <span>💡</span> How QuickShield Works
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-400">
              <div>
                <p className="font-semibold text-white mb-1">1. Monitor</p>
                <p>AI monitors weather, air quality, and demand in real-time</p>
              </div>
              <div>
                <p className="font-semibold text-white mb-1">2. Detect</p>
                <p>Disruptions are detected automatically in your delivery zone</p>
              </div>
              <div>
                <p className="font-semibold text-white mb-1">3. Pay</p>
                <p>Instant payouts credited to your account within minutes</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}
