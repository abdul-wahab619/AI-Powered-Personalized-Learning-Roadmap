import React from 'react';
import { ArrowRight, BookOpen, Target, TrendingUp, Users, MessageCircle, BarChart3, Zap, Shield, Globe } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
  onStartChat: () => void;
}

export function LandingPage({ onGetStarted, onStartChat }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-16">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
                <BookOpen className="h-12 w-12 text-blue-600" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              AI-Powered Personalized
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block mt-2">
                Learning Roadmap
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Get AI-powered, step-by-step career roadmaps tailored to your goals using Google Gemini. 
              Chat with AI, track progress, access curated resources, and build real projects that matter.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button
                onClick={onGetStarted}
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center gap-2"
              >
                Start Your Journey
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={onStartChat}
                className="group px-8 py-4 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors duration-300 flex items-center gap-2"
              >
                <MessageCircle className="h-5 w-5 group-hover:scale-110 transition-transform" />
                Chat with AI
              </button>
            </div>
            
            <div className="flex justify-center items-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>10,000+ learners</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                <span>Unlimited career paths</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                <span>Google Gemini AI</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Powered by Advanced AI Technology
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience the future of personalized learning with Google Gemini AI integration.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="group p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 hover:scale-105 text-center">
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mb-6 mx-auto group-hover:scale-110 transition-transform">
              <MessageCircle className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">AI Chat Assistant</h3>
            <p className="text-gray-600 leading-relaxed">Chat naturally with our AI to get instant roadmaps, answer questions, and receive personalized guidance.</p>
          </div>

          <div className="group p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 hover:scale-105 text-center">
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl mb-6 mx-auto group-hover:scale-110 transition-transform">
              <BarChart3 className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Dynamic Progress Tracking</h3>
            <p className="text-gray-600 leading-relaxed">Track your learning journey with real-time progress updates, completion milestones, and achievement badges.</p>
          </div>

          <div className="group p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 hover:scale-105 text-center">
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-6 mx-auto group-hover:scale-110 transition-transform">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Real-time Generation</h3>
            <p className="text-gray-600 leading-relaxed">Get instantly generated roadmaps tailored to any career path or skill you want to learn.</p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything you need to succeed
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our AI-powered platform provides personalized learning experiences designed for your career goals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 hover:scale-105"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white/50 backdrop-blur-sm py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">∞</div>
              <div className="text-gray-600">Career Paths Available</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-gray-600">AI Assistant Available</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">100%</div>
              <div className="text-gray-600">Personalized Content</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">Free</div>
              <div className="text-gray-600">Always Free to Use</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to accelerate your career?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Join thousands of learners who have transformed their careers with AI-powered personalized roadmaps.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onGetStarted}
              className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Get Started Free
            </button>
            <button
              onClick={onStartChat}
              className="px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-blue-600 transition-colors duration-300"
            >
              Try AI Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    icon: MessageCircle,
    title: 'Conversational AI',
    description: 'Chat naturally with our AI assistant to get instant roadmaps, ask questions, and receive personalized guidance.'
  },
  {
    icon: BookOpen,
    title: 'Curated Resources',
    description: 'Access handpicked courses, tutorials, and documentation from the best sources across the web.'
  },
  {
    icon: BarChart3,
    title: 'Dynamic Progress Tracking',
    description: 'Monitor your learning journey with real-time progress updates, completion milestones, and achievement tracking.'
  },
  {
    icon: Target,
    title: 'Real Projects',
    description: 'Build portfolio-worthy projects at each milestone to demonstrate your growing expertise.'
  },
  {
    icon: Zap,
    title: 'Industry Relevant',
    description: 'Learn skills that are in demand in today\'s job market with AI-generated, up-to-date curriculum.'
  },
  {
    icon: Globe,
    title: 'Flexible Learning',
    description: 'Learn at your own pace with estimated timelines that adapt to your schedule and learning speed.'
  }
];