'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'

export default function CallToAction() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      setSubmitStatus('success')
      setEmail('')
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-primary/5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #2E7D32 1px, transparent 0)',
          backgroundSize: '40px 40px',
          opacity: 0.2
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative">
        <motion.div
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Ready to Transform Your Irrigation?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of farmers who are already saving water and improving crop yields with Positron's smart irrigation system.
            </p>
          </motion.div>

          {/* Form Section */}
          <motion.div
            className="max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-6 py-4 rounded-full border-2 border-gray-200 focus:border-primary focus:outline-none text-lg transition-colors duration-300"
                  required
                />
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500"
                  >
                    <i className="fas fa-check-circle text-xl"></i>
                  </motion.div>
                )}
              </div>
              <motion.button
                type="submit"
                className="px-8 py-4 bg-primary text-white rounded-full text-lg font-semibold hover:bg-secondary transition-colors duration-300 flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <i className="fas fa-circle-notch text-xl"></i>
                  </motion.div>
                ) : (
                  "Get Started"
                )}
              </motion.button>
            </form>

            {/* Status Messages */}
            <motion.div
              className="mt-4 h-6"
              initial={false}
              animate={{ opacity: submitStatus !== 'idle' ? 1 : 0 }}
            >
              {submitStatus === 'success' && (
                <p className="text-green-600">
                  <i className="fas fa-check-circle mr-2"></i>
                  Thank you! We'll be in touch soon.
                </p>
              )}
              {submitStatus === 'error' && (
                <p className="text-red-600">
                  <i className="fas fa-exclamation-circle mr-2"></i>
                  Oops! Something went wrong. Please try again.
                </p>
              )}
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              className="mt-8 flex flex-wrap justify-center items-center gap-6 text-gray-500"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="flex items-center">
                <i className="fas fa-shield-alt mr-2"></i>
                <span>Secure & Confidential</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-clock mr-2"></i>
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-times-circle mr-2"></i>
                <span>Cancel Anytime</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 