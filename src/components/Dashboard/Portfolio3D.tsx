'use client'

import React, { useState } from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip, 
  Legend,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
} from 'recharts';
import { Wallet, TrendingUp, DollarSign, BarChart3, Calendar } from 'lucide-react';

const Portfolio3D: React.FC = () => {
  const [timeframe, setTimeframe] = useState('7D');
  const [chartType, setChartType] = useState('area');

  const portfolioData = [
    { name: 'ETH', value: 45, color: '#627EEA', amount: '$12,450' },
    { name: 'BTC', value: 25, color: '#F7931A', amount: '$6,890' },
    { name: 'USDC', value: 15, color: '#2775CA', amount: '$4,120' },
    { name: 'AAVE', value: 10, color: '#B6509E', amount: '$2,750' },
    { name: 'UNI', value: 5, color: '#FF007A', amount: '$1,380' },
  ];

  const performanceData = [
    { date: '2024-01-01', value: 24500, volume: 1200 },
    { date: '2024-01-02', value: 25200, volume: 1350 },
    { date: '2024-01-03', value: 24800, volume: 1100 },
    { date: '2024-01-04', value: 26100, volume: 1450 },
    { date: '2024-01-05', value: 27300, volume: 1600 },
    { date: '2024-01-06', value: 26800, volume: 1380 },
    { date: '2024-01-07', value: 27590, volume: 1520 },
  ];

  const timeframes = ['1D', '7D', '1M', '3M', '1Y'];

  const totalValue = '$27,590';
  const dailyChange = '+$1,245';
  const dailyChangePercent = '+4.7%';

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="glassmorphism p-3 border border-white/20">
          <p className="text-white font-semibold">{data.name}</p>
          <p className="text-gray-300">{data.amount || `$${data.value?.toLocaleString()}`}</p>
          <p className="text-gray-400">{data.value}%</p>
        </div>
      );
    }
    return null;
  };

  const PerformanceTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glassmorphism p-4 border border-white/20">
          <p className="text-white font-semibold mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-gray-300">
              {entry.name}: <span className="text-white font-semibold">${entry.value.toLocaleString()}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };
  return (
    <div className="space-y-6">
      {/* Portfolio Overview */}
      <div className="dashboard-card glow-cyan">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-cyan-500/20 rounded-lg">
              <Wallet className="w-6 h-6 text-cyan-400" />
            </div>
            <h2 className="text-xl font-semibold text-white">Portfolio Overview</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Portfolio Stats */}
          <div className="space-y-4">
            <div className="text-center lg:text-left">
              <p className="text-sm text-gray-400 mb-1">Total Portfolio Value</p>
              <p className="text-3xl font-bold text-white">{totalValue}</p>
              <div className="flex items-center justify-center lg:justify-start space-x-2 mt-2">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="text-green-400 font-semibold">{dailyChange}</span>
                <span className="text-green-400">({dailyChangePercent})</span>
              </div>
            </div>

            {/* Asset Breakdown */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white mb-3">Asset Breakdown</h3>
              {portfolioData.map((asset, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: asset.color }}
                    ></div>
                    <span className="text-white font-medium">{asset.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-semibold">{asset.amount}</p>
                    <p className="text-gray-400 text-sm">{asset.value}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3D Pie Chart */}
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={portfolioData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  innerRadius={40}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {portfolioData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center space-x-2 p-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 rounded-lg transition-all duration-200">
            <DollarSign className="w-4 h-4 text-cyan-400" />
            <span className="text-white font-medium">Add Funds</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 rounded-lg transition-all duration-200">
            <TrendingUp className="w-4 h-4 text-purple-400" />
            <span className="text-white font-medium">Rebalance</span>
          </button>
        </div>
      </div>

      {/* Performance Analytics */}
      <div className="dashboard-card glow-pink">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-pink-500/20 rounded-lg">
              <BarChart3 className="w-6 h-6 text-pink-400" />
            </div>
            <h2 className="text-xl font-semibold text-white">Performance Analytics</h2>
          </div>

          <div className="flex items-center space-x-4">
            {/* Chart Type Toggle */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setChartType('area')}
                className={`px-3 py-1 rounded-lg text-sm transition-all duration-200 ${
                  chartType === 'area'
                    ? 'bg-pink-500/20 text-pink-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Area
              </button>
              <button
                onClick={() => setChartType('line')}
                className={`px-3 py-1 rounded-lg text-sm transition-all duration-200 ${
                  chartType === 'line'
                    ? 'bg-pink-500/20 text-pink-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Line
              </button>
            </div>

            {/* Timeframe Selector */}
            <div className="flex items-center space-x-1 bg-white/5 rounded-lg p-1">
              {timeframes.map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-3 py-1 rounded-md text-sm transition-all duration-200 ${
                    timeframe === tf
                      ? 'bg-pink-500/20 text-pink-400'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="text-center sm:text-left">
            <p className="text-sm text-gray-400">Current Value</p>
            <p className="text-2xl font-bold text-white">$27,590</p>
          </div>
          <div className="text-center sm:text-left">
            <p className="text-sm text-gray-400">24h Change</p>
            <div className="flex items-center justify-center sm:justify-start space-x-1">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <p className="text-xl font-bold text-green-400">+4.7%</p>
            </div>
          </div>
          <div className="text-center sm:text-left">
            <p className="text-sm text-gray-400">Volume</p>
            <p className="text-2xl font-bold text-white">$1,520</p>
          </div>
        </div>

        {/* Chart */}
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'area' ? (
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF00A8" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#FF00A8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9CA3AF', fontSize: 12 }}
                  tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9CA3AF', fontSize: 12 }}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<PerformanceTooltip />} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#FF00A8"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorValue)"
                />
              </AreaChart>
            ) : (
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9CA3AF', fontSize: 12 }}
                  tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9CA3AF', fontSize: 12 }}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<PerformanceTooltip />} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#FF00A8"
                  strokeWidth={3}
                  dot={{ fill: '#FF00A8', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#FF00A8', strokeWidth: 2 }}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Portfolio3D;