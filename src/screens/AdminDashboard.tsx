import React from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, TrendingUp, Users, DollarSign, BarChart3, Lock } from 'lucide-react'
import { GlassCard } from '../components/GlassCard'
import { StatusBadge } from '../components/StatusBadge'
import { Button } from '../components/Button'
import { ADMIN_STATS } from '../lib/mockData'
import { formatCurrency } from '../lib/utils'

interface AdminDashboardProps {
  onBack: () => void
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBack }) => {
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
      <div className="max-w-7xl mx-auto">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
          {/* Header */}
          <motion.div variants={itemVariants} className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white flex items-center gap-3 mb-2">
                <Lock className="w-8 h-8 text-purple-400" />
                Admin Dashboard
              </h1>
              <p className="text-slate-400">Real-time insights and monitoring</p>
            </div>
            <Button onClick={onBack} variant="outline">
              Exit Admin
            </Button>
          </motion.div>

          {/* Key Metrics */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <GlassCard className="text-center">
              <TrendingUp className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <p className="text-slate-400 text-sm mb-1">Claims Today</p>
              <p className="text-3xl font-bold text-white">{ADMIN_STATS.totalClaimsToday}</p>
              <p className="text-xs text-slate-500 mt-2">↑ 12% from yesterday</p>
            </GlassCard>

            <GlassCard className="text-center">
              <DollarSign className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <p className="text-slate-400 text-sm mb-1">Total Payout</p>
              <p className="text-3xl font-bold text-white">{formatCurrency(ADMIN_STATS.totalPayoutToday)}</p>
              <p className="text-xs text-slate-500 mt-2">₹{Math.round(ADMIN_STATS.totalPayoutToday * 0.8)} pending</p>
            </GlassCard>

            <GlassCard className="text-center">
              <Users className="w-8 h-8 text-teal-400 mx-auto mb-3" />
              <p className="text-slate-400 text-sm mb-1">Active Riders</p>
              <p className="text-3xl font-bold text-white">{ADMIN_STATS.activeRiders.toLocaleString()}</p>
              <p className="text-xs text-slate-500 mt-2">Covered today</p>
            </GlassCard>

            <GlassCard className="text-center">
              <BarChart3 className="w-8 h-8 text-orange-400 mx-auto mb-3" />
              <p className="text-slate-400 text-sm mb-1">Avg Payout</p>
              <p className="text-3xl font-bold text-white">{formatCurrency(ADMIN_STATS.averagePayout)}</p>
              <p className="text-xs text-slate-500 mt-2">Per claim</p>
            </GlassCard>
          </motion.div>

          {/* Risk Zones and Alerts */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* High Risk Zones */}
            <GlassCard variant="lg">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-400" />
                High Risk Zones
              </h2>
              <div className="space-y-3">
                {ADMIN_STATS.highRiskZones.map((zone, index) => (
                  <motion.div
                    key={zone}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20"
                  >
                    <div>
                      <p className="font-semibold text-white">{zone}</p>
                      <p className="text-xs text-slate-500 mt-0.5">Heavy rain detected</p>
                    </div>
                    <StatusBadge label="Alert" variant="warning" size="sm" />
                  </motion.div>
                ))}
              </div>
            </GlassCard>

            {/* Fraud Alerts */}
            <GlassCard variant="lg">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Lock className="w-5 h-5 text-red-400" />
                Security Alerts
              </h2>
              <div className="space-y-3">
                {[
                  { id: 'FRAUD001', type: 'Suspicious Pattern', severity: 'danger' },
                  { id: 'FRAUD002', type: 'Multiple Claims (5min)', severity: 'warning' },
                ].map((alert, index) => (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      alert.severity === 'danger'
                        ? 'bg-red-500/10 border border-red-500/20'
                        : 'bg-yellow-500/10 border border-yellow-500/20'
                    }`}
                  >
                    <div>
                      <p className="font-semibold text-white">{alert.type}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{alert.id}</p>
                    </div>
                    <StatusBadge
                      label={alert.severity === 'danger' ? 'Critical' : 'Review'}
                      variant={alert.severity === 'danger' ? 'danger' : 'warning'}
                      size="sm"
                    />
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* Claims Status */}
          <motion.div variants={itemVariants} className="glass-lg p-8">
            <h2 className="text-xl font-bold text-white mb-6">Claims Pipeline</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Approved', value: ADMIN_STATS.totalClaimsToday - ADMIN_STATS.pendingClaims, color: 'green' },
                { label: 'Pending', value: ADMIN_STATS.pendingClaims, color: 'yellow' },
                { label: 'Rejected', value: 2, color: 'red' },
              ].map((status, index) => (
                <motion.div
                  key={status.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`text-center p-4 rounded-lg border-2 ${
                    status.color === 'green'
                      ? 'border-green-500/30 bg-green-500/10'
                      : status.color === 'yellow'
                        ? 'border-yellow-500/30 bg-yellow-500/10'
                        : 'border-red-500/30 bg-red-500/10'
                  }`}
                >
                  <p className="text-slate-400 text-sm mb-2">{status.label}</p>
                  <p
                    className={`text-4xl font-bold ${
                      status.color === 'green'
                        ? 'text-green-400'
                        : status.color === 'yellow'
                          ? 'text-yellow-400'
                          : 'text-red-400'
                    }`}
                  >
                    {status.value}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* System Status */}
          <motion.div variants={itemVariants} className="glass-lg p-8">
            <h2 className="text-xl font-bold text-white mb-6">System Status</h2>
            <div className="space-y-4">
              {[
                { service: 'AI Detection Engine', status: 'operational', latency: '45ms' },
                { service: 'Payment Gateway', status: 'operational', latency: '120ms' },
                { service: 'Database', status: 'operational', latency: '8ms' },
                { service: 'Fraud Detection', status: 'operational', latency: '65ms' },
              ].map((service, index) => (
                <motion.div
                  key={service.service}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between p-4 rounded-lg bg-slate-700/30 border border-slate-600/50"
                >
                  <div>
                    <p className="font-semibold text-white">{service.service}</p>
                    <p className="text-xs text-slate-500 mt-1">Latency: {service.latency}</p>
                  </div>
                  <StatusBadge label={service.status} variant="success" size="sm" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}
