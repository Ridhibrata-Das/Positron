'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

type MetricColor = 'blue' | 'orange' | 'teal' | 'indigo'

interface Metric {
  title: string
  value: string
  change: number
  changeText: string
  icon: string
  color: MetricColor
}

const colorVariants: Record<MetricColor, string> = {
  blue: 'bg-blue-100 text-blue-600',
  orange: 'bg-orange-100 text-orange-600',
  teal: 'bg-teal-100 text-teal-600',
  indigo: 'bg-indigo-100 text-indigo-600'
}

const metrics: Metric[] = [
  {
    title: 'Soil Moisture',
    value: '45%',
    change: 2.5,
    changeText: 'from last week',
    icon: 'fa-tint',
    color: 'blue'
  },
  {
    title: 'Temperature',
    value: '24°C',
    change: -1.5,
    changeText: 'from yesterday',
    icon: 'fa-thermometer-half',
    color: 'orange'
  },
  {
    title: 'Humidity',
    value: '65%',
    change: 0.8,
    changeText: 'from last week',
    icon: 'fa-cloud',
    color: 'teal'
  },
  {
    title: 'Water Usage',
    value: '120L',
    change: -3.2,
    changeText: 'from average',
    icon: 'fa-water',
    color: 'indigo'
  }
]

export default function Overview() {
  const [timeRange, setTimeRange] = useState('week')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">System Overview</h2>
        <div className="flex items-center space-x-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-sm font-medium text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
            aria-label="Select time range"
          >
            <option value="day">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <MetricCard key={metric.title} metric={metric} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Soil Moisture Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Soil Moisture Trend</h3>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-sm font-medium">
                Live
              </button>
            </div>
          </div>
          <div className="h-64 flex items-center justify-center text-gray-500">
            {/* Placeholder for Chart */}
            <p>Chart Component Will Be Added Here</p>
          </div>
        </motion.div>

        {/* Temperature & Humidity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Temperature & Humidity</h3>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-100">
                Temperature
              </button>
              <button className="px-3 py-1 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-100">
                Humidity
              </button>
            </div>
          </div>
          <div className="h-64 flex items-center justify-center text-gray-500">
            {/* Placeholder for Chart */}
            <p>Chart Component Will Be Added Here</p>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl p-6 shadow-sm"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors duration-200 group">
            <i className="fas fa-play text-primary mb-2"></i>
            <p className="text-sm font-medium text-gray-700 group-hover:text-primary">Start Irrigation</p>
          </button>
          <button className="p-4 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors duration-200 group">
            <i className="fas fa-clock text-primary mb-2"></i>
            <p className="text-sm font-medium text-gray-700 group-hover:text-primary">Schedule</p>
          </button>
          <button className="p-4 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors duration-200 group">
            <i className="fas fa-file-alt text-primary mb-2"></i>
            <p className="text-sm font-medium text-gray-700 group-hover:text-primary">View Reports</p>
          </button>
          <button className="p-4 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors duration-200 group">
            <i className="fas fa-cog text-primary mb-2"></i>
            <p className="text-sm font-medium text-gray-700 group-hover:text-primary">Settings</p>
          </button>
        </div>
      </motion.div>
    </div>
  )
}

interface MetricCardProps {
  metric: Metric
}

function MetricCard({ metric }: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-sm"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{metric.title}</p>
          <h3 className="text-2xl font-semibold text-gray-900 mt-2">{metric.value}</h3>
          <div className="flex items-center mt-2">
            <span className={`text-sm font-medium ${metric.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {metric.change >= 0 ? '+' : ''}{metric.change}%
            </span>
            <span className="text-sm text-gray-500 ml-1">{metric.changeText}</span>
          </div>
        </div>
        <div className={`w-12 h-12 rounded-xl ${colorVariants[metric.color]} flex items-center justify-center`}>
          <i className={`fas ${metric.icon} text-xl`}></i>
        </div>
      </div>
    </motion.div>
  )
} 