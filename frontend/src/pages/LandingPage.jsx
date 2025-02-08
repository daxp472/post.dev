import React from 'react';
import { Infinity, Github } from 'lucide-react';
import { NavLink } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="min-h-screen bg-[#1a1d21] text-white">
      {/* Navigation */}
      <nav className="px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Infinity className="h-8 w-8 text-[#ff4d4d]" />
          <span className="text-xl font-bold">Daily.POST</span>
        </div>
        <NavLink to={'/auth/register'}>
        <button className="cursor-pointer bg-transparent border-2 border-white/20 hover:border-white/40 text-white px-6 py-2 rounded-full transition-all">
          Start Reading - Free
        </button>
        </NavLink>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-6 pt-20 pb-32 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Update Developers
        </h1>
        <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-[#ff44ec] via-[#8b5cf6] to-[#3b82f6] text-transparent bg-clip-text">
          About Cutting Edge Technologies
        </h2>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto">
          We know how hard it is to be a developer. It doesn't have to be.
        </p>
        <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-3xl mx-auto">
          Personalized news feed, dev communities and search, much better than what's out there. Maybe ;)
        </p>

        <NavLink to={'/auth/register'}>
        <button className="cursor-pointer bg-gradient-to-r from-[#9333ea] to-[#7c3aed] hover:from-[#8b5cf6] hover:to-[#6d28d9] text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105">
          Start Reading - Free
        </button>
        </NavLink>
      </main>

      {/* Bottom Section */}
      <div className="bg-[#1e2227] py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                The world's best developer platform for{' '}
                <span className="bg-gradient-to-r from-[#6366f1] to-[#3b82f6] text-transparent bg-clip-text">
                  staying up to date
                </span>
              </h3>
              
              {/* Tech Logos */}
              <div className="flex flex-wrap gap-8 mt-8 opacity-60">
                <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" className="h-8 invert" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="h-8 invert" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" alt="AWS" className="h-8 invert" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" alt="Microsoft" className="h-8 invert" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" alt="Meta" className="h-8 invert" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-xl text-gray-300">Trusted by</p>
                <p className="text-3xl font-bold">1,000,000+ <span className="text-gray-400">Developer</span></p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-[#f97316] to-[#ea580c] p-4 rounded-lg">
                  <p className="font-semibold">Product The Year</p>
                  <p className="text-xl font-bold">2K24</p>
                </div>
                <div className="bg-[#2d333b] p-4 rounded-lg flex items-center space-x-3">
                  <Github className="h-6 w-6" />
                  <div>
                    <p className="font-bold">1M+</p>
                    <p className="text-sm text-gray-400">Github Downloads</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;