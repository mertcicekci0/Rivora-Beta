import React from 'react';
import { TrendingUp, Shield, Zap } from 'lucide-react';

const InsightScore: React.FC = () => {
  const score = 78;
  const circumference = 2 * Math.PI * 45;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-[#0A0E13]/80 backdrop-blur-xl border border-[#8033ff]/30 rounded-2xl p-8 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#8033ff]/10 to-[#00FFE0]/10 rounded-2xl"></div>
      
      <div className="relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">DeFi Insight Score</h2>
          <p className="text-gray-400">Your personalized DeFi performance metric</p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="relative w-48 h-48">
            {/* Outer glow ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#8033ff] to-[#00FFE0] opacity-20 blur-md"></div>
            
            {/* Main circle */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#1a1a2e"
                strokeWidth="6"
              />
              
              {/* Progress circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-1000 ease-out"
              />
              
              {/* Gradient definition */}
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8033ff" />
                  <stop offset="50%" stopColor="#00FFE0" />
                  <stop offset="100%" stopColor="#FF00A8" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Score display */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-1">{score}</div>
                <div className="text-sm text-gray-400">out of 100</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-[#8033ff] to-[#00FFE0] rounded-full flex items-center justify-center mx-auto mb-2">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div className="text-sm text-gray-400">Performance</div>
            <div className="text-lg font-bold text-white">Excellent</div>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-[#00FFE0] to-[#FF00A8] rounded-full flex items-center justify-center mx-auto mb-2">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div className="text-sm text-gray-400">Risk Level</div>
            <div className="text-lg font-bold text-white">Moderate</div>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-[#FF00A8] to-[#8033ff] rounded-full flex items-center justify-center mx-auto mb-2">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div className="text-sm text-gray-400">Efficiency</div>
            <div className="text-lg font-bold text-white">High</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightScore;