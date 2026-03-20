import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, LogOut, User, Home, BarChart3 } from 'lucide-react'
import { Button } from './Button'

interface NavbarProps {
  riderName: string
  currentPage: 'dashboard' | 'profile' | 'admin'
  onNavigate: (page: 'dashboard' | 'profile' | 'admin') => void
  onLogout: () => void
}

export const Navbar: React.FC<NavbarProps> = ({
  riderName,
  currentPage,
  onNavigate,
  onLogout,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'admin', label: 'Admin', icon: BarChart3 },
  ] as const

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-slate-900 via-slate-800 to-blue-900 border-b border-blue-500/20 sticky top-0 z-50 backdrop-blur-xl"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
              QS
            </div>
            <span className="text-white font-bold text-xl hidden sm:block">QuickShield</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = currentPage === item.id
              return (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    onNavigate(item.id)
                    setIsOpen(false)
                  }}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                    isActive
                      ? 'bg-blue-500/30 text-blue-300 border border-blue-400/50'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </motion.button>
              )
            })}
          </div>

          {/* User Info & Logout */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {riderName.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col text-sm">
                <p className="text-white font-semibold">{riderName}</p>
                <p className="text-slate-500 text-xs">Active Rider</p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onLogout}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-all border border-red-500/30"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleMenu}
              className="md:hidden text-white"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden border-t border-blue-500/20 pb-4 space-y-2"
          >
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = currentPage === item.id
              return (
                <motion.button
                  key={item.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    onNavigate(item.id)
                    setIsOpen(false)
                  }}
                  className={`w-full px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                    isActive
                      ? 'bg-blue-500/30 text-blue-300 border border-blue-400/50'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </motion.button>
              )
            })}

            <div className="border-t border-blue-500/20 pt-2 mt-2">
              <div className="flex items-center gap-3 px-4 py-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                  {riderName.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col text-sm flex-1">
                  <p className="text-white font-semibold">{riderName}</p>
                  <p className="text-slate-500 text-xs">Active Rider</p>
                </div>
              </div>

              <button
                onClick={onLogout}
                className="w-full mt-2 px-4 py-2 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-all border border-red-500/30 flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}
