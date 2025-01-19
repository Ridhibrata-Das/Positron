'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface WaterUsageData {
  date: string
  usage: number
  savings: number
  efficiency: number
}

interface PerformanceMetric {
  name: string
  value: number
  change: number
  unit: string
  trend: 'up' | 'down' | 'neutral'
}

const waterUsageData: WaterUsageData[] = [
  { date: '2024-02-14', usage: 250, savings: 50, efficiency: 85 },
  { date: '2024-02-15', usage: 200, savings: 75, efficiency: 90 },
  { date: '2024-02-16', usage: 180, savings: 90, efficiency: 92 },
  { date: '2024-02-17', usage: 220, savings: 60, efficiency: 88 },
  { date: '2024-02-18', usage: 190, savings: 85, efficiency: 91 },
  { date: '2024-02-19', usage: 210, savings: 70, efficiency: 89 },
  { date: '2024-02-20', usage: 195, savings: 80, efficiency: 90 }
]

const performanceMetrics: PerformanceMetric[] = [
  {
    name: 'Water Usage',
    value: 195,
    change: -12.5,
    unit: 'liters',
    trend: 'down'
  },
  {
    name: 'System Efficiency',
    value: 90,
    change: 5,
    unit: '%',
    trend: 'up'
  },
  {
    name: 'Water Savings',
    value: 80,
    change: 15,
    unit: 'liters',
    trend: 'up'
  },
  {
    name: 'Energy Usage',
    value: 45,
    change: -8,
    unit: 'kWh',
    trend: 'down'
  }
]

export default function Reports() {
  const [timeRange, setTimeRange] = useState<'daily' | 'weekly' | 'monthly'>('daily')
  const [selectedMetric, setSelectedMetric] = useState<'usage' | 'savings' | 'efficiency'>('usage')

  const getMetricColor = (trend: 'up' | 'down' | 'neutral', isPositive: boolean) => {
    if (trend === 'neutral') return 'text-gray-500'
    return trend === 'up' === isPositive ? 'text-green-600' : 'text-red-600'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Reports & Analytics</h2>
          <p className="text-sm text-gray-500 mt-1">
            Monitor your system's performance and water usage
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as typeof timeRange)}
            className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-sm font-medium text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
            aria-label="Select time range"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>

          <button
            className="px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors duration-200"
            aria-label="Download report"
          >
            <i className="fas fa-download mr-2"></i>
            Download Report
          </button>
        </div>
      </div>

      {/* Performance Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {performanceMetrics.map((metric) => (
          <div key={metric.name} className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-500">{metric.name}</h3>
              <span className={`flex items-center ${getMetricColor(metric.trend, metric.name.includes('Efficiency') || metric.name.includes('Savings'))}`}>
                {metric.trend === 'up' ? (
                  <i className="fas fa-arrow-up mr-1"></i>
                ) : metric.trend === 'down' ? (
                  <i className="fas fa-arrow-down mr-1"></i>
                ) : (
                  <i className="fas fa-minus mr-1"></i>
                )}
                {Math.abs(metric.change)}%
              </span>
            </div>
            <p className="mt-2 flex items-baseline">
              <span className="text-2xl font-semibold text-gray-900">
                {metric.value}
              </span>
              <span className="ml-1 text-sm text-gray-500">{metric.unit}</span>
            </p>
          </div>
        ))}
      </motion.div>

      {/* Chart Controls */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="space-x-4">
            <button
              onClick={() => setSelectedMetric('usage')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                selectedMetric === 'usage'
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Water Usage
            </button>
            <button
              onClick={() => setSelectedMetric('savings')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                selectedMetric === 'savings'
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Water Savings
            </button>
            <button
              onClick={() => setSelectedMetric('efficiency')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                selectedMetric === 'efficiency'
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              System Efficiency
            </button>
          </div>
        </div>

        {/* Chart Placeholder */}
        <div className="h-80 bg-gray-50 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Chart visualization will be implemented with a charting library</p>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Detailed Data</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Water Usage (L)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Water Savings (L)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Efficiency (%)
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {waterUsageData.map((data) => (
                <tr key={data.date}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(data.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {data.usage}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {data.savings}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {data.efficiency}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Export Options */}
      <div className="flex justify-end space-x-4">
        <button
          className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200"
          aria-label="Export as CSV"
        >
          <i className="fas fa-file-csv mr-2"></i>
          Export CSV
        </button>
        <button
          className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200"
          aria-label="Export as Excel"
        >
          <i className="fas fa-file-excel mr-2"></i>
          Export Excel
        </button>
        <button
          className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200"
          aria-label="Export as PDF"
        >
          <i className="fas fa-file-pdf mr-2"></i>
          Export PDF
        </button>
      </div>
    </div>
  )
} 