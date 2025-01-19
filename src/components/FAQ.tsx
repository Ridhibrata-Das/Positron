'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'

interface FAQItem {
  id: number
  question: string
  answer: string
  category: string
}

const faqs: FAQItem[] = [
  {
    id: 1,
    question: "How does the Positron irrigation system work?",
    answer: "The Positron system uses advanced sensors to monitor soil moisture, weather conditions, and plant health in real-time. Our AI algorithms analyze this data to automatically adjust irrigation schedules and water distribution, ensuring optimal water usage and crop health.",
    category: "General"
  },
  {
    id: 2,
    question: "What type of sensors are included in the system?",
    answer: "Our system includes soil moisture sensors, temperature sensors, humidity sensors, and weather monitoring stations. These sensors work together to provide comprehensive data about your field's conditions and requirements.",
    category: "Technical"
  },
  {
    id: 3,
    question: "Can I control the system from my mobile device?",
    answer: "Yes! Our mobile app gives you complete control over your irrigation system from anywhere. You can view real-time data, adjust settings, and receive alerts and recommendations directly on your smartphone.",
    category: "Usage"
  },
  {
    id: 4,
    question: "What kind of support do you provide?",
    answer: "We offer 24/7 technical support, regular system maintenance, and continuous software updates. Our team of agricultural experts is also available for consultation to help you optimize your irrigation strategy.",
    category: "Support"
  },
  {
    id: 5,
    question: "How much water can I save with Positron?",
    answer: "On average, our customers report 30-40% reduction in water usage while maintaining or improving crop yields. The exact savings depend on your current irrigation practices, crop type, and local conditions.",
    category: "Benefits"
  },
  {
    id: 6,
    question: "Is the system compatible with existing irrigation infrastructure?",
    answer: "Yes, Positron is designed to integrate seamlessly with most existing irrigation systems. Our team will assess your current setup and provide any necessary adapters or modifications during installation.",
    category: "Technical"
  }
]

const FAQItem = ({ faq, isOpen, onToggle }: { 
  faq: FAQItem
  isOpen: boolean
  onToggle: () => void 
}) => {
  const itemRef = useRef(null)
  const isInView = useInView(itemRef, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="border-b border-gray-200 last:border-b-0"
    >
      <button
        onClick={onToggle}
        className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
      >
        <span className="text-xl font-semibold text-gray-800 group-hover:text-primary transition-colors duration-300">
          {faq.question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-primary"
        >
          <i className="fas fa-chevron-down"></i>
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pb-6 text-gray-600 leading-relaxed">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(1)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true })

  const handleToggle = (id: number) => {
    setOpenId(openId === id ? null : id)
  }

  const categories = Array.from(new Set(faqs.map(faq => faq.category)))

  return (
    <section ref={sectionRef} className="py-24 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Find answers to common questions about the Positron Smart Irrigation System
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              className="px-6 py-2 rounded-full text-primary border-2 border-primary hover:bg-primary hover:text-white transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg divide-y divide-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {faqs.map((faq) => (
            <FAQItem
              key={faq.id}
              faq={faq}
              isOpen={openId === faq.id}
              onToggle={() => handleToggle(faq.id)}
            />
          ))}
        </motion.div>

        {/* Contact Support */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-gray-600 mb-4">
            Can't find what you're looking for?
          </p>
          <motion.button
            className="text-primary font-semibold hover:text-secondary transition-colors duration-300 flex items-center justify-center mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <i className="fas fa-envelope mr-2"></i>
            Contact Support
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
} 