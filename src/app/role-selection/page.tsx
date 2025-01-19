'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { useRouter } from 'next/navigation'

interface Role {
  id: string
  title: string
  description: string
  icon: string
  requirements?: string[]
  additionalInfo: {
    responsibilities: string[]
    benefits: string[]
    tools: string[]
  }
}

const roles: Role[] = [
  {
    id: 'farmer',
    title: 'Farmer',
    description: 'Manage your irrigation settings, monitor soil health, and receive AI-driven recommendations for optimal crop yield.',
    icon: 'fa-tractor',
    additionalInfo: {
      responsibilities: [
        'Monitor and adjust irrigation schedules',
        'Track crop health metrics',
        'Implement AI recommendations',
        'Maintain field sensors'
      ],
      benefits: [
        'Reduced water consumption',
        'Increased crop yield',
        'Real-time alerts and notifications',
        'Mobile app access'
      ],
      tools: [
        'Mobile Dashboard',
        'Sensor Management Interface',
        'Weather Integration',
        'Crop Analysis Tools'
      ]
    }
  },
  {
    id: 'admin',
    title: 'Administrator',
    description: 'Full system control, user management, and access to advanced analytics and system configurations.',
    icon: 'fa-user-shield',
    requirements: ['Administrative credentials required', 'System management experience'],
    additionalInfo: {
      responsibilities: [
        'Manage user accounts and permissions',
        'Configure system settings',
        'Monitor system performance',
        'Handle security protocols'
      ],
      benefits: [
        'Complete system oversight',
        'Advanced analytics access',
        'Security management tools',
        'Priority support'
      ],
      tools: [
        'Admin Dashboard',
        'User Management Console',
        'System Configuration Panel',
        'Analytics Platform'
      ]
    }
  },
  {
    id: 'expert',
    title: 'Agricultural Expert',
    description: 'Provide professional guidance, analyze farming data, and help optimize irrigation strategies.',
    icon: 'fa-microscope',
    requirements: ['Agricultural degree required', 'Minimum 3 years experience'],
    additionalInfo: {
      responsibilities: [
        'Analyze crop data and patterns',
        'Provide optimization recommendations',
        'Support farmers with expertise',
        'Research and implement best practices'
      ],
      benefits: [
        'Advanced analytical tools',
        'Research collaboration opportunities',
        'Professional network access',
        'Industry recognition'
      ],
      tools: [
        'Data Analysis Suite',
        'Research Platform',
        'Collaboration Tools',
        'Knowledge Base Access'
      ]
    }
  },
  {
    id: 'support',
    title: 'Support Staff',
    description: 'Handle user inquiries, provide technical assistance, and ensure smooth system operation.',
    icon: 'fa-headset',
    additionalInfo: {
      responsibilities: [
        'Respond to user inquiries',
        'Provide technical support',
        'Document issues and solutions',
        'Maintain support resources'
      ],
      benefits: [
        'Comprehensive training',
        'Support tools access',
        'Performance incentives',
        'Career growth opportunities'
      ],
      tools: [
        'Ticket Management System',
        'Knowledge Base Editor',
        'Live Chat Platform',
        'Support Analytics'
      ]
    }
  }
]

interface TooltipProps {
  info: Role['additionalInfo']
  isVisible: boolean
}

