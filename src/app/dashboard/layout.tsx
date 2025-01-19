'use client'

import Sidebar from '@/components/dashboard/Sidebar'
import Header from '@/components/dashboard/Header'
import { motion } from 'framer-motion'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // TODO: Replace with actual user data from authentication
  const userName = "John Doe"

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="ml-[240px]">
        <Header userName={userName} />
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-8"
        >
          {children}
        </motion.main>
      </div>
    </div>
  )
} 