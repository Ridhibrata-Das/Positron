'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubscribeStatus('idle')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      setSubscribeStatus('success')
      setEmail('')
    } catch (error) {
      setSubscribeStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const footerLinks = {
    product: [
      { name: 'Features', href: '#features' },
      { name: 'How It Works', href: '#how-it-works' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'Case Studies', href: '#case-studies' },
    ],
    company: [
      { name: 'About Us', href: '#about' },
      { name: 'Careers', href: '#careers' },
      { name: 'Press', href: '#press' },
      { name: 'Blog', href: '#blog' },
    ],
    support: [
      { name: 'Help Center', href: '#help' },
      { name: 'Documentation', href: '#docs' },
      { name: 'Contact Us', href: '#contact' },
      { name: 'FAQ', href: '#faq' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '#privacy' },
      { name: 'Terms of Service', href: '#terms' },
      { name: 'Cookie Policy', href: '#cookies' },
    ],
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <Image
                src="/logo-white.png"
                alt="Positron Logo"
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <span className="text-2xl font-bold">Positron</span>
            </div>
            <p className="text-gray-400 mb-8 max-w-md">
              Revolutionizing agriculture through smart irrigation technology. 
              Join us in creating a sustainable future for farming.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-4">
              <label htmlFor="footer-email" className="block text-sm font-medium text-gray-300">
                Subscribe to our newsletter
              </label>
              <div className="flex max-w-md">
                <input
                  type="email"
                  id="footer-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-l-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-primary"
                  required
                />
                <motion.button
                  type="submit"
                  className="px-6 py-2 bg-primary text-white rounded-r-lg font-medium hover:bg-secondary transition-colors duration-300 disabled:opacity-50"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <i className="fas fa-circle-notch"></i>
                    </motion.div>
                  ) : (
                    "Subscribe"
                  )}
                </motion.button>
              </div>
              {subscribeStatus !== 'idle' && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-sm ${
                    subscribeStatus === 'success' ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {subscribeStatus === 'success' ? (
                    <span><i className="fas fa-check-circle mr-2"></i>Successfully subscribed!</span>
                  ) : (
                    <span><i className="fas fa-exclamation-circle mr-2"></i>Failed to subscribe. Please try again.</span>
                  )}
                </motion.p>
              )}
            </form>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold mb-6 capitalize">{category}</h3>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.name}>
                    <motion.a
                      href={link.href}
                      className="text-gray-400 hover:text-primary transition-colors duration-300"
                      whileHover={{ x: 5 }}
                    >
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Positron. All rights reserved.
            </p>
            <div className="flex space-x-6">
              {['facebook', 'twitter', 'linkedin', 'instagram'].map((platform) => (
                <motion.a
                  key={platform}
                  href={`#${platform}`}
                  className="text-gray-400 hover:text-primary transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <i className={`fab fa-${platform} text-xl`}></i>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 