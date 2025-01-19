'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface Zone {
  id: string
  name: string
  status: 'idle' | 'running' | 'scheduled' | 'error'
  moisture: number
  lastWatered: string
  schedule: {
    enabled: boolean
    time: string
    duration: number
    days: string[]
  }
}

const initialZones: Zone[] = [
  {
    id: 'zone-1',
    name: 'Zone A - North Field',
    status: 'idle',
    moisture: 42,
    lastWatered: '2024-02-20T08:30:00',
    schedule: {
      enabled: true,
      time: '06:00',
      duration: 30,
      days: ['monday', 'wednesday', 'friday']
    }
  },
  {
    id: 'zone-2',
    name: 'Zone B - South Field',
    status: 'running',
    moisture: 38,
    lastWatered: '2024-02-20T10:15:00',
    schedule: {
      enabled: true,
      time: '07:00',
      duration: 25,
      days: ['tuesday', 'thursday', 'saturday']
    }
  },
  {
    id: 'zone-3',
    name: 'Zone C - Greenhouse',
    status: 'scheduled',
    moisture: 45,
    lastWatered: '2024-02-20T09:00:00',
    schedule: {
      enabled: true,
      time: '08:00',
      duration: 20,
      days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
    }
  }
]

export default function IrrigationControl() {
  const [zones, setZones] = useState<Zone[]>(initialZones)
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null)
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false)

  const handleStartIrrigation = (zoneId: string) => {
    setZones(zones.map(zone => 
      zone.id === zoneId 
        ? { ...zone, status: 'running' as const }
        : zone
    ))
  }

  const handleStopIrrigation = (zoneId: string) => {
    setZones(zones.map(zone => 
      zone.id === zoneId 
        ? { ...zone, status: 'idle' as const }
        : zone
    ))
  }

  const handleScheduleChange = (zoneId: string, schedule: Zone['schedule']) => {
    setZones(zones.map(zone => 
      zone.id === zoneId 
        ? { ...zone, schedule }
        : zone
    ))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Irrigation Control</h2>
        <button
          onClick={() => setIsScheduleModalOpen(true)}
          className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors duration-200 flex items-center"
        >
          <i className="fas fa-calendar-plus mr-2"></i>
          Create Schedule
        </button>
      </div>

      {/* Zones Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {zones.map((zone) => (
          <motion.div
            key={zone.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-sm"
          >
            {/* Zone Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{zone.name}</h3>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-2
                  ${zone.status === 'running' ? 'bg-green-100 text-green-800' :
                    zone.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                    zone.status === 'error' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full mr-1.5
                    ${zone.status === 'running' ? 'bg-green-600' :
                      zone.status === 'scheduled' ? 'bg-blue-600' :
                      zone.status === 'error' ? 'bg-red-600' :
                      'bg-gray-600'
                    }`}
                  />
                  {zone.status.charAt(0).toUpperCase() + zone.status.slice(1)}
                </span>
              </div>
              <button
                onClick={() => setSelectedZone(zone)}
                className="text-gray-400 hover:text-primary transition-colors duration-200"
                aria-label="More options"
              >
                <i className="fas fa-ellipsis-v"></i>
              </button>
            </div>

            {/* Zone Info */}
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Soil Moisture</span>
                <span className="font-medium text-gray-900">{zone.moisture}%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Last Watered</span>
                <span className="font-medium text-gray-900">
                  {new Date(zone.lastWatered).toLocaleTimeString()}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Next Schedule</span>
                <span className="font-medium text-gray-900">
                  {zone.schedule.enabled ? zone.schedule.time : 'Not scheduled'}
                </span>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="mt-6 flex items-center space-x-3">
              {zone.status === 'running' ? (
                <button
                  onClick={() => handleStopIrrigation(zone.id)}
                  className="flex-1 px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors duration-200"
                >
                  <i className="fas fa-stop mr-2"></i>
                  Stop
                </button>
              ) : (
                <button
                  onClick={() => handleStartIrrigation(zone.id)}
                  className="flex-1 px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors duration-200"
                >
                  <i className="fas fa-play mr-2"></i>
                  Start
                </button>
              )}
              <button
                onClick={() => setSelectedZone(zone)}
                className="px-4 py-2 rounded-lg bg-gray-100 text-gray-600 text-sm font-medium hover:bg-gray-200 transition-colors duration-200"
                aria-label="Adjust settings"
              >
                <i className="fas fa-sliders-h"></i>
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Schedule Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl p-6 shadow-sm"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Weekly Schedule</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm font-medium text-gray-500">
                <th className="pb-4">Zone</th>
                <th className="pb-4">Schedule</th>
                <th className="pb-4">Duration</th>
                <th className="pb-4">Days</th>
                <th className="pb-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {zones.map((zone) => (
                <tr key={zone.id} className="text-sm">
                  <td className="py-4 font-medium text-gray-900">{zone.name}</td>
                  <td className="py-4 text-gray-600">{zone.schedule.time}</td>
                  <td className="py-4 text-gray-600">{zone.schedule.duration} min</td>
                  <td className="py-4 text-gray-600">
                    {zone.schedule.days.map(day => day.slice(0, 3)).join(', ')}
                  </td>
                  <td className="py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${zone.schedule.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
                    >
                      {zone.schedule.enabled ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <button className="p-6 rounded-2xl bg-primary/5 hover:bg-primary/10 transition-colors duration-200 group text-center">
          <i className="fas fa-tint text-primary text-2xl mb-3"></i>
          <p className="text-sm font-medium text-gray-900">Start All Zones</p>
          <p className="text-xs text-gray-500 mt-1">Begin irrigation in all zones</p>
        </button>
        <button className="p-6 rounded-2xl bg-primary/5 hover:bg-primary/10 transition-colors duration-200 group text-center">
          <i className="fas fa-clock text-primary text-2xl mb-3"></i>
          <p className="text-sm font-medium text-gray-900">Delay All Schedules</p>
          <p className="text-xs text-gray-500 mt-1">Postpone scheduled irrigation</p>
        </button>
        <button className="p-6 rounded-2xl bg-primary/5 hover:bg-primary/10 transition-colors duration-200 group text-center">
          <i className="fas fa-history text-primary text-2xl mb-3"></i>
          <p className="text-sm font-medium text-gray-900">View History</p>
          <p className="text-xs text-gray-500 mt-1">Check past irrigation cycles</p>
        </button>
      </motion.div>
    </div>
  )
} 