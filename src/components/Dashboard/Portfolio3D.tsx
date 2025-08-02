'use client';

import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const Portfolio3D: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const data = [
    { name: 'ETH', value: 45.2, color: '#8b5cf6', amount: '$66,820.267' },
    { name: 'BTC', value: 28.7, color: '#06d6a0', amount: '$42,427.913' },
    { name: 'USDC', value: 15.3, color: '#f72585', amount: '$22,618.365' },
    { name: 'LINK', value: 6.8, color: '#ffd60a', amount: '$10,052.607' },
    { name: 'Others', value: 4.0, color: '#7209b7', amount: '$5,913.298' },
  ];

  const totalValue = 147832.45;

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1a1b2e] border border-[#2a2d47] rounded-lg p-3">
          <p className="text-white font-medium">{payload[0].name}</p>
          <p className="text-[#8b5cf6]">{payload[0].value.toFixed(1)}%</p>
          <p className="text-gray-400">${(totalValue * payload[0].value / 100).toLocaleString()}</p>
        </div>
      );
    }
    return null;
  };

  if (!isClient) {
    return (
      <div className="bg-[#1a1b2e] border border-[#2a2d47] rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#6366f1]/5 to-[#8b5cf6]/5 rounded-2xl"></div>
        <div className="relative z-10">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-white mb-2">Portfolio Overview</h3>
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold text-white">${totalValue.toLocaleString()}</div>
              <div className="text-[#06d6a0] text-sm font-medium">+12.4%</div>
            </div>
          </div>
          <div className="flex items-center justify-center h-48">
            <div className="text-gray-400">Loading chart...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1a1b2e] border border-[#2a2d47] rounded-2xl p-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#6366f1]/5 to-[#8b5cf6]/5 rounded-2xl"></div>
      
      <div className="relative z-10">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-2">Portfolio Overview</h3>
          <div className="flex items-center space-x-4">
            <div className="text-2xl font-bold text-white">${totalValue.toLocaleString()}</div>
            <div className="text-[#06d6a0] text-sm font-medium">+12.4%</div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative flex-shrink-0">
            <div style={{ width: 200, height: 200 }}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color}
                      stroke="none"
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </div>
          </div>

          <div className="flex-1 space-y-3">
            {data.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-white font-medium text-sm">{item.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-white font-semibold text-sm">{item.value}%</div>
                  <div className="text-gray-400 text-xs">{item.amount}</div>
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