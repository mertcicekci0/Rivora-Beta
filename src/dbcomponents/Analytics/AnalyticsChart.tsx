import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const AnalyticsChart: React.FC = () => {
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
        <div className="bg-[#0A0E13]/90 backdrop-blur-xl border border-[#8033ff]/30 rounded-lg p-3">
          <p className="text-white font-medium">{label}</p>
          <p className="text-[#8033ff]">
            Portfolio: ${payload[0].value.toLocaleString()}
          </p>
          <p className="text-[#00FFE0]">
            Volume: ${payload[1]?.value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-[#0A0E13]/80 backdrop-blur-xl border border-[#8033ff]/30 rounded-2xl p-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-white mb-2">Portfolio Performance</h3>
        <div className="flex items-center space-x-4">
          <div className="text-3xl font-bold text-white">$72,450</div>
          <div className="text-[#32CD32] text-sm font-medium">+18.7%</div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8033ff" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#8033ff" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis 
            dataKey="date" 
            stroke="#666" 
            fontSize={12}
          />
          <YAxis 
            stroke="#666" 
            fontSize={12}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#8033ff"
            fillOpacity={1}
            fill="url(#colorValue)"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="volume"
            stroke="#00FFE0"
            strokeWidth={2}
            dot={{ fill: '#00FFE0', strokeWidth: 2, r: 4 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnalyticsChart;