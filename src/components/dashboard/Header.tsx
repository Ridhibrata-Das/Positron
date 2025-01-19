'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

interface HeaderProps {
  userName: string
}

export default function Header({ userName }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  return (
    <header className="h-16 bg-white border-b border-gray-200">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Left Section - Welcome Message */}
        <div className="flex items-center space-x-4">
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl font-semibold text-gray-800"
          >
            Welcome, {userName}!
          </motion.h1>
        </div>

        {/* Right Section - User Actions */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-64 px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
            />
            <i className="fas fa-search absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="w-10 h-10 rounded-lg bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-colors duration-200"
              aria-label="View notifications"
            >
              <div className="relative">
                <i className="fas fa-bell text-gray-600" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
              </div>
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 py-2"
              >
                <div className="px-4 py-2 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-900">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {/* Sample Notifications */}
                  <div className="px-4 py-3 hover:bg-gray-50 transition-colors duration-200">
                    <p className="text-sm text-gray-600">Soil moisture level is low in Zone A</p>
                    <span className="text-xs text-gray-400">2 minutes ago</span>
                  </div>
                  <div className="px-4 py-3 hover:bg-gray-50 transition-colors duration-200">
                    <p className="text-sm text-gray-600">Weekly irrigation report is ready</p>
                    <span className="text-xs text-gray-400">1 hour ago</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* User Profile */}
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center space-x-3 hover:bg-gray-50 rounded-lg p-2 transition-colors duration-200"
              aria-label="User menu"
            >
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <i className="fas fa-user text-primary" />
              </div>
              <span className="text-sm font-medium text-gray-700">{userName}</span>
              <i className={`fas fa-chevron-down text-xs text-gray-400 transition-transform duration-200 ${
                showProfile ? 'rotate-180' : ''
              }`} />
            </button>

            {/* Profile Dropdown */}
            {showProfile && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2"
              >
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                  <i className="fas fa-user-circle mr-2" />
                  View Profile
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                  <i className="fas fa-cog mr-2" />
                  Settings
                </button>
                <hr className="my-1 border-gray-100" />
                <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors duration-200">
                  <i className="fas fa-sign-out-alt mr-2" />
                  Logout
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
} 