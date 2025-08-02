'use client';

import React from 'react';
import { Shield, TrendingUp, Clock, Star } from 'lucide-react';

const LendingProtocols: React.FC = () => {
  const protocols = [
    {
      name: 'Aave',
      apy: '8.45%',
      risk: 'Low',
      tvl: '$12.3B',
      recommended: true,
      logo: '🅰️',
      color: 'from-[#8033ff] to-[#00FFE0]',
    },
    {
      name: 'Compound',
      apy: '7.89%',
      risk: 'Low',
      tvl: '$8.7B',
      recommended: false,
      logo: '🔴',
      color: 'from-[#00FFE0] to-[#FF00A8]',
    },
    {
      name: 'Maker',
      apy: '6.23%',
      risk: 'Very Low',
      tvl: '$15.2B',
      recommended: false,
      logo: '🟢',
      color: 'from-[#FF00A8] to-[#8033ff]',
    },
    {
      name: 'Yearn',
      apy: '12.67%',
      risk: 'Medium',
      tvl: '$2.8B',
      recommended: false,
      logo: '💙',
      color: 'from-[#8033ff] to-[#FF00A8]',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2 gradient-text">Lending Opportunities</h2>
        <p className="text-gray-400">Optimized suggestions based on your DeFi Insight Score</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {protocols.map((protocol, index) => (
          <div
            key={index}
            className={`bg-[#0A0E13]/80 backdrop-blur-xl border ${
              protocol.recommended ? 'border-[#8033ff] shadow-lg shadow-[#8033ff]/25' : 'border-[#8033ff]/30'
            } rounded-2xl p-6 relative overflow-hidden transition-all duration-300 hover:scale-[1.02]`}
          >
            {/* Background glow */}
            <div className={`absolute inset-0 bg-gradient-to-br ${protocol.color} opacity-5 rounded-2xl`}></div>
            
            {/* Recommended badge */}
            {protocol.recommended && (
              <div className="absolute top-4 right-4 bg-gradient-to-r from-[#8033ff] to-[#00FFE0] text-white text-xs font-bold px-3 py-1 rounded-full flex items-center space-x-1">
                <Star className="w-3 h-3" />
                <span>Recommended</span>
              </div>
            )}
            
            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-4">
                <div className="text-2xl">{protocol.logo}</div>
                <div>
                  <h3 className="text-xl font-bold text-white">{protocol.name}</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <Shield className="w-3 h-3" />
                    <span>{protocol.risk} Risk</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#32CD32] mb-1">{protocol.apy}</div>
                  <div className="text-sm text-gray-400 flex items-center justify-center space-x-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>APY</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">{protocol.tvl}</div>
                  <div className="text-sm text-gray-400 flex items-center justify-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>TVL</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Collateral Ratio</span>
                  <span className="text-white">75%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Liquidation Fee</span>
                  <span className="text-white">12.5%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Minimum Deposit</span>
                  <span className="text-white">0.1 ETH</span>
                </div>
              </div>

              <button className={`w-full mt-6 bg-gradient-to-r ${protocol.color} text-white font-bold py-3 rounded-xl hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02]`}>
                Lend Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LendingProtocols;