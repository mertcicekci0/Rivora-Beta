'use client'

import React from 'react';
import { Shield, Heart, User, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

const ScoresOverview: React.FC = () => {
  const scores = [
    {
      id: 'defi-risk',
      title: 'DeFi Risk Score',
      subtitle: 'Rivora Trust Index',
      score: 87,
      maxScore: 100,
      color: 'from-blue-500 to-cyan-400',
      icon: Shield,
      description: 'Security-focused user score - transaction history and contract security analysis',
      status: 'excellent',
      details: [
        { label: 'Wallet Activity Age', value: '2.3 years', status: 'good' },
        { label: 'Transaction Frequency', value: 'Regular', status: 'good' },
        { label: 'Safe Protocol Usage', value: '94%', status: 'excellent' },
        { label: 'Average Token Age', value: '8.2 months', status: 'good' },
      ]
    },
    {
      id: 'health',
      title: 'DeFi Health Score',
      subtitle: 'Portfolio Health Score',
      score: 73,
      maxScore: 100,
      color: 'from-green-500 to-emerald-400',
      icon: Heart,
      description: 'Portfolio diversification, sustainability and risk distribution analysis',
      status: 'good',
      details: [
        { label: 'Token Diversity', value: '12 different tokens', status: 'excellent' },
        { label: 'Volatility Balance', value: 'Medium', status: 'good' },
        { label: 'Gas Optimization', value: '68%', status: 'warning' },
        { label: 'Liquidity Status', value: 'High', status: 'excellent' },
      ]
    },
    {
      id: 'user-type',
      title: 'User Type Score',
      subtitle: 'Behavioral Analysis',
      score: 92,
      maxScore: 100,
      color: 'from-purple-500 to-pink-400',
      icon: User,
      description: 'Transaction behaviors and personalized experience optimization',
      status: 'excellent',
      details: [
        { label: 'User Type', value: 'Optimizer', status: 'excellent' },
        { label: 'Swap Frequency', value: 'High', status: 'good' },
        { label: 'Limit Order Usage', value: '85%', status: 'excellent' },
        { label: 'Arbitrage Opportunities', value: 'Active', status: 'excellent' },
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-400';
      case 'good': return 'text-blue-400';
      case 'warning': return 'text-yellow-400';
      case 'danger': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent': return CheckCircle;
      case 'good': return CheckCircle;
      case 'warning': return AlertTriangle;
      case 'danger': return AlertTriangle;
      default: return CheckCircle;
    }
  };

  const calculateProgress = (score: number, maxScore: number) => {
    return (score / maxScore) * 100;
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {scores.map((scoreData) => {
          const Icon = scoreData.icon;
          const progress = calculateProgress(scoreData.score, scoreData.maxScore);
          
          return (
            <div key={scoreData.id} className="dashboard-card glow-purple">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <Icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{scoreData.title}</h3>
                    <p className="text-sm text-gray-400">{scoreData.subtitle}</p>
                  </div>
                </div>
              </div>

              {/* Score Circle */}
              <div className="flex items-center justify-center mb-4">
                <div className="relative w-24 h-24">
                  <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="8"
                      fill="transparent"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="url(#gradient-${scoreData.id})"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={`${progress * 2.51} 251`}
                      strokeLinecap="round"
                      className="transition-all duration-1000 ease-out"
                    />
                    <defs>
                      <linearGradient id={`gradient-${scoreData.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#8033ff" />
                        <stop offset="50%" stopColor="#00FFE0" />
                        <stop offset="100%" stopColor="#FF00A8" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-white">{scoreData.score}</span>
                    <span className="text-xs text-gray-400">/{scoreData.maxScore}</span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-300 text-center mb-4">
                {scoreData.description}
              </p>

              <div className={`text-center p-2 rounded-lg bg-gradient-to-r ${scoreData.color} bg-opacity-20`}>
                <span className={`text-sm font-semibold ${getStatusColor(scoreData.status)}`}>
                  {scoreData.status === 'excellent' ? 'Excellent' : 
                   scoreData.status === 'good' ? 'Good' : 
                   scoreData.status === 'warning' ? 'Warning' : 'Risk'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Analysis */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {scores.map((scoreData) => {
          const StatusIcon = getStatusIcon(scoreData.status);
          
          return (
            <div key={`${scoreData.id}-details`} className="dashboard-card">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-white/5 rounded-lg">
                  <scoreData.icon className="w-5 h-5 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">{scoreData.title} Details</h3>
              </div>

              <div className="space-y-3">
                {scoreData.details.map((detail, index) => {
                  const DetailStatusIcon = getStatusIcon(detail.status);
                  return (
                    <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <DetailStatusIcon className={`w-4 h-4 ${getStatusColor(detail.status)}`} />
                        <span className="text-sm text-gray-300">{detail.label}</span>
                      </div>
                      <span className={`text-sm font-semibold ${getStatusColor(detail.status)}`}>
                        {detail.value}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Recommendations */}
      <div className="dashboard-card glow-cyan">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-cyan-500/20 rounded-lg">
            <TrendingUp className="w-6 h-6 text-cyan-400" />
          </div>
          <h2 className="text-xl font-semibold text-white">Personalized Recommendations</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/20">
            <div className="flex items-center space-x-2 mb-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-sm font-semibold text-green-400">Security Recommendation</span>
            </div>
            <p className="text-sm text-gray-300">
              With your high trust score, you can access premium swap features.
            </p>
          </div>

          <div className="p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg border border-yellow-500/20">
            <div className="flex items-center space-x-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-semibold text-yellow-400">Gas Optimization</span>
            </div>
            <p className="text-sm text-gray-300">
              Increase your Fusion+ usage to reduce gas costs by 25%.
            </p>
          </div>

          <div className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20">
            <div className="flex items-center space-x-2 mb-2">
              <User className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-semibold text-purple-400">Optimizer Profile</span>
            </div>
            <p className="text-sm text-gray-300">
              Special notifications for arbitrage opportunities and limit order recommendations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoresOverview;