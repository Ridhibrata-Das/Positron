'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'

interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  image: string
  quote: string
  rating: number
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "John Anderson",
    role: "Farm Owner",
    company: "Green Valley Farms",
    image: "/images/testimonials/farmer1.webp",
    quote: "The Positron system has revolutionized how we manage irrigation. We've seen a 40% reduction in water usage while maintaining optimal crop health.",
    rating: 5
  },
  {
    id: 2,
    name: "Sarah Martinez",
    role: "Agricultural Engineer",
    company: "AgriTech Solutions",
    image: "/images/testimonials/expert1.webp",
    quote: "As an agricultural engineer, I'm impressed by the precision and reliability of Positron's sensors. The AI recommendations are remarkably accurate.",
    rating: 5
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Vineyard Manager",
    company: "Sunset Vineyards",
    image: "/images/testimonials/farmer2.webp",
    quote: "Our wine grapes require precise irrigation. Positron's smart system has helped us achieve consistent quality across our entire vineyard.",
    rating: 5
  },
  {
    id: 4,
    name: "Emily Thompson",
    role: "Sustainability Director",
    company: "EcoFarms International",
    image: "/images/testimonials/expert2.webp",
    quote: "The water conservation achievements with Positron have exceeded our expectations. It's a game-changer for sustainable agriculture.",
    rating: 5
  }
]

const TestimonialCard = ({ testimonial, isActive }: { testimonial: Testimonial, isActive: boolean }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      className={`relative w-full max-w-2xl mx-auto ${isActive ? 'block' : 'hidden'}`}
      initial={{ rotateY: 180, opacity: 0 }}
      animate={{ rotateY: 0, opacity: 1 }}
      exit={{ rotateY: -180, opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Image Section */}
          <div className="relative w-full md:w-1/3 h-64 md:h-auto">
            <Image
              src={testimonial.image}
              alt={testimonial.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-primary/10" />
          </div>

          {/* Content Section */}
          <div className="w-full md:w-2/3 p-8 md:p-10">
            {/* Quote */}
            <div className="text-primary mb-6">
              <i className="fas fa-quote-left text-4xl opacity-20"></i>
            </div>
            <p className="text-gray-600 text-lg mb-6 italic">
              "{testimonial.quote}"
            </p>

            {/* Rating */}
            <div className="flex mb-6">
              {[...Array(testimonial.rating)].map((_, i) => (
                <i key={i} className="fas fa-star text-yellow-400 mr-1"></i>
              ))}
            </div>

            {/* Author Info */}
            <div>
              <h4 className="text-xl font-bold text-primary mb-1">
                {testimonial.name}
              </h4>
              <p className="text-gray-600 mb-1">{testimonial.role}</p>
              <p className="text-gray-500 text-sm">{testimonial.company}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true })

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [autoplay])

  const handlePrevious = () => {
    setAutoplay(false)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleNext = () => {
    setAutoplay(false)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  return (
    <section ref={sectionRef} className="py-24 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl font-bold text-primary mb-6">
            What Our Users Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover how Positron is transforming agriculture through real experiences from farmers and experts
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                isActive={index === currentIndex}
              />
            ))}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4 z-10">
            <motion.button
              className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors duration-300"
              onClick={handlePrevious}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <i className="fas fa-chevron-left"></i>
            </motion.button>
            <motion.button
              className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors duration-300"
              onClick={handleNext}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <i className="fas fa-chevron-right"></i>
            </motion.button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === currentIndex ? 'bg-primary' : 'bg-gray-300'
                }`}
                onClick={() => {
                  setAutoplay(false)
                  setCurrentIndex(index)
                }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 