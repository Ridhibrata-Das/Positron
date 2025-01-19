'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface SensorReading {
  id: string
  sensorId: string
  type: string
  value: number
  unit: string
  location: string
  timestamp: string
  status: 'normal' | 'warning' | 'critical'
}

const sampleReadings: SensorReading[] = [
  {
    id: '1',
    sensorId: 'SM001',
    type: 'Soil Moisture',
    value: 42.5,
    unit: '%',
    location: 'Zone A',
    timestamp: '2024-02-20T10:30:00',
    status: 'normal'
  },
  {
    id: '2',
    sensorId: 'TH001',
    type: 'Temperature',
    value: 28.3,
    unit: '°C',
    location: 'Zone B',
    timestamp: '2024-02-20T10:30:00',
    status: 'warning'
  },
  {
    id: '3',
    sensorId: 'HM001',
    type: 'Humidity',
    value: 65.8,
    unit: '%',
    location: 'Zone A',
    timestamp: '2024-02-20T10:30:00',
    status: 'normal'
  },
  {
    id: '4',
    sensorId: 'SM002',
    type: 'Soil Moisture',
    value: 35.2,
    unit: '%',
    location: 'Zone C',
    timestamp: '2024-02-20T10:30:00',
    status: 'critical'
  }
]

export default function SensorData() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('1h')
  const [selectedZone, setSelectedZone] = useState('all')
  const [selectedSensorType, setSelectedSensorType] = useState('all')
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = async (format: 'csv' | 'excel') => {
    setIsExporting(true)
    // Simulate export delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsExporting(false)
    // Here you would typically trigger the actual file download
  }

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Sensor Data</h2>
        
        <div className="flex flex-wrap items-center gap-3">
          {/* Time Range Selector */}
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-sm font-medium text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
            aria-label="Select time range"
          >
            <option value="1h">Last Hour</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>

          {/* Zone Filter */}
          <select
            value={selectedZone}
            onChange={(e) => setSelectedZone(e.target.value)}
            className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-sm font-medium text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
            aria-label="Filter by zone"
          >
            <option value="all">All Zones</option>
            <option value="zone-a">Zone A</option>
            <option value="zone-b">Zone B</option>
            <option value="zone-c">Zone C</option>
          </select>

          {/* Sensor Type Filter */}
          <select
            value={selectedSensorType}
            onChange={(e) => setSelectedSensorType(e.target.value)}
            className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-sm font-medium text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
            aria-label="Filter by sensor type"
          >
            <option value="all">All Sensors</option>
            <option value="moisture">Soil Moisture</option>
            <option value="temperature">Temperature</option>
            <option value="humidity">Humidity</option>
          </select>
        </div>
      </div>

      {/* Real-Time Data Feed */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-sm overflow-hidden"
      >
        <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between bg-gray-50">
          <h3 className="font-semibold text-gray-900">Real-Time Readings</h3>
          <div className="flex items-center space-x-2">
            <span className="flex items-center text-green-600 text-sm">
              <span className="w-2 h-2 bg-green-600 rounded-full mr-2 animate-pulse"></span>
              Live
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm font-medium text-gray-500">
                <th className="px-6 py-4">Sensor ID</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Value</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Last Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sampleReadings.map((reading) => (
                <tr key={reading.id} className="text-sm text-gray-600">
                  <td className="px-6 py-4 font-medium">{reading.sensorId}</td>
                  <td className="px-6 py-4">{reading.type}</td>
                  <td className="px-6 py-4">
                    {reading.value} {reading.unit}
                  </td>
                  <td className="px-6 py-4">{reading.location}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${reading.status === 'normal' ? 'bg-green-100 text-green-800' :
                        reading.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'}`}>
                      {reading.status.charAt(0).toUpperCase() + reading.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {new Date(reading.timestamp).toLocaleTimeString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Historical Data Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trend Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Trend Analysis</h3>
          <div className="h-64 flex items-center justify-center text-gray-500">
            {/* Placeholder for Chart */}
            <p>Historical Trend Chart Will Be Added Here</p>
          </div>
        </motion.div>

        {/* Statistical Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Statistical Overview</h3>
          <div className="h-64 flex items-center justify-center text-gray-500">
            {/* Placeholder for Stats */}
            <p>Statistical Analysis Will Be Added Here</p>
          </div>
        </motion.div>
      </div>

      {/* Export Options */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl p-6 shadow-sm"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Export Data</h3>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => handleExport('csv')}
              disabled={isExporting}
              className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isExporting ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="mr-2"
                  >
                    <i className="fas fa-circle-notch"></i>
                  </motion.div>
                  Exporting...
                </>
              ) : (
                <>
                  <i className="fas fa-file-csv mr-2"></i>
                  Export as CSV
                </>
              )}
            </button>
            <button
              onClick={() => handleExport('excel')}
              disabled={isExporting}
              className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              <i className="fas fa-file-excel mr-2"></i>
              Export as Excel
            </button>
          </div>
        </div>
        <p className="text-sm text-gray-500">
          Export your sensor data in your preferred format. The export will include all data within the selected time range and filters.
        </p>
      </motion.div>
    </div>
  )
} 