import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, Mail, Phone } from 'lucide-react'
import { Button } from '../components/Button'
import { Input } from '../components/Input'

interface LoginScreenProps {
  onLogin: (userData: { phone: string; name: string }) => void
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = () => {
    if (phone.trim() && name.trim()) {
      setIsLoading(true)
      setTimeout(() => {
        onLogin({ phone, name })
      }, 800)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background blobs */}
      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, 100, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-10 left-10 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, -50, 0],
          y: [0, -100, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-10 right-10 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo and branding */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 mb-4 shadow-lg shadow-blue-500/40"
          >
            <Shield className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold text-white mb-2">QuickShield</h1>
          <p className="text-slate-400">Protect Your Weekly Earnings</p>
        </motion.div>

        {/* Form card */}
        <motion.div variants={itemVariants} className="glass-lg p-8 space-y-6 mb-8">
          <div>
            <p className="text-slate-300 text-center mb-6 text-sm">
              AI-powered insurance for delivery partners
            </p>
          </div>

          <div className="space-y-4">
            <Input
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              icon={<Phone className="w-4 h-4" />}
            />
            <Input
              placeholder="Enter your phone number"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              icon={<Mail className="w-4 h-4" />}
            />
          </div>

          <Button
            onClick={handleLogin}
            variant="primary"
            size="lg"
            fullWidth
            loading={isLoading}
            disabled={!phone.trim() || !name.trim()}
          >
            Get Started
          </Button>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-3 gap-4 text-center text-xs"
        >
          <div className="glass p-3 rounded-lg">
            <p className="text-slate-400">Instant Claims</p>
            <p className="text-green-400 font-semibold mt-1">2min</p>
          </div>
          <div className="glass p-3 rounded-lg">
            <p className="text-slate-400">Coverage</p>
            <p className="text-blue-400 font-semibold mt-1">24/7</p>
          </div>
          <div className="glass p-3 rounded-lg">
            <p className="text-slate-400">Payouts</p>
            <p className="text-purple-400 font-semibold mt-1">Instant</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
