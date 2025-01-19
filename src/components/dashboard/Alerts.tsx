'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface Alert {
  id: string
  title: string
  message: string
  type: 'critical' | 'warning' | 'info'
  timestamp: string
  zone?: string
  isRead: boolean
  actionType?: 'irrigation' | 'maintenance' | 'system'
  actionLabel?: string
}

const initialAlerts: Alert[] = [
  {
    id: '1',
    title: 'Low Soil Moisture',
    message: 'Zone A soil moisture has dropped below the critical threshold of 30%.',
    type: 'critical',
    timestamp: '2024-02-20T10:30:00',
    zone: 'Zone A',
    isRead: false,
    actionType: 'irrigation',
    actionLabel: 'Start Irrigation'
  },
  {
    id: '2',
    title: 'Sensor Maintenance Required',
    message: 'Temperature sensor in Zone B requires calibration.',
    type: 'warning',
    timestamp: '2024-02-20T09:45:00',
    zone: 'Zone B',
    isRead: false,
    actionType: 'maintenance',
    actionLabel: 'Schedule Maintenance'
  },
  {
    id: '3',
    title: 'Irrigation Completed',
    message: 'Scheduled irrigation in Zone C completed successfully.',
    type: 'info',
    timestamp: '2024-02-20T08:15:00',
    zone: 'Zone C',
    isRead: true
  },
  {
    id: '4',
    title: 'System Update Available',
    message: 'A new system update is available with improved features.',
    type: 'info',
    timestamp: '2024-02-20T07:30:00',
    isRead: false,
    actionType: 'system',
    actionLabel: 'Update Now'
  }
]

export default function Alerts() {
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts)
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'unread' | 'critical'>('all')

  const handleMarkAsRead = (alertId: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId 
        ? { ...alert, isRead: true }
        : alert
    ))
  }

  const handleAction = async (alert: Alert) => {
    // Here you would typically handle the specific action
    console.log(`Handling action for alert: ${alert.id}`)
  }

  const handleMarkAllAsRead = () => {
    setAlerts(alerts.map(alert => ({ ...alert, isRead: true })))
  }

  const filteredAlerts = alerts.filter(alert => {
    switch (selectedFilter) {
      case 'unread':
        return !alert.isRead
      case 'critical':
        return alert.type === 'critical'
      default:
        return true
    }
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Alerts & Notifications</h2>
          <p className="text-sm text-gray-500 mt-1">
            Stay updated with system alerts and notifications
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value as typeof selectedFilter)}
            className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-sm font-medium text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
            aria-label="Filter alerts"
          >
            <option value="all">All Alerts</option>
            <option value="unread">Unread</option>
            <option value="critical">Critical</option>
          </select>

          <button
            onClick={handleMarkAllAsRead}
            className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors duration-200"
          >
            Mark all as read
          </button>
        </div>
      </div>

      {/* Alerts Grid */}
      <div className="grid grid-cols-1 gap-4">
        {filteredAlerts.map((alert) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-white rounded-2xl p-6 shadow-sm border-l-4 ${
              alert.type === 'critical' ? 'border-red-500' :
              alert.type === 'warning' ? 'border-yellow-500' :
              'border-blue-500'
            } ${!alert.isRead ? 'bg-primary/5' : ''}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    alert.type === 'critical' ? 'bg-red-100 text-red-800' :
                    alert.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {alert.type.charAt(0).toUpperCase() + alert.type.slice(1)}
                  </span>
                  {alert.zone && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {alert.zone}
                    </span>
                  )}
                  {!alert.isRead && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      New
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mt-2">{alert.title}</h3>
                <p className="text-gray-600 mt-1">{alert.message}</p>

                <div className="flex items-center space-x-4 mt-4">
                  <span className="text-sm text-gray-500">
                    {new Date(alert.timestamp).toLocaleString()}
                  </span>
                  {!alert.isRead && (
                    <button
                      onClick={() => handleMarkAsRead(alert.id)}
                      className="text-sm text-primary hover:text-primary/80 transition-colors duration-200"
                    >
                      Mark as read
                    </button>
                  )}
                </div>
              </div>

              {alert.actionType && (
                <button
                  onClick={() => handleAction(alert)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    alert.type === 'critical' ? 'bg-red-600 text-white hover:bg-red-700' :
                    alert.type === 'warning' ? 'bg-yellow-600 text-white hover:bg-yellow-700' :
                    'bg-primary text-white hover:bg-primary/90'
                  }`}
                >
                  {alert.actionLabel}
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {filteredAlerts.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-check text-2xl text-gray-400"></i>
          </div>
          <h3 className="text-lg font-semibold text-gray-900">All Clear!</h3>
          <p className="text-gray-500 mt-1">No alerts match your current filter.</p>
        </motion.div>
      )}

      {/* Alert Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Critical Alerts</h3>
            <span className="text-2xl font-bold text-red-600">
              {alerts.filter(a => a.type === 'critical').length}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">Require immediate attention</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Warnings</h3>
            <span className="text-2xl font-bold text-yellow-600">
              {alerts.filter(a => a.type === 'warning').length}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">Need attention soon</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Unread</h3>
            <span className="text-2xl font-bold text-primary">
              {alerts.filter(a => !a.isRead).length}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">New notifications</p>
        </div>
      </motion.div>
    </div>
  )
} 