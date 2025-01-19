'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface Recommendation {
  id: string
  title: string
  description: string
  type: 'water_saving' | 'schedule_optimization' | 'maintenance' | 'weather_alert'
  impact: 'high' | 'medium' | 'low'
  timeToImplement: string
  potentialSavings?: string
  weatherData?: {
    condition: string
    temperature: number
    precipitation: number
    humidity: number
  }
  isImplemented: boolean
}

const initialRecommendations: Recommendation[] = [
  {
    id: '1',
    title: 'Reduce Watering Duration',
    description: 'Based on current soil moisture levels and forecasted rain, reduce watering duration by 15 minutes in Zone A.',
    type: 'water_saving',
    impact: 'high',
    timeToImplement: '5 minutes',
    potentialSavings: '20% water reduction',
    weatherData: {
      condition: 'Rain Expected',
      temperature: 22,
      precipitation: 80,
      humidity: 75
    },
    isImplemented: false
  },
  {
    id: '2',
    title: 'Optimize Watering Schedule',
    description: 'Shift irrigation schedule to early morning (4 AM - 6 AM) to minimize evaporation losses.',
    type: 'schedule_optimization',
    impact: 'medium',
    timeToImplement: '10 minutes',
    potentialSavings: '15% efficiency increase',
    isImplemented: false
  },
  {
    id: '3',
    title: 'Sensor Calibration Required',
    description: 'Humidity sensor in Zone B showing irregular patterns. Calibration recommended for accurate readings.',
    type: 'maintenance',
    impact: 'medium',
    timeToImplement: '30 minutes',
    isImplemented: false
  },
  {
    id: '4',
    title: 'Heat Wave Alert',
    description: 'Upcoming heat wave detected. Consider increasing water allocation for heat-sensitive crops.',
    type: 'weather_alert',
    impact: 'high',
    timeToImplement: '15 minutes',
    weatherData: {
      condition: 'Heat Wave',
      temperature: 35,
      precipitation: 0,
      humidity: 45
    },
    isImplemented: false
  }
]

export default function AIRecommendations() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>(initialRecommendations)
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'high_impact' | 'not_implemented'>('all')

  const handleImplement = (id: string) => {
    setRecommendations(recommendations.map(rec =>
      rec.id === id ? { ...rec, isImplemented: true } : rec
    ))
  }

  const filteredRecommendations = recommendations.filter(rec => {
    switch (selectedFilter) {
      case 'high_impact':
        return rec.impact === 'high'
      case 'not_implemented':
        return !rec.isImplemented
      default:
        return true
    }
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">AI Recommendations</h2>
          <p className="text-sm text-gray-500 mt-1">
            Smart suggestions to optimize your irrigation system
          </p>
        </div>

        <select
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value as typeof selectedFilter)}
          className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-sm font-medium text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
          aria-label="Filter recommendations"
        >
          <option value="all">All Recommendations</option>
          <option value="high_impact">High Impact</option>
          <option value="not_implemented">Not Implemented</option>
        </select>
      </div>

      {/* Recommendations Grid */}
      <div className="grid grid-cols-1 gap-6">
        {filteredRecommendations.map((rec) => (
          <motion.div
            key={rec.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    rec.type === 'water_saving' ? 'bg-blue-100 text-blue-800' :
                    rec.type === 'schedule_optimization' ? 'bg-purple-100 text-purple-800' :
                    rec.type === 'maintenance' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {rec.type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    rec.impact === 'high' ? 'bg-red-100 text-red-800' :
                    rec.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {rec.impact.charAt(0).toUpperCase() + rec.impact.slice(1)} Impact
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mt-2">{rec.title}</h3>
                <p className="text-gray-600 mt-1">{rec.description}</p>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="font-medium">Time to implement:</span>
                    <span className="ml-2">{rec.timeToImplement}</span>
                  </div>
                  {rec.potentialSavings && (
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="font-medium">Potential savings:</span>
                      <span className="ml-2">{rec.potentialSavings}</span>
                    </div>
                  )}
                </div>

                {rec.weatherData && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-semibold text-gray-900">Weather Insights</h4>
                    <div className="mt-2 grid grid-cols-2 gap-4">
                      <div className="text-sm">
                        <span className="text-gray-500">Condition:</span>
                        <span className="ml-2 text-gray-900">{rec.weatherData.condition}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-500">Temperature:</span>
                        <span className="ml-2 text-gray-900">{rec.weatherData.temperature}°C</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-500">Precipitation:</span>
                        <span className="ml-2 text-gray-900">{rec.weatherData.precipitation}%</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-500">Humidity:</span>
                        <span className="ml-2 text-gray-900">{rec.weatherData.humidity}%</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => handleImplement(rec.id)}
                disabled={rec.isImplemented}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  rec.isImplemented
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-primary text-white hover:bg-primary/90'
                }`}
              >
                {rec.isImplemented ? 'Implemented' : 'Implement'}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredRecommendations.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-check text-2xl text-gray-400"></i>
          </div>
          <h3 className="text-lg font-semibold text-gray-900">No Recommendations</h3>
          <p className="text-gray-500 mt-1">No recommendations match your current filter.</p>
        </motion.div>
      )}

      {/* Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">High Impact</h3>
            <span className="text-2xl font-bold text-red-600">
              {recommendations.filter(r => r.impact === 'high').length}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">Critical optimizations</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Implemented</h3>
            <span className="text-2xl font-bold text-green-600">
              {recommendations.filter(r => r.isImplemented).length}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">Applied recommendations</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Pending</h3>
            <span className="text-2xl font-bold text-primary">
              {recommendations.filter(r => !r.isImplemented).length}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">Awaiting implementation</p>
        </div>
      </motion.div>
    </div>
  )
} 