'use client';

import React from 'react';
import { TrendingUp, Shield, Zap } from 'lucide-react';

const InsightScore: React.FC = () => {
  const score = 78;
  const circumference = 2 * Math.PI * 45;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-[#1a1b2e] border border-[#2a2d47] rounded-2xl p-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#6366f1]/5 to-[#8b5cf6]/5 rounded-2xl"></div>
      
      <div className="relative z-10">
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-white mb-2">DeFi Insight Score</h2>
          <p className="text-gray-400 text-sm">Your personalized DeFi performance metric</p>
        </div>

        <div className="flex justify-center mb-6">
          <div className="relative w-32 h-32">
            {/* Outer glow ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] opacity-10 blur-sm"></div>
            
            {/* Main circle */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#2a2d47"
                strokeWidth="8"
              />
              
              {/* Progress circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-1000 ease-out"
              />
              
              {/* Gradient definition */}
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#d946ef" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Score display */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">{score}</div>
                <div className="text-xs text-gray-400">out of 100</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-10 h-10 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] rounded-full flex items-center justify-center mx-auto mb-2">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <div className="text-xs text-gray-400">Performance</div>
            <div className="text-sm font-semibold text-white">Excellent</div>
          </div>
          
          <div className="text-center">
            <div className="w-10 h-10 bg-gradient-to-r from-[#8b5cf6] to-[#d946ef] rounded-full flex items-center justify-center mx-auto mb-2">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div className="text-xs text-gray-400">Risk Level</div>
            <div className="text-sm font-semibold text-white">Moderate</div>
          </div>
          
          <div className="text-center">
            <div className="w-10 h-10 bg-gradient-to-r from-[#d946ef] to-[#6366f1] rounded-full flex items-center justify-center mx-auto mb-2">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <div className="text-xs text-gray-400">Efficiency</div>
            <div className="text-sm font-semibold text-white">High</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightScore;