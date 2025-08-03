'use client'

import React, { useState } from 'react';
import { TrendingUp, Clock, Target, Settings, Plus, Minus } from 'lucide-react';

const LimitOrderInterface: React.FC = () => {
  const [orderType, setOrderType] = useState<'buy' | 'sell'>('buy');
  const [fromToken, setFromToken] = useState('USDC');
  const [toToken, setToToken] = useState('ETH');
  const [amount, setAmount] = useState('');
  const [limitPrice, setLimitPrice] = useState('');
  const [expiry, setExpiry] = useState('1d');

  const tokens = [
    { symbol: 'ETH', name: 'Ethereum', price: '$2,450', balance: '5.2341' },
    { symbol: 'USDC', name: 'USD Coin', price: '$1.00', balance: '12,450.50' },
    { symbol: 'BTC', name: 'Bitcoin', price: '$43,250', balance: '0.1592' },
    { symbol: 'AAVE', name: 'Aave', price: '$275.80', balance: '10.0' },
    { symbol: 'UNI', name: 'Uniswap', price: '$13.45', balance: '102.7' },
  ];

  const activeOrders = [
    {
      id: 1,
      type: 'buy',
      fromToken: 'USDC',
      toToken: 'ETH',
      amount: '1000',
      limitPrice: '2400',
      currentPrice: '2450',
      filled: '0%',
      expiry: '2d 14h',
      status: 'active'
    },
    {
      id: 2,
      type: 'sell',
      fromToken: 'ETH',
      toToken: 'USDC',
      amount: '0.5',
      limitPrice: '2500',
      currentPrice: '2450',
      filled: '25%',
      expiry: '1d 8h',
      status: 'partial'
    },
    {
      id: 3,
      type: 'buy',
      fromToken: 'USDC',
      toToken: 'AAVE',
      amount: '500',
      limitPrice: '250',
      currentPrice: '275.80',
      filled: '100%',
      expiry: 'Completed',
      status: 'completed'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-blue-400 bg-blue-500/20';
      case 'partial': return 'text-yellow-400 bg-yellow-500/20';
      case 'completed': return 'text-green-400 bg-green-500/20';
      case 'expired': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Create Limit Order */}
      <div className="dashboard-card glow-purple max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Target className="w-6 h-6 text-purple-400" />
            </div>
            <h2 className="text-xl font-semibold text-white">Create Limit Order</h2>
          </div>
          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200">
            <Settings className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Order Type Toggle */}
        <div className="flex items-center space-x-2 mb-6 bg-white/5 rounded-lg p-1">
          <button
            onClick={() => setOrderType('buy')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
              orderType === 'buy'
                ? 'bg-green-500/20 text-green-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Buy Order
          </button>
          <button
            onClick={() => setOrderType('sell')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
              orderType === 'sell'
                ? 'bg-red-500/20 text-red-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Sell Order
          </button>
        </div>

        <div className="space-y-4">
          {/* From Token */}
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-400">
                {orderType === 'buy' ? 'Pay with' : 'Sell'}
              </span>
              <span className="text-sm text-gray-400">
                Balance: {tokens.find(t => t.symbol === fromToken)?.balance}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.0"
                className="flex-1 bg-transparent text-2xl font-semibold text-white placeholder-gray-500 outline-none"
              />
              <select
                value={fromToken}
                onChange={(e) => setFromToken(e.target.value)}
                className="bg-white/10 text-white px-3 py-2 rounded-lg outline-none cursor-pointer"
              >
                {tokens.map((token) => (
                  <option key={token.symbol} value={token.symbol} className="bg-gray-800">
                    {token.symbol}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* To Token */}
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-400">
                {orderType === 'buy' ? 'Buy' : 'Receive'}
              </span>
              <span className="text-sm text-gray-400">
                Current: {tokens.find(t => t.symbol === toToken)?.price}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="number"
                value={limitPrice}
                onChange={(e) => setLimitPrice(e.target.value)}
                placeholder="Limit Price"
                className="flex-1 bg-transparent text-2xl font-semibold text-white placeholder-gray-500 outline-none"
              />
              <select
                value={toToken}
                onChange={(e) => setToToken(e.target.value)}
                className="bg-white/10 text-white px-3 py-2 rounded-lg outline-none cursor-pointer"
              >
                {tokens.map((token) => (
                  <option key={token.symbol} value={token.symbol} className="bg-gray-800">
                    {token.symbol}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Expiry Settings */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">Order Expiry</span>
            <div className="flex items-center space-x-2">
              {['1h', '1d', '1w', '1m'].map((time) => (
                <button
                  key={time}
                  onClick={() => setExpiry(time)}
                  className={`px-3 py-1 rounded text-sm transition-all duration-200 ${
                    expiry === time
                      ? 'bg-purple-500/20 text-purple-400'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          {amount && limitPrice && (
            <div className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-xl p-4 border border-purple-500/20">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-400">Order Type</span>
                <span className={`font-semibold ${orderType === 'buy' ? 'text-green-400' : 'text-red-400'}`}>
                  {orderType === 'buy' ? 'Buy' : 'Sell'} {toToken}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-400">Amount</span>
                <span className="text-white">{amount} {fromToken}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Limit Price</span>
                <span className="text-white">{limitPrice} {fromToken}/{toToken}</span>
              </div>
            </div>
          )}

          {/* Create Order Button */}
          <button
            disabled={!amount || !limitPrice}
            className={`w-full py-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
              orderType === 'buy'
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600'
                : 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600'
            } disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white`}
          >
            <Target className="w-5 h-5" />
            <span>{amount && limitPrice ? `Create ${orderType === 'buy' ? 'Buy' : 'Sell'} Order` : 'Enter Details'}</span>
          </button>
        </div>
      </div>

      {/* Active Orders */}
      <div className="dashboard-card glow-cyan">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-cyan-500/20 rounded-lg">
            <Clock className="w-6 h-6 text-cyan-400" />
          </div>
          <h2 className="text-xl font-semibold text-white">Active Orders</h2>
        </div>

        <div className="space-y-4">
          {activeOrders.map((order) => (
            <div key={order.id} className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/8 transition-colors duration-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status === 'active' ? 'Active' : 
                     order.status === 'partial' ? 'Partial' : 
                     order.status === 'completed' ? 'Completed' : 'Expired'}
                  </span>
                  <span className={`text-sm font-semibold ${
                    order.type === 'buy' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {order.type === 'buy' ? 'BUY' : 'SELL'}
                  </span>
                  <span className="text-white font-medium">
                    {order.amount} {order.fromToken} → {order.toToken}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  {order.status === 'active' && (
                    <>
                      <button className="p-1 hover:bg-white/10 rounded transition-colors duration-200">
                        <Plus className="w-4 h-4 text-gray-400" />
                      </button>
                      <button className="p-1 hover:bg-white/10 rounded transition-colors duration-200">
                        <Minus className="w-4 h-4 text-gray-400" />
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-400">Limit Price</p>
                  <p className="text-white font-semibold">${order.limitPrice}</p>
                </div>
                <div>
                  <p className="text-gray-400">Current Price</p>
                  <p className="text-white font-semibold">${order.currentPrice}</p>
                </div>
                <div>
                  <p className="text-gray-400">Filled</p>
                  <p className="text-white font-semibold">{order.filled}</p>
                </div>
                <div>
                  <p className="text-gray-400">Expiry</p>
                  <p className="text-white font-semibold">{order.expiry}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LimitOrderInterface;