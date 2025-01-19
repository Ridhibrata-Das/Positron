'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

interface FeatureCardProps {
  title: string
  description: string
  icon: string
  delay: number
}

const FeatureCard = ({ title, description, icon, delay }: FeatureCardProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      className="bg-white rounded-xl feature-card-shadow p-8"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.03 }}
    >
      <div className="feature-icon w-16 h-16 mx-auto mb-6">
        <i className={`fas ${icon} text-4xl`}></i>
      </div>
      <h3 className="text-2xl font-bold text-primary mb-4 text-center">{title}</h3>
      <p className="text-gray-600 text-center leading-relaxed">{description}</p>
    </motion.div>
  )
}

const features = [
  {
    title: "Smart Moisture Sensing",
    description: "Real-time soil moisture monitoring with precision sensors for optimal water management.",
    icon: "fa-tint",
  },
  {
    title: "AI-Powered Recommendations",
    description: "Advanced algorithms provide personalized irrigation schedules based on crop needs and weather conditions.",
    icon: "fa-brain",
  },
  {
    title: "Mobile Control",
    description: "Control your irrigation system from anywhere using our intuitive mobile application.",
    icon: "fa-mobile-alt",
  },
  {
    title: "Weather Integration",
    description: "Automatic adjustments based on local weather forecasts to prevent overwatering.",
    icon: "fa-cloud-sun",
  },
  {
    title: "Resource Analytics",
    description: "Detailed insights into water usage and savings with comprehensive reporting.",
    icon: "fa-chart-line",
  },
  {
    title: "Smart Scheduling",
    description: "Automated irrigation schedules optimized for different crops and growth stages.",
    icon: "fa-clock",
  },
]

export default function Features() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section ref={sectionRef} className="py-24 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-bold text-primary mb-6">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover how our smart irrigation system revolutionizes farming with cutting-edge technology
            and precision agriculture solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  )
} 