const InfoTooltip = ({ info, isVisible }: TooltipProps) => (
  <AnimatePresence>
    {isVisible && (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className="absolute right-0 top-0 z-50 w-80 bg-white rounded-xl shadow-2xl p-6 transform translate-x-[105%]"
      >
        <div className="absolute left-0 top-8 transform -translate-x-2">
          <div className="w-4 h-4 bg-white transform rotate-45" />
        </div>
        
        {/* Responsibilities */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-primary mb-2">
            <i className="fas fa-tasks mr-2"></i>
            Responsibilities
          </h4>
          <ul className="text-sm text-gray-600 space-y-1">
            {info.responsibilities.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="text-primary mr-2">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Benefits */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-primary mb-2">
            <i className="fas fa-gift mr-2"></i>
            Benefits
          </h4>
          <ul className="text-sm text-gray-600 space-y-1">
            {info.benefits.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="text-primary mr-2">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Tools */}
        <div>
          <h4 className="text-sm font-semibold text-primary mb-2">
            <i className="fas fa-tools mr-2"></i>
            Tools & Resources
          </h4>
          <ul className="text-sm text-gray-600 space-y-1">
            {info.tools.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="text-primary mr-2">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
)

export default function RoleSelection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true })
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hoveredRole, setHoveredRole] = useState<string | null>(null)
  const router = useRouter()

  const handleContinue = async () => {
    if (!selectedRole) return
    
    setIsSubmitting(true)
    try {
      // Simulate API call/authentication
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Navigate based on role
      switch (selectedRole) {
        case 'farmer':
          router.push('/dashboard')
          break
        case 'admin':
          router.push('/admin-dashboard')
          break
        case 'expert':
          router.push('/expert-dashboard')
          break
        case 'support':
          router.push('/support-dashboard')
          break
        default:
          console.error('Unknown role selected')
      }
    } catch (error) {
      console.error('Error during role selection:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent, roleId: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setSelectedRole(roleId)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Title and Introduction Section */}
      <section ref={sectionRef} className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Select Your Role
            </h1>
            <div className="relative">
              <div 
                className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 blur-xl"
                style={{ clipPath: 'inset(0)' }}
              />
              <p className="relative text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Choose your role to access tailored features and functionalities designed specifically 
                for your needs in the Positron Smart Irrigation System.
              </p>
            </div>
          </motion.div>

          {/* Decorative Elements */}
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="absolute top-10 left-10 w-20 h-20 bg-primary/5 rounded-full blur-2xl" />
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-secondary/5 rounded-full blur-2xl" />
          </motion.div>
        </div>
      </section>

      {/* Role Options Section */}
      <section className="py-16 px-4" role="radiogroup" aria-label="Role selection">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {roles.map((role, index) => (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setSelectedRole(role.id)}
                onKeyDown={(e) => handleKeyPress(e, role.id)}
                onMouseEnter={() => setHoveredRole(role.id)}
                onMouseLeave={() => setHoveredRole(null)}
                role="radio"
                aria-checked={selectedRole === role.id}
                tabIndex={0}
                className={`relative group cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-2xl ${
                  selectedRole === role.id ? 'ring-2 ring-primary' : ''
                }`}
              >
                <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 p-8">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative">
                    {/* Radio Button */}
                    <div className="absolute top-4 right-4">
                      <div className={`w-6 h-6 rounded-full border-2 ${
                        selectedRole === role.id 
                          ? 'border-primary bg-primary'
                          : 'border-gray-300'
                      } flex items-center justify-center transition-colors duration-300`}>
                        {selectedRole === role.id && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-3 h-3 rounded-full bg-white"
                          />
                        )}
                      </div>
                    </div>

                    {/* Icon and Title */}
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <i className={`fas ${role.icon} text-2xl`}></i>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">{role.title}</h3>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {role.description}
                    </p>

                    {/* Requirements if any */}
                    {role.requirements && (
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-gray-900">Requirements:</p>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                          {role.requirements.map((req, i) => (
                            <li key={i}>{req}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Info Icon */}
                    <div className="absolute top-4 right-14 text-gray-400 hover:text-primary transition-colors duration-300">
                      <i className="fas fa-info-circle text-lg"></i>
                    </div>

                    {/* Tooltip */}
                    <InfoTooltip
                      info={role.additionalInfo}
                      isVisible={hoveredRole === role.id}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Continue Button */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <button
              onClick={handleContinue}
              className={`px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 ${
                selectedRole
                  ? 'bg-primary text-white hover:bg-secondary'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
              disabled={!selectedRole || isSubmitting}
              aria-label={selectedRole 
                ? `Continue as ${roles.find(r => r.id === selectedRole)?.title}` 
                : 'Please select a role to continue'
              }
            >
              {isSubmitting ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="inline-block"
                >
                  <i className="fas fa-circle-notch mr-2"></i>
                </motion.div>
              ) : null}
              Continue as {selectedRole ? roles.find(r => r.id === selectedRole)?.title : '...'}
            </button>
          </motion.div>

          {/* Help and Support Section */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Need Help Choosing?
              </h2>
              <p className="text-gray-600 mb-6">
                We're here to help you find the perfect role for your needs in the Positron Smart Irrigation System.
              </p>
              
              {/* Help Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {/* Schedule a Demo */}
                <motion.a
                  href="#"
                  className="group flex items-center p-4 rounded-xl bg-gray-50 hover:bg-primary/5 transition-colors duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4">
                    <i className="fas fa-desktop text-xl"></i>
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900 mb-1">Schedule a Demo</h3>
                    <p className="text-sm text-gray-600">See the system in action with a personalized demo</p>
                  </div>
                </motion.a>

                {/* Contact Support */}
                <motion.a
                  href="#"
                  className="group flex items-center p-4 rounded-xl bg-gray-50 hover:bg-primary/5 transition-colors duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4">
                    <i className="fas fa-headset text-xl"></i>
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900 mb-1">Contact Support</h3>
                    <p className="text-sm text-gray-600">Get help from our expert support team</p>
                  </div>
                </motion.a>
              </div>

              {/* Quick Links */}
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <motion.a
                  href="#"
                  className="text-primary hover:text-secondary transition-colors duration-300 flex items-center"
                  whileHover={{ x: 2 }}
                >
                  <i className="fas fa-file-alt mr-2"></i>
                  Role Guide
                </motion.a>
                <motion.a
                  href="#"
                  className="text-primary hover:text-secondary transition-colors duration-300 flex items-center"
                  whileHover={{ x: 2 }}
                >
                  <i className="fas fa-question-circle mr-2"></i>
                  FAQs
                </motion.a>
                <motion.a
                  href="#"
                  className="text-primary hover:text-secondary transition-colors duration-300 flex items-center"
                  whileHover={{ x: 2 }}
                >
                  <i className="fas fa-video mr-2"></i>
                  Video Tutorials
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
} 