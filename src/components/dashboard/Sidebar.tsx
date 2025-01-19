'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

interface NavItem {
  name: string
  href: string
  icon: string
}

const navItems: NavItem[] = [
  { name: 'Overview', href: '/dashboard', icon: 'fa-home' },
  { name: 'Sensors', href: '/dashboard/sensors', icon: 'fa-microchip' },
  { name: 'Controls', href: '/dashboard/controls', icon: 'fa-sliders-h' },
  { name: 'Reports', href: '/dashboard/reports', icon: 'fa-chart-line' },
  { name: 'Alerts', href: '/dashboard/alerts', icon: 'fa-bell' },
  { name: 'AI Recommendations', href: '/dashboard/recommendations', icon: 'fa-robot' },
  { name: 'Support', href: '/dashboard/support', icon: 'fa-question-circle' },
  { name: 'Settings', href: '/dashboard/settings', icon: 'fa-cog' }
]

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <motion.aside
      initial={{ width: '240px' }}
      animate={{ width: isCollapsed ? '80px' : '240px' }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed left-0 top-0 h-screen bg-white border-r border-gray-200 shadow-sm z-50"
    >
      {/* Logo and Toggle Section */}
      <div className="relative h-16 flex items-center px-4 border-b border-gray-200">
        <motion.div
          initial={false}
          animate={{ opacity: isCollapsed ? 0 : 1, width: isCollapsed ? 0 : 'auto' }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          <Image
            src="/Images/image-removebg-preview.png"
            alt="Positron Logo"
            width={120}
            height={40}
            className="object-contain"
          />
        </motion.div>
        
        <button
          onClick={toggleSidebar}
          className="absolute right-4 w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors duration-200"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <motion.i
            animate={{ rotate: isCollapsed ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="fas fa-chevron-left text-gray-500"
          />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="py-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center px-4 py-2.5 text-sm font-medium transition-colors duration-200
                    ${isActive 
                      ? 'text-primary bg-primary/5' 
                      : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                    }`}
                >
                  <i className={`fas ${item.icon} text-lg ${isCollapsed ? 'w-8' : 'w-8'}`} />
                  <motion.span
                    initial={false}
                    animate={{ 
                      opacity: isCollapsed ? 0 : 1,
                      width: isCollapsed ? 0 : 'auto',
                      marginLeft: isCollapsed ? 0 : '0.75rem',
                      display: isCollapsed ? 'none' : 'inline'
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.name}
                  </motion.span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="absolute bottom-4 left-0 right-0 px-4">
        <button
          className={`w-full flex items-center px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200`}
        >
          <i className="fas fa-sign-out-alt text-lg w-8" />
          <motion.span
            initial={false}
            animate={{ 
              opacity: isCollapsed ? 0 : 1,
              width: isCollapsed ? 0 : 'auto',
              marginLeft: isCollapsed ? 0 : '0.75rem',
              display: isCollapsed ? 'none' : 'inline'
            }}
            transition={{ duration: 0.2 }}
          >
            Logout
          </motion.span>
        </button>
      </div>
    </motion.aside>
  )
} 