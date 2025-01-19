'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface SupportArticle {
  id: string
  title: string
  category: 'getting_started' | 'troubleshooting' | 'maintenance' | 'features'
  content: string
  lastUpdated: string
  helpfulCount: number
}

interface SupportContact {
  type: string
  icon: string
  title: string
  description: string
  action: string
  link: string
}

const supportArticles: SupportArticle[] = [
  {
    id: '1',
    title: 'Getting Started with Your Smart Irrigation System',
    category: 'getting_started',
    content: 'Learn how to set up and configure your irrigation system for optimal performance.',
    lastUpdated: '2024-02-15',
    helpfulCount: 45
  },
  {
    id: '2',
    title: 'Troubleshooting Sensor Issues',
    category: 'troubleshooting',
    content: 'Common sensor problems and their solutions.',
    lastUpdated: '2024-02-18',
    helpfulCount: 32
  },
  {
    id: '3',
    title: 'Maintenance Schedule Guide',
    category: 'maintenance',
    content: 'Recommended maintenance tasks and schedules for your irrigation system.',
    lastUpdated: '2024-02-10',
    helpfulCount: 28
  },
  {
    id: '4',
    title: 'Advanced Features Tutorial',
    category: 'features',
    content: 'Detailed guide on using advanced features and automation.',
    lastUpdated: '2024-02-20',
    helpfulCount: 37
  }
]

const supportContacts: SupportContact[] = [
  {
    type: 'chat',
    icon: 'fa-comments',
    title: 'Live Chat Support',
    description: 'Chat with our support team in real-time',
    action: 'Start Chat',
    link: '#chat'
  },
  {
    type: 'email',
    icon: 'fa-envelope',
    title: 'Email Support',
    description: 'Send us an email, we usually respond within 24 hours',
    action: 'Send Email',
    link: 'mailto:support@positron.com'
  },
  {
    type: 'phone',
    icon: 'fa-phone',
    title: 'Phone Support',
    description: 'Available Monday to Friday, 9 AM - 5 PM',
    action: 'Call Now',
    link: 'tel:+1234567890'
  }
]

export default function Support() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [showContactForm, setShowContactForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const filteredArticles = supportArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.content.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setShowContactForm(false)
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Help & Support</h2>
        <p className="text-sm text-gray-500 mt-1">
          Find help articles, tutorials, and contact support
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search help articles..."
              className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
            <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
          </div>
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        >
          <option value="all">All Categories</option>
          <option value="getting_started">Getting Started</option>
          <option value="troubleshooting">Troubleshooting</option>
          <option value="maintenance">Maintenance</option>
          <option value="features">Features</option>
        </select>
      </div>

      {/* Help Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredArticles.map((article) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              article.category === 'getting_started' ? 'bg-blue-100 text-blue-800' :
              article.category === 'troubleshooting' ? 'bg-red-100 text-red-800' :
              article.category === 'maintenance' ? 'bg-yellow-100 text-yellow-800' :
              'bg-green-100 text-green-800'
            }`}>
              {article.category.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </span>
            <h3 className="mt-2 text-lg font-semibold text-gray-900">{article.title}</h3>
            <p className="mt-2 text-sm text-gray-600">{article.content}</p>
            <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
              <span>Last updated: {new Date(article.lastUpdated).toLocaleDateString()}</span>
              <span className="flex items-center">
                <i className="fas fa-thumbs-up mr-1"></i>
                {article.helpfulCount} found this helpful
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Contact Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {supportContacts.map((contact) => (
          <motion.div
            key={contact.type}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-sm text-center"
          >
            <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <i className={`fas ${contact.icon} text-primary text-xl`}></i>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">{contact.title}</h3>
            <p className="mt-2 text-sm text-gray-600">{contact.description}</p>
            <a
              href={contact.link}
              className="mt-4 inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium text-primary hover:text-primary/80 transition-colors duration-200"
            >
              {contact.action}
              <i className="fas fa-arrow-right ml-2"></i>
            </a>
          </motion.div>
        ))}
      </div>

      {/* Contact Form */}
      {showContactForm && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Support</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                required
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
              <input
                type="text"
                id="subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                required
              ></textarea>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setShowContactForm(false)}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                Send Message
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Quick Help Button */}
      <div className="fixed bottom-8 right-8">
        <button
          onClick={() => setShowContactForm(true)}
          className="w-14 h-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/20"
          aria-label="Get help"
        >
          <i className="fas fa-question-circle text-2xl"></i>
        </button>
      </div>
    </div>
  )
} 