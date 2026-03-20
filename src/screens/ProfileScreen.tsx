import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Zap,
  TrendingUp,
  Award,
  Settings,
  Edit2,
  Check,
  X,
} from 'lucide-react'
import { GlassCard } from '../components/GlassCard'
import { StatusBadge } from '../components/StatusBadge'
import { PremiumCard } from '../components/PremiumCard'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { calculateTrustScore, formatDate } from '../lib/utils'
import { ZONES, SAMPLE_CLAIMS, DISRUPTION_TYPES } from '../lib/mockData'

interface ProfileScreenProps {
  riderName: string
  riderPhone: string
  zone: string
  premium: number
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  riderName,
  riderPhone,
  zone,
  premium,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: riderName,
    email: 'rider@quickshield.com',
    phone: riderPhone,
  })
  const [tempFormData, setTempFormData] = useState(formData)

  const trustScore = calculateTrustScore()
  const totalClaims = SAMPLE_CLAIMS.length
  const totalEarnings = SAMPLE_CLAIMS.reduce((sum, claim) => sum + claim.amount, 0)

  const handleEditClick = () => {
    setTempFormData(formData)
    setIsEditing(true)
  }

  const handleSave = () => {
    setFormData(tempFormData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setTempFormData({
      ...tempFormData,
      [field]: value,
    })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
      className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 p-4 md:p-8 pb-20"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white">Your Profile</h1>
              <p className="text-slate-400 mt-2">Manage your account and preferences</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleEditClick}
              disabled={isEditing}
              className="px-4 py-2 rounded-lg bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 transition-all border border-blue-400/50 disabled:opacity-50 flex items-center gap-2"
            >
              <Edit2 className="w-4 h-4" />
              Edit Profile
            </motion.button>
          </motion.div>

          {/* Profile Information */}
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4">Personal Information</h2>
            <GlassCard>
              <div className="space-y-6">
                {/* Profile Avatar Section */}
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-4xl">
                    {formData.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Rider ID</p>
                    <p className="text-white font-bold text-lg">RIDER-2024-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-blue-500/20">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Full Name
                    </label>
                    {isEditing ? (
                      <Input
                        value={tempFormData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Enter your name"
                        className="w-full"
                      />
                    ) : (
                      <p className="text-white font-semibold">{formData.name}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Phone Number
                    </label>
                    {isEditing ? (
                      <Input
                        value={tempFormData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="Enter your phone"
                        className="w-full"
                      />
                    ) : (
                      <p className="text-white font-semibold">{formData.phone}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email
                    </label>
                    {isEditing ? (
                      <Input
                        value={tempFormData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="Enter your email"
                        className="w-full"
                      />
                    ) : (
                      <p className="text-white font-semibold">{formData.email}</p>
                    )}
                  </div>

                  {/* Zone */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Delivery Zone
                    </label>
                    <p className="text-white font-semibold">{zone}</p>
                  </div>
                </div>

                {/* Edit Actions */}
                {isEditing && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-3 pt-4 border-t border-blue-500/20"
                  >
                    <Button
                      onClick={handleSave}
                      className="flex-1 bg-green-500/20 text-green-300 hover:bg-green-500/30 border border-green-500/30"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button
                      onClick={handleCancel}
                      className="flex-1 bg-slate-500/20 text-slate-300 hover:bg-slate-500/30 border border-slate-500/30"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </motion.div>
                )}
              </div>
            </GlassCard>
          </motion.div>

          {/* Stats Section */}
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4">Your Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <PremiumCard
                title="Trust Score"
                value={`${trustScore}/100`}
                icon={<Award className="w-5 h-5" />}
                highlight={trustScore > 80}
                subtext="Account reliability"
              />
              <PremiumCard
                title="Total Claims"
                value={totalClaims.toString()}
                icon={<Shield className="w-5 h-5" />}
                subtext="Claims approved"
              />
              <PremiumCard
                title="Total Earnings"
                value={`₹${totalEarnings}`}
                icon={<TrendingUp className="w-5 h-5" />}
                subtext="From insurance payouts"
              />
              <PremiumCard
                title="Weekly Premium"
                value={`₹${premium}`}
                icon={<Zap className="w-5 h-5" />}
                subtext="Active coverage"
              />
            </div>
          </motion.div>

          {/* Claims Summary */}
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4">Recent Claims</h2>
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
                    <div className="text-2xl">
                      {
                        DISRUPTION_TYPES[claim.type as keyof typeof DISRUPTION_TYPES]
                          .icon
                      }
                    </div>
                    <div>
                      <p className="font-semibold text-white">
                        {
                          DISRUPTION_TYPES[claim.type as keyof typeof DISRUPTION_TYPES]
                            .name
                        }
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
          </motion.div>

          {/* Account Preferences */}
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4">Preferences</h2>
            <GlassCard>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border-b border-blue-500/20">
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-blue-300" />
                    <div>
                      <p className="font-semibold text-white">Notifications</p>
                      <p className="text-sm text-slate-400">Enabled</p>
                    </div>
                  </div>
                  <StatusBadge label="On" variant="success" />
                </div>

                <div className="flex items-center justify-between p-4 border-b border-blue-500/20">
                  <div className="flex items-center gap-3">
                    <Settings className="w-5 h-5 text-purple-300" />
                    <div>
                      <p className="font-semibold text-white">Auto-Renewal</p>
                      <p className="text-sm text-slate-400">Weekly plan auto-renews</p>
                    </div>
                  </div>
                  <StatusBadge label="Active" variant="success" />
                </div>

                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-pink-300" />
                    <div>
                      <p className="font-semibold text-white">Account Created</p>
                      <p className="text-sm text-slate-400">
                        {new Date(2024, 0, 15).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

// Icon component for Bell since we're not importing it above
const Bell = ({ className }: { className: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
    />
  </svg>
)
