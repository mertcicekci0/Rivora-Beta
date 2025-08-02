'use client';

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const Portfolio3D: React.FC = () => {
  const data = [
    { name: 'ETH', value: 45.2, color: '#8033ff' },
    { name: 'BTC', value: 28.7, color: '#00FFE0' },
    { name: 'USDC', value: 15.3, color: '#FF00A8' },
    { name: 'LINK', value: 6.8, color: '#FFA500' },
    { name: 'Others', value: 4.0, color: '#32CD32' },
  ];

  const totalValue = 147832.45;

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#0A0E13]/90 backdrop-blur-xl border border-[#8033ff]/30 rounded-lg p-3">
          <p className="text-white font-medium">{payload[0].name}</p>
          <p className="text-[#8033ff]">{payload[0].value.toFixed(1)}%</p>
          <p className="text-gray-400">${(totalValue * payload[0].value / 100).toLocaleString()}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-[#0A0E13]/80 backdrop-blur-xl border border-[#8033ff]/30 rounded-2xl p-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#8033ff]/5 to-[#00FFE0]/5 rounded-2xl"></div>
      
      <div className="relative z-10">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-white mb-2">Portfolio Overview</h3>
          <div className="flex items-center space-x-4">
            <div className="text-3xl font-bold text-white">${totalValue.toLocaleString()}</div>
            <div className="text-[#32CD32] text-sm font-medium">+12.4%</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="relative">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color}
                      stroke={entry.color}
                      strokeWidth={2}
                      style={{
                        filter: 'drop-shadow(0 0 8px rgba(128, 51, 255, 0.3))',
                      }}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-4">
            {data.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-[#0A0E13]/60 rounded-lg border border-[#8033ff]/10">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-white font-medium">{item.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-white font-bold">{item.value}%</div>
                  <div className="text-gray-400 text-sm">
                    ${(totalValue * item.value / 100).toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio3D;