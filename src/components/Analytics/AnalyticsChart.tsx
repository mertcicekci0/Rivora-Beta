'use client'

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const mockData = [
  { name: 'Jan', value: 400, profit: 240 },
  { name: 'Feb', value: 300, profit: 139 },
  { name: 'Mar', value: 600, profit: 980 },
  { name: 'Apr', value: 800, profit: 390 },
  { name: 'May', value: 700, profit: 480 },
  { name: 'Jun', value: 900, profit: 380 },
  { name: 'Jul', value: 1100, profit: 430 },
];

const AnalyticsChart: React.FC = () => {
  return (
    <div className="dashboard-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold cosmic-text-gradient">Portfolio Analytics</h3>
        <div className="flex space-x-2">
          <button className="px-3 py-1 text-sm bg-purple-500/20 text-purple-300 rounded-lg">7D</button>
          <button className="px-3 py-1 text-sm bg-white/5 text-gray-400 rounded-lg">30D</button>
          <button className="px-3 py-1 text-sm bg-white/5 text-gray-400 rounded-lg">90D</button>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={mockData}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
            <XAxis 
              dataKey="name" 
              stroke="#9CA3AF"
              fontSize={12}
            />
            <YAxis 
              stroke="#9CA3AF"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#1F2937',
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#F9FAFB'
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#8B5CF6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorValue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-sm text-gray-400">Total Value</p>
          <p className="text-lg font-bold text-green-400">$12,345</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-400">24h Change</p>
          <p className="text-lg font-bold text-green-400">+5.67%</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-400">APY</p>
          <p className="text-lg font-bold text-purple-400">12.3%</p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsChart;
