'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import Image from 'next/image'

interface Step {
  title: string
  description: string
  icon: string
  image: string
}

const steps: Step[] = [
  {
    title: "Install Sensors",
    description: "Place our advanced moisture and environmental sensors throughout your field for comprehensive monitoring.",
    icon: "fa-microchip",
    image: "/images/sensor-installation.webp"
  },
  {
    title: "Connect System",
    description: "Connect the Positron hub to your existing irrigation system and our cloud platform.",
    icon: "fa-wifi",
    image: "/images/system-connection.webp"
  },
  {
    title: "Data Collection",
    description: "Our sensors continuously collect real-time data about soil moisture, weather conditions, and crop health.",
    icon: "fa-database",
    image: "/images/data-collection.webp"
  },
  {
    title: "AI Analysis",
    description: "Our advanced AI algorithms analyze the data to generate optimal irrigation schedules and recommendations.",
    icon: "fa-brain",
    image: "/images/ai-analysis.webp"
  },
  {
    title: "Smart Control",
    description: "Control your irrigation system automatically or manually through our mobile app.",
    icon: "fa-mobile-screen",
    image: "/images/smart-control.webp"
  }
]

const TimelineStep = ({ step, index, isActive, onClick }: { 
  step: Step
  index: number
  isActive: boolean
  onClick: () => void
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      className={`relative flex flex-col items-center ${index !== steps.length - 1 ? 'flex-1' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Connector Line */}
      {index !== steps.length - 1 && (
        <div className="absolute top-8 left-1/2 w-full h-0.5 bg-gray-200">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: "0%" }}
            animate={isActive ? { width: "100%" } : { width: "0%" }}
            transition={{ duration: 0.5 }}
          />
        </div>
      )}

      {/* Step Circle */}
      <motion.button
        className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center 
          ${isActive ? 'bg-primary text-white' : 'bg-white text-primary border-2 border-primary'}
          transition-colors duration-300 cursor-pointer`}
        onClick={onClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <i className={`fas ${step.icon} text-2xl`}></i>
      </motion.button>

      {/* Step Content */}
      <motion.div
        className="mt-6 text-center"
        initial={{ opacity: 0 }}
        animate={isActive ? { opacity: 1 } : { opacity: 0.6 }}
      >
        <h3 className="text-lg font-bold text-primary mb-2">{step.title}</h3>
        <p className="text-sm text-gray-600 max-w-xs">{step.description}</p>
      </motion.div>
    </motion.div>
  )
}

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section ref={sectionRef} className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl font-bold text-primary mb-6">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Experience the seamless integration of smart technology with traditional irrigation systems
          </p>
        </motion.div>

        {/* Timeline Steps */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-4">
            {steps.map((step, index) => (
              <TimelineStep
                key={index}
                step={step}
                index={index}
                isActive={index <= activeStep}
                onClick={() => setActiveStep(index)}
              />
            ))}
          </div>
        </div>

        {/* Step Image */}
        <motion.div
          className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 bg-black/40 z-10" />
          <Image
            src={steps[activeStep].image}
            alt={steps[activeStep].title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <motion.div
              className="text-center text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              key={activeStep}
            >
              <h3 className="text-3xl font-bold mb-4">{steps[activeStep].title}</h3>
              <p className="text-xl max-w-2xl">{steps[activeStep].description}</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 