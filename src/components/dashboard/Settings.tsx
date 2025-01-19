'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface NotificationSetting {
  id: string
  type: string
  email: boolean
  push: boolean
  sms: boolean
}

interface SystemPreference {
  id: string
  name: string
  value: string | number | boolean
  type: 'text' | 'number' | 'toggle' | 'select'
  options?: string[]
  unit?: string
}

const initialNotificationSettings: NotificationSetting[] = [
  {
    id: '1',
    type: 'Critical Alerts',
    email: true,
    push: true,
    sms: true
  },
  {
    id: '2',
    type: 'System Updates',
    email: true,
    push: true,
    sms: false
  },
  {
    id: '3',
    type: 'Weather Alerts',
    email: true,
    push: true,
    sms: false
  },
  {
    id: '4',
    type: 'Maintenance Reminders',
    email: true,
    push: false,
    sms: false
  }
]

const initialSystemPreferences: SystemPreference[] = [
  {
    id: '1',
    name: 'Default Irrigation Duration',
    value: 30,
    type: 'number',
    unit: 'minutes'
  },
  {
    id: '2',
    name: 'Moisture Threshold',
    value: 40,
    type: 'number',
    unit: '%'
  },
  {
    id: '3',
    name: 'Temperature Units',
    value: 'Celsius',
    type: 'select',
    options: ['Celsius', 'Fahrenheit']
  },
  {
    id: '4',
    name: 'Auto-adjust for Weather',
    value: true,
    type: 'toggle'
  },
  {
    id: '5',
    name: 'Night Mode Schedule',
    value: '22:00-06:00',
    type: 'text'
  }
]

export default function Settings() {
  const [activeTab, setActiveTab] = useState<'notifications' | 'system' | 'zones'>('notifications')
  const [notificationSettings, setNotificationSettings] = useState<NotificationSetting[]>(initialNotificationSettings)
  const [systemPreferences, setSystemPreferences] = useState<SystemPreference[]>(initialSystemPreferences)
  const [isLoading, setIsLoading] = useState(false)

  const handleNotificationToggle = (settingId: string, channel: 'email' | 'push' | 'sms') => {
    setNotificationSettings(settings =>
      settings.map(setting =>
        setting.id === settingId
          ? { ...setting, [channel]: !setting[channel] }
          : setting
      )
    )
  }

  const handlePreferenceChange = (prefId: string, value: string | number | boolean) => {
    setSystemPreferences(prefs =>
      prefs.map(pref =>
        pref.id === prefId
          ? { ...pref, value }
          : pref
      )
    )
  }

  const handleSave = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsLoading(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Settings & Configuration</h2>
        <p className="text-sm text-gray-500 mt-1">
          Manage your system preferences and notification settings
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {(['notifications', 'system', 'zones'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="mt-8">
        {activeTab === 'notifications' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
              <div className="space-y-4">
                {notificationSettings.map((setting) => (
                  <div key={setting.id} className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0">
                    <span className="font-medium text-gray-900">{setting.type}</span>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => handleNotificationToggle(setting.id, 'email')}
                        className={`p-2 rounded-lg transition-colors duration-200 ${
                          setting.email ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-400'
                        }`}
                        aria-label={`Toggle email notifications for ${setting.type}`}
                      >
                        <i className="fas fa-envelope text-lg"></i>
                      </button>
                      <button
                        onClick={() => handleNotificationToggle(setting.id, 'push')}
                        className={`p-2 rounded-lg transition-colors duration-200 ${
                          setting.push ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-400'
                        }`}
                        aria-label={`Toggle push notifications for ${setting.type}`}
                      >
                        <i className="fas fa-bell text-lg"></i>
                      </button>
                      <button
                        onClick={() => handleNotificationToggle(setting.id, 'sms')}
                        className={`p-2 rounded-lg transition-colors duration-200 ${
                          setting.sms ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-400'
                        }`}
                        aria-label={`Toggle SMS notifications for ${setting.type}`}
                      >
                        <i className="fas fa-mobile-alt text-lg"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'system' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">System Preferences</h3>
              <div className="space-y-6">
                {systemPreferences.map((pref) => (
                  <div key={pref.id} className="flex items-center justify-between">
                    <label htmlFor={pref.id} className="font-medium text-gray-900">
                      {pref.name}
                    </label>
                    <div className="w-1/3">
                      {pref.type === 'number' && (
                        <div className="flex items-center">
                          <input
                            type="number"
                            id={pref.id}
                            value={pref.value as number}
                            onChange={(e) => handlePreferenceChange(pref.id, parseFloat(e.target.value))}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                          />
                          {pref.unit && (
                            <span className="ml-2 text-gray-500">{pref.unit}</span>
                          )}
                        </div>
                      )}
                      {pref.type === 'text' && (
                        <input
                          type="text"
                          id={pref.id}
                          value={pref.value as string}
                          onChange={(e) => handlePreferenceChange(pref.id, e.target.value)}
                          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        />
                      )}
                      {pref.type === 'select' && (
                        <select
                          id={pref.id}
                          value={pref.value as string}
                          onChange={(e) => handlePreferenceChange(pref.id, e.target.value)}
                          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        >
                          {pref.options?.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      )}
                      {pref.type === 'toggle' && (
                        <button
                          onClick={() => handlePreferenceChange(pref.id, !(pref.value as boolean))}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                            pref.value ? 'bg-primary' : 'bg-gray-200'
                          }`}
                          role="switch"
                          aria-checked={pref.value as boolean}
                          aria-label={pref.name}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                              pref.value ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'zones' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Zone Configuration</h3>
              <p className="text-gray-500">Zone configuration settings will be available soon.</p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={isLoading}
          className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {isLoading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  )
} 