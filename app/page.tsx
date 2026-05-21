'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

// Simple fade-in animation on scroll
function useInView(ref: React.RefObject<HTMLElement>, options = { threshold: 0.1 }) {
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true)
        observer.unobserve(entry.target)
      }
    }, options)

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [ref, options])

  return isInView
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Refs for animations
  const heroRef = useRef<HTMLElement>(null)
  const aboutRef = useRef<HTMLElement>(null)
  const workRef = useRef<HTMLElement>(null)
  const projectsRef = useRef<HTMLElement>(null)
  const teamRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)

  const heroInView = useInView(heroRef)
  const aboutInView = useInView(aboutRef)
  const workInView = useInView(workRef)
  const projectsInView = useInView(projectsRef)
  const teamInView = useInView(teamRef)
  const contactInView = useInView(contactRef)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-sm border-b border-gray-200'
            : 'bg-white/50 backdrop-blur-sm'
        }`}
      >
        <nav className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="#" className="text-lg font-semibold tracking-tight">
            Passo Crafto
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#about"
              className="text-sm text-gray-600 hover:text-black transition-colors"
            >
              About
            </a>
            <a
              href="#work"
              className="text-sm text-gray-600 hover:text-black transition-colors"
            >
              Work
            </a>
            <a
              href="#team"
              className="text-sm text-gray-600 hover:text-black transition-colors"
            >
              Team
            </a>
            <a
              href="#contact"
              className="text-sm font-medium px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition-colors"
            >
              Contact
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span
                className={`h-0.5 w-full bg-black transition-transform ${
                  mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`h-0.5 w-full bg-black transition-opacity ${
                  mobileMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`h-0.5 w-full bg-black transition-transform ${
                  mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </div>
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-4">
              <a
                href="#about"
                className="text-sm text-gray-600 hover:text-black"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </a>
              <a
                href="#work"
                className="text-sm text-gray-600 hover:text-black"
                onClick={() => setMobileMenuOpen(false)}
              >
                Work
              </a>
              <a
                href="#team"
                className="text-sm text-gray-600 hover:text-black"
                onClick={() => setMobileMenuOpen(false)}
              >
                Team
              </a>
              <a
                href="#contact"
                className="text-sm font-medium px-4 py-2 rounded-lg bg-black text-white w-fit"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div
            className={`max-w-3xl transition-all duration-700 ease-out ${
              heroInView
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
          >
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              We build and experiment across AI, software, finance, and marketing.
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Focused on practical products, clean systems, and modern tools.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        ref={aboutRef}
        id="about"
        className="py-20 px-6 border-t border-gray-200"
      >
        <div className="max-w-6xl mx-auto">
          <div
            className={`grid md:grid-cols-2 gap-16 transition-all duration-700 ease-out ${
              aboutInView
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
          >
            <div>
              <h2 className="text-3xl font-bold mb-6">About Us</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We are a small independent team building software, tools, automations, and digital products.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our work spans AI systems, web applications, finance workflows, and marketing operations.
              </p>
            </div>
            <div className="text-gray-400 text-sm leading-relaxed">
              <p className="mb-4">
                Small remote team based in Vietnam. Focused on practical execution and modern technologies.
              </p>
              <p className="text-gray-500">
                We believe in building products that solve real problems, using clean code and thoughtful design.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Areas of Work */}
      <section
        ref={workRef}
        id="work"
        className="py-20 px-6 border-t border-gray-200"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">What We Do</h2>

          <div
            className={`grid md:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-700 ease-out ${
              workInView
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
          >
            {/* AI */}
            <div className="group">
              <h3 className="text-base font-semibold mb-4">AI</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="group-hover:text-black transition-colors">
                  LLM tools
                </li>
                <li className="group-hover:text-black transition-colors">
                  Automation
                </li>
                <li className="group-hover:text-black transition-colors">
                  Data systems
                </li>
              </ul>
            </div>

            {/* Software */}
            <div className="group">
              <h3 className="text-base font-semibold mb-4">Software</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="group-hover:text-black transition-colors">
                  Web applications
                </li>
                <li className="group-hover:text-black transition-colors">
                  Internal tools
                </li>
                <li className="group-hover:text-black transition-colors">
                  Frontend systems
                </li>
              </ul>
            </div>

            {/* Finance */}
            <div className="group">
              <h3 className="text-base font-semibold mb-4">Finance</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="group-hover:text-black transition-colors">
                  Analytics
                </li>
                <li className="group-hover:text-black transition-colors">
                  Dashboards
                </li>
                <li className="group-hover:text-black transition-colors">
                  Automation
                </li>
              </ul>
            </div>

            {/* Marketing */}
            <div className="group">
              <h3 className="text-base font-semibold mb-4">Marketing</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="group-hover:text-black transition-colors">
                  Growth systems
                </li>
                <li className="group-hover:text-black transition-colors">
                  Content workflows
                </li>
                <li className="group-hover:text-black transition-colors">
                  Digital strategy
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Selected Projects */}
      <section ref={projectsRef} className="py-20 px-6 border-t border-gray-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">Selected Projects</h2>

          <div
            className={`grid md:grid-cols-2 gap-6 transition-all duration-700 ease-out ${
              projectsInView
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
          >
            {/* Project 1 */}
            <div className="group border border-gray-200 rounded-lg p-6 hover:border-gray-400 hover:bg-gray-50 transition-all cursor-pointer">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-base font-semibold">AI Workflow Dashboard</h3>
                <span className="text-xs text-gray-500">2024</span>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Internal dashboard for managing LLM workflows and automation tasks. Real-time monitoring and execution control.
              </p>
              <div className="flex gap-2">
                <span className="text-xs px-2 py-1 bg-gray-100 rounded text-gray-700">
                  Next.js
                </span>
                <span className="text-xs px-2 py-1 bg-gray-100 rounded text-gray-700">
                  TypeScript
                </span>
                <span className="text-xs px-2 py-1 bg-gray-100 rounded text-gray-700">
                  Python
                </span>
              </div>
            </div>

            {/* Project 2 */}
            <div className="group border border-gray-200 rounded-lg p-6 hover:border-gray-400 hover:bg-gray-50 transition-all cursor-pointer">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-base font-semibold">Financial Analytics Tool</h3>
                <span className="text-xs text-gray-500">2024</span>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Analytics platform for tracking financial metrics, reporting, and forecasting. Connected to multiple data sources.
              </p>
              <div className="flex gap-2">
                <span className="text-xs px-2 py-1 bg-gray-100 rounded text-gray-700">
                  React
                </span>
                <span className="text-xs px-2 py-1 bg-gray-100 rounded text-gray-700">
                  Node.js
                </span>
                <span className="text-xs px-2 py-1 bg-gray-100 rounded text-gray-700">
                  PostgreSQL
                </span>
              </div>
            </div>

            {/* Project 3 */}
            <div className="group border border-gray-200 rounded-lg p-6 hover:border-gray-400 hover:bg-gray-50 transition-all cursor-pointer">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-base font-semibold">Marketing Automation System</h3>
                <span className="text-xs text-gray-500">2023</span>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                End-to-end automation platform for email campaigns, segmentation, and performance tracking across channels.
              </p>
              <div className="flex gap-2">
                <span className="text-xs px-2 py-1 bg-gray-100 rounded text-gray-700">
                  Vue.js
                </span>
                <span className="text-xs px-2 py-1 bg-gray-100 rounded text-gray-700">
                  Express
                </span>
                <span className="text-xs px-2 py-1 bg-gray-100 rounded text-gray-700">
                  Redis
                </span>
              </div>
            </div>

            {/* Project 4 */}
            <div className="group border border-gray-200 rounded-lg p-6 hover:border-gray-400 hover:bg-gray-50 transition-all cursor-pointer">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-base font-semibold">Internal Operations Panel</h3>
                <span className="text-xs text-gray-500">2024</span>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Unified control panel for operations, resource management, and team collaboration. Custom built for internal use.
              </p>
              <div className="flex gap-2">
                <span className="text-xs px-2 py-1 bg-gray-100 rounded text-gray-700">
                  Next.js
                </span>
                <span className="text-xs px-2 py-1 bg-gray-100 rounded text-gray-700">
                  GraphQL
                </span>
                <span className="text-xs px-2 py-1 bg-gray-100 rounded text-gray-700">
                  MongoDB
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 px-6 border-t border-gray-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">Team</h2>

          <div
            ref={teamRef}
            className={`grid md:grid-cols-3 gap-8 transition-all duration-700 ease-out ${
              teamInView
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
          >
            {/* Team Member 1 */}
            <div className="group">
              <div className="aspect-square bg-gray-200 rounded-lg mb-4 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400" />
              </div>
              <h3 className="text-base font-semibold mb-1">Alex Johnson</h3>
              <p className="text-sm text-gray-600">Software Engineer</p>
            </div>

            {/* Team Member 2 */}
            <div className="group">
              <div className="aspect-square bg-gray-200 rounded-lg mb-4 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400" />
              </div>
              <h3 className="text-base font-semibold mb-1">Priya Sharma</h3>
              <p className="text-sm text-gray-600">AI & Data Science</p>
            </div>

            {/* Team Member 3 */}
            <div className="group">
              <div className="aspect-square bg-gray-200 rounded-lg mb-4 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400" />
              </div>
              <h3 className="text-base font-semibold mb-1">Marcus Wei</h3>
              <p className="text-sm text-gray-600">Finance & Strategy</p>
            </div>

            {/* Team Member 4 */}
            <div className="group">
              <div className="aspect-square bg-gray-200 rounded-lg mb-4 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400" />
              </div>
              <h3 className="text-base font-semibold mb-1">Sara El-Amin</h3>
              <p className="text-sm text-gray-600">Product & Design</p>
            </div>

            {/* Team Member 5 */}
            <div className="group">
              <div className="aspect-square bg-gray-200 rounded-lg mb-4 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400" />
              </div>
              <h3 className="text-base font-semibold mb-1">David Park</h3>
              <p className="text-sm text-gray-600">Full Stack Developer</p>
            </div>

            {/* Team Member 6 */}
            <div className="group">
              <div className="aspect-square bg-gray-200 rounded-lg mb-4 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400" />
              </div>
              <h3 className="text-base font-semibold mb-1">Emma Chen</h3>
              <p className="text-sm text-gray-600">Marketing Operations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} id="contact" className="py-20 px-6 border-t border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div
            className={`max-w-2xl transition-all duration-700 ease-out ${
              contactInView
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
          >
            <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
            <p className="text-gray-600 mb-8">
              Have a project in mind or want to collaborate? We'd love to hear from you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="mailto:hello@passocrafto.com"
                className="px-6 py-3 rounded-lg bg-black text-white font-medium hover:bg-gray-800 transition-colors text-center sm:text-left"
              >
                Email us
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-lg border border-gray-300 text-black font-medium hover:bg-gray-50 transition-colors text-center sm:text-left"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-lg border border-gray-300 text-black font-medium hover:bg-gray-50 transition-colors text-center sm:text-left"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-200 bg-gray-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center flex-col sm:flex-row gap-4">
          <p className="text-sm text-gray-600">
            © 2026 Passo Crafto. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-600">
            <a href="#" className="hover:text-black transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-black transition-colors">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
