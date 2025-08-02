'use client';

import React, { useState } from 'react';
import { ArrowUpDown, Settings, RefreshCw } from 'lucide-react';

const SwapInterface: React.FC = () => {
  const [fromToken, setFromToken] = useState('ETH');
  const [toToken, setToToken] = useState('USDC');
  const [fromAmount, setFromAmount] = useState('1.0');
  const [toAmount, setToAmount] = useState('2,543.21');
  const [isSwapping, setIsSwapping] = useState(false);

  const handleSwapTokens = () => {
    setIsSwapping(true);
    setTimeout(() => {
      const tempToken = fromToken;
      const tempAmount = fromAmount;
      setFromToken(toToken);
      setToToken(tempToken);
      setFromAmount(toAmount);
      setToAmount(tempAmount);
      setIsSwapping(false);
    }, 500);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-[#0A0E13]/80 backdrop-blur-xl border border-[#8033ff]/30 rounded-2xl p-6 relative overflow-hidden hover-scale glow-purple transition-all duration-300">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#8033ff]/10 to-[#00FFE0]/10 rounded-2xl"></div>
        
        <div className="relative z-10">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-white gradient-text">Swap Tokens</h3>
            <div className="flex space-x-2">
              <button className="p-2 text-gray-400 hover:text-[#8033ff] transition-colors">
                <RefreshCw className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-400 hover:text-[#8033ff] transition-colors">
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* From Token */}
          <div className="bg-[#0A0E13]/60 rounded-xl p-4 mb-2">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-400 text-sm">You pay</span>
              <span className="text-gray-400 text-sm">Balance: 2.54 MAX</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 bg-[#8033ff]/20 rounded-lg px-3 py-2">
                <div className="w-6 h-6 bg-gradient-to-r from-[#8033ff] to-[#00FFE0] rounded-full"></div>
                <span className="text-white font-medium">{fromToken}</span>
              </div>
              <input
                type="text"
                value={fromAmount}
                onChange={(e) => setFromAmount(e.target.value)}
                className="flex-1 bg-transparent text-white text-xl font-bold text-right outline-none"
                placeholder="0.0"
              />
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center my-4">
            <button
              onClick={handleSwapTokens}
              className="p-2 bg-[#8033ff]/20 hover:bg-[#8033ff]/30 rounded-full transition-all duration-200 hover:scale-110"
            >
              <ArrowUpDown className="w-4 h-4 text-[#8033ff]" />
            </button>
          </div>

          {/* To Token */}
          <div className="bg-[#0A0E13]/60 rounded-xl p-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-400 text-sm">You receive</span>
              <span className="text-gray-400 text-sm">Balance: 6,003.11</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 bg-[#00FFE0]/20 rounded-lg px-3 py-2">
                <div className="w-6 h-6 bg-gradient-to-r from-[#00FFE0] to-[#FF00A8] rounded-full"></div>
                <span className="text-white font-medium">{toToken}</span>
              </div>
              <input
                type="text"
                value={toAmount}
                onChange={(e) => setToAmount(e.target.value)}
                className="flex-1 bg-transparent text-white text-xl font-bold text-right outline-none"
                placeholder="0.0"
                readOnly
              />
            </div>
          </div>

          {/* Swap Details */}
          <div className="space-y-2 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">1 ETH = 2,543.21 USDC</span>
              <span className="text-[#32CD32]">Free</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Price Impact</span>
              <span className="text-[#32CD32]">0.1%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Network Fee</span>
              <span className="text-white">~$12.50</span>
            </div>
          </div>

          {/* Swap Button */}
          <button 
            onClick={() => {
              setIsSwapping(true);
              setTimeout(() => setIsSwapping(false), 2000);
            }}
            disabled={isSwapping}
            className={`w-full bg-gradient-to-r from-[#8033ff] to-[#00FFE0] text-white font-bold py-4 rounded-xl transition-all duration-200 transform ${
              isSwapping 
                ? 'opacity-75 cursor-not-allowed' 
                : 'hover:shadow-lg hover:shadow-[#8033ff]/25 hover:scale-[1.02]'
            }`}
          >
            {isSwapping ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Swapping...</span>
              </div>
            ) : (
              'Swap Tokens'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SwapInterface;