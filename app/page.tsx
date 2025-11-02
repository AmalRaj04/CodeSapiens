"use client";

import { motion } from "framer-motion";
import { 
  Sparkles, 
  Search, 
  FileText, 
  Bot, 
  Menu, 
  X,
  Briefcase,
  TrendingUp,
  MessageSquare
} from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import ProfileDropdown from "./components/ProfileDropdown";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isLoading } = useAuth();

  useEffect(() => {
    const handleSmoothScroll = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      if (target.href && target.href.includes("#")) {
        const hash = target.href.split("#")[1];
        const element = document.getElementById(hash);
        if (element) {
          e.preventDefault();
          element.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }
      }
    };

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleSmoothScroll);
    });

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', handleSmoothScroll);
      });
    };
  }, []);

  const navItems = ["Home", "Features", "About", "Contact"];

  const features = [
    {
      icon: Search,
      title: "Personalized Recommendations",
      description: "Get AI-powered internship matches tailored to your skills, interests, and career goals."
    },
    {
      icon: FileText,
      title: "Resume Analyzer",
      description: "Upload your resume and receive instant feedback with actionable insights to improve it."
    },
    {
      icon: Bot,
      title: "AI Career Assistant",
      description: "Get personalized career guidance, interview tips, and skill development recommendations."
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-lg z-50 border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2"
            >
              <Sparkles className="w-8 h-8 text-purple-600" />
              <span className="text-2xl font-bold text-gray-900">InternConnect</span>
            </motion.div>

            {/* Desktop Navigation */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="hidden md:flex items-center gap-8"
            >
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
                >
                  {item}
                </a>
              ))}
              {!isLoading && (
                user ? (
                  <ProfileDropdown />
                ) : (
                  <Link href="/login">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition"
                    >
                      Login
                    </motion.button>
                  </Link>
                )
              )}
            </motion.div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4"
            >
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block py-2 text-gray-700 hover:text-purple-600 transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              {!isLoading && (
                user ? (
                  <div className="w-full mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-center">
                    <p className="text-green-700 font-medium">Welcome back, {user.name}!</p>
                  </div>
                ) : (
                  <Link href="/login" className="block w-full mt-4">
                    <button className="w-full bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition">
                      Login
                    </button>
                  </Link>
                )
              )}
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-white to-blue-50" />
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full blur-3xl opacity-30"
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-30"
            animate={{
              x: [0, -50, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-block mb-6"
            >
              <Sparkles className="w-16 h-16 text-purple-600 mx-auto" />
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Find Your Dream Internship{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                with AI Guidance
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Smart recommendations, resume insights, and skill growth powered by AI.
            </p>

            {!isLoading && !user && (
              <Link href="/signup">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="bg-purple-600 text-white px-10 py-4 rounded-xl font-semibold text-lg shadow-lg hover:bg-purple-700 transition-all"
                >
                  Get Started
                </motion.button>
              </Link>
            )}

            {user && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-lg max-w-md mx-auto"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Welcome back, {user.name}!</h3>
                <p className="text-gray-600 mb-6">Ready to find your next internship opportunity?</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-purple-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:bg-purple-700 transition-all"
                >
                  Browse Internships
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to land your perfect internship
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ y: -5 }}
                  className="p-8 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl border border-purple-100 hover:shadow-lg transition-all"
                >
                  <div className="w-14 h-14 bg-purple-600 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-b from-white to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  About InternConnect
                </h2>
                <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                  We're revolutionizing how students find internships by harnessing the power of artificial intelligence. 
                  Our platform analyzes your skills, interests, and career goals to match you with the perfect opportunities.
                </p>
                <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                  With advanced resume analysis and personalized recommendations, we help you stand out in the competitive 
                  internship market and accelerate your career journey.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 p-8 flex items-center justify-center shadow-2xl">
                  <div className="grid grid-cols-2 gap-4 w-full">
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center">
                      <TrendingUp className="w-12 h-12 text-white mx-auto mb-3" />
                      <p className="text-3xl font-bold text-white mb-1">95%</p>
                      <p className="text-white/90 text-sm">Success Rate</p>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center">
                      <Briefcase className="w-12 h-12 text-white mx-auto mb-3" />
                      <p className="text-3xl font-bold text-white mb-1">10K+</p>
                      <p className="text-white/90 text-sm">Opportunities</p>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center">
                      <MessageSquare className="w-12 h-12 text-white mx-auto mb-3" />
                      <p className="text-3xl font-bold text-white mb-1">50K+</p>
                      <p className="text-white/90 text-sm">Active Users</p>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center">
                      <Sparkles className="w-12 h-12 text-white mx-auto mb-3" />
                      <p className="text-3xl font-bold text-white mb-1">AI</p>
                      <p className="text-white/90 text-sm">Powered</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-8 h-8 text-purple-400" />
                  <span className="text-xl font-bold">InternConnect</span>
                </div>
                <p className="text-gray-400">
                  Your AI-powered gateway to the perfect internship.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Platform</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition">How It Works</a></li>
                  <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                  <li><a href="#" className="hover:text-white transition">Success Stories</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Resources</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition">Blog</a></li>
                  <li><a href="#" className="hover:text-white transition">Career Tips</a></li>
                  <li><a href="#" className="hover:text-white transition">FAQ</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Connect</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
                  <li><a href="#" className="hover:text-white transition">Twitter</a></li>
                  <li><a href="#" className="hover:text-white transition">LinkedIn</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
              <p>&copy; {new Date().getFullYear()} InternConnect. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>

    </main>
  );
}
