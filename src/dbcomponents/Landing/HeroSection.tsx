import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onConnectWallet: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onConnectWallet }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Sci-Fi Cosmic Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1408 792'%3E%3Cdefs%3E%3CradialGradient id='planet' cx='0.3' cy='0.3'%3E%3Cstop offset='0%25' stop-color='%23ff00a8'/%3E%3Cstop offset='100%25' stop-color='%23000'/%3E%3C/radialGradient%3E%3ClinearGradient id='sky' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0%25' stop-color='%231a0d2e'/%3E%3Cstop offset='50%25' stop-color='%232d1b4e'/%3E%3Cstop offset='100%25' stop-color='%230a0a1a'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23sky)'/%3E%3Ccircle cx='300' cy='200' r='80' fill='url(%23planet)' opacity='0.8'/%3E%3Cpath d='M200 600 Q400 500 600 600 Q800 700 1000 600 Q1200 500 1400 600 L1400 792 L0 792 Z' fill='%23162447' opacity='0.6'/%3E%3Cpath d='M0 650 Q200 550 400 650 Q600 750 800 650 Q1000 550 1200 650 Q1300 700 1408 650 L1408 792 L0 792 Z' fill='%231e3a5f' opacity='0.4'/%3E%3Cg opacity='0.6'%3E%3Cpath d='M1100 400 L1120 420 L1140 400 L1160 420 L1180 400' stroke='%2300ffe0' stroke-width='2' fill='none'/%3E%3Ccircle cx='1150' cy='450' r='15' fill='%2300ffe0' opacity='0.8'/%3E%3Cpath d='M1130 470 Q1150 460 1170 470' stroke='%23ff00a8' stroke-width='1' fill='none'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
        }}
      >
        {/* Gradient overlay for text readability - stronger on left, transparent on right */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 via-black/30 to-transparent"></div>
        
        {/* Additional cosmic atmosphere overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-blue-900/30"></div>
        
        {/* Subtle neon glow effect */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-purple-500/5 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Left side - Content */}
          <div className="text-left lg:text-left">
          <div className="text-left lg:text-left">
        {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-[#8033ff]/30 backdrop-blur-md border border-[#8033ff]/60 rounded-full px-4 py-2 mb-8 shadow-2xl">
          <Sparkles className="w-4 h-4 text-[#8033ff]" />
              <span className="text-[#00FFE0] text-sm font-medium">AI-Powered DeFi Intelligence</span>
        </div>

        {/* Main headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              <span className="drop-shadow-2xl">One-stop access</span>
              <br />
              <span className="gradient-text drop-shadow-2xl">to decentralized finance</span>
        </h1>

        {/* Subtitle */}
            <p className="text-lg md:text-xl text-gray-200 mb-12 max-w-2xl leading-relaxed drop-shadow-xl">
              Experience the future of DeFi with our AI-powered Insight Score. 
              Swap, lend, and manage your portfolio with unprecedented intelligence and security.
        </p>

        {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <button
            onClick={onConnectWallet}
              className="group bg-gradient-to-r from-[#8033ff] to-[#00FFE0] text-white font-bold px-8 py-4 rounded-xl text-lg hover:shadow-2xl hover:shadow-[#8033ff]/60 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 backdrop-blur-md border border-white/30"
          >
            <span>Connect Wallet</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
              <button className="border border-white/40 text-white font-medium px-8 py-4 rounded-xl text-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-md shadow-xl">
            Learn More
          </button>
        </div>

        {/* Stats */}
            <div className="grid grid-cols-2 gap-8 max-w-lg">
          <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white mb-2 drop-shadow-xl">$2.1B+</div>
                <div className="text-gray-300 text-sm drop-shadow-lg">Total Volume</div>
          </div>
          <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white mb-2 drop-shadow-xl">150K+</div>
                <div className="text-gray-300 text-sm drop-shadow-lg">Active Users</div>
          </div>
          <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white mb-2 drop-shadow-xl">99.9%</div>
                <div className="text-2xl md:text-3xl font-bold text-white mb-2 drop-shadow-xl">$2.1B+</div>
                <div className="text-gray-300 text-sm drop-shadow-lg">Total Volume</div>
          <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white mb-2 drop-shadow-xl">24/7</div>
                <div className="text-2xl md:text-3xl font-bold text-white mb-2 drop-shadow-xl">150K+</div>
                <div className="text-gray-300 text-sm drop-shadow-lg">Active Users</div>
            </div>
          </div>
                <div className="text-2xl md:text-3xl font-bold text-white mb-2 drop-shadow-xl">99.9%</div>
                <div className="text-gray-300 text-sm drop-shadow-lg">Uptime</div>
          <div className="hidden lg:block relative">
            {/* This space is intentionally left for the background image's unicorn */}
                <div className="text-2xl md:text-3xl font-bold text-white mb-2 drop-shadow-xl">24/7</div>
                <div className="text-gray-300 text-sm drop-shadow-lg">Support</div>
            </div>
            </div>
          </div>
          
          {/* Right side - Visual space for the cosmic unicorn scene */}
          <div className="hidden lg:block relative">
            {/* This space is intentionally left for the background image's unicorn */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <div className="text-6xl animate-pulse">🦄</div>
          </div>
        </div>
        </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-8 animate-bounce">
        <div className="w-6 h-10 border-2 border-[#00FFE0]/60 rounded-full flex justify-center backdrop-blur-sm">
          <div className="w-1 h-3 bg-[#00FFE0] rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;