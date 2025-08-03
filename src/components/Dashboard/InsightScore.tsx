'use client'

import React from 'react';
import { Brain, TrendingUp, Shield, Zap } from 'lucide-react';

const InsightScore: React.FC = () => {
  const score = 87;
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const insights = [
    {
      icon: TrendingUp,
      title: 'Portfolio Growth',
      value: '+24.5%',
      color: 'text-green-400',
      bgColor: 'bg-green-500/20',
    },
    {
      icon: Shield,
      title: 'Risk Score',
      value: 'Low',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20',
    },
    {
      icon: Zap,
      title: 'Yield Potential',
      value: '12.8%',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/20',
    },
  ];

  return (
    <div className="dashboard-card glow-purple">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-500/20 rounded-lg">
            <Brain className="w-6 h-6 text-purple-400" />
          </div>
          <h2 className="text-xl font-semibold text-white">AI Insight Score</h2>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row items-center justify-between space-y-8 xl:space-y-0 xl:space-x-12">
        {/* Circular Progress */}
        <div className="relative flex items-center justify-center flex-shrink-0">
          <svg className="progress-ring w-40 h-40" viewBox="0 0 180 180">
            <circle
              cx="90"
              cy="90"
              r={radius}
              stroke="rgba(128, 51, 255, 0.2)"
              strokeWidth="10"
              fill="transparent"
            />
            <circle
              cx="90"
              cy="90"
              r={radius}
              stroke="url(#gradient)"
              strokeWidth="10"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="progress-ring-circle"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8033ff" />
                <stop offset="50%" stopColor="#00FFE0" />
                <stop offset="100%" stopColor="#FF00A8" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold cosmic-text-gradient">{score}</span>
            <span className="text-base text-gray-400">Score</span>
          </div>
        </div>

        {/* Insights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 flex-1 w-full">
          {insights.map((insight, index) => {
            const Icon = insight.icon;
            return (
              <div
                key={index}
                className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200"
              >
                <div className={`p-3 ${insight.bgColor} rounded-xl`}>
                  <Icon className={`w-6 h-6 ${insight.color}`} />
                </div>
                <div>
                  <p className="text-base text-gray-400 mb-1">{insight.title}</p>
                  <p className={`text-lg font-bold ${insight.color}`}>{insight.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-10 p-6 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-xl border border-purple-500/20">
        <p className="text-base text-gray-300 leading-relaxed">
          <span className="font-semibold text-purple-400">AI Recommendation:</span> Consider
          increasing your DeFi exposure by 15% to optimize yield while maintaining your risk
          profile.
        </p>
      </div>
    </div>
  );
};

export default InsightScore;