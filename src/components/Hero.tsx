'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { LampContainer } from './ui/lamp'

export default function Hero() {
  const router = useRouter()

  const handleGetStarted = () => {
    router.push('/role-selection')
  }

  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: 'easeInOut',
        }}
        className="bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-5xl font-bold tracking-tight text-transparent md:text-7xl max-w-4xl mx-auto"
      >
        Smart Irrigation <br /> for a Greener Future
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.5,
          duration: 0.8,
          ease: 'easeInOut',
        }}
        className="mt-6 text-center text-slate-400 text-xl max-w-2xl mx-auto"
      >
        Transform your agricultural practices with AI-powered irrigation solutions. Save water, increase yields, and make data-driven decisions.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.7,
          duration: 0.8,
          ease: 'easeInOut',
        }}
        className="mt-10"
      >
        <button
          onClick={handleGetStarted}
          className="px-8 py-4 bg-primary text-white rounded-full text-lg font-semibold hover:bg-secondary transition-all duration-300 hover:shadow-lg"
        >
          Get Started
        </button>
      </motion.div>
    </LampContainer>
  )
} 