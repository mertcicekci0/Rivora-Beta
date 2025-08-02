'use client';

import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const AnalyticsChart: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const data = [
    { date: '2024-01', value: 45000, volume: 120000 },
    { date: '2024-02', value: 52000, volume: 140000 },
    { date: '2024-03', value: 48000, volume: 110000 },
    { date: '2024-04', value: 61000, volume: 180000 },
    { date: '2024-05', value: 58000, volume: 160000 },
    { date: '2024-06', value: 72000, volume: 200000 },
    { date: '2024-07', value: 68000, volume: 185000 },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1a1b2e] border border-[#2a2d47] rounded-lg p-3">
          <p className="text-white font-medium">{label}</p>
          <p className="text-[#8033ff]">
            Portfolio: ${payload[0].value.toLocaleString()}
          </p>
          <p className="text-[#06d6a0]">
            Volume: ${payload[1]?.value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  if (!isClient) {
    return (
      <div className="bg-[#1a1b2e] border border-[#2a2d47] rounded-2xl p-6">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-2">Portfolio Performance</h3>
          <div className="flex items-center space-x-4">
            <div className="text-2xl font-bold text-white">$72,450</div>
            <div className="text-[#06d6a0] text-sm font-medium">+18.7%</div>
          </div>
        </div>
        <div className="flex items-center justify-center h-48">
          <div className="text-gray-400">Loading chart...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1a1b2e] border border-[#2a2d47] rounded-2xl p-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-white mb-2">Portfolio Performance</h3>
        <div className="flex items-center space-x-4">
          <div className="text-2xl font-bold text-white">$72,450</div>
          <div className="text-[#06d6a0] text-sm font-medium">+18.7%</div>
        </div>
      </div>

      <div style={{ width: '100%', height: 200 }}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2d47" />
          <XAxis 
            dataKey="date" 
            stroke="#6b7280" 
            fontSize={12}
          />
          <YAxis 
            stroke="#6b7280" 
            fontSize={12}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#8b5cf6"
            fillOpacity={1}
            fill="url(#colorValue)"
            strokeWidth={2}
          />
        </AreaChart>
      </div>
    </div>
  );
};

export default AnalyticsChart;