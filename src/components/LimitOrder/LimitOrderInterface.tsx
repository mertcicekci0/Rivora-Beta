'use client'

import React, { useState, useEffect } from 'react';
import { TrendingUp, Clock, Target, Settings, Plus, Minus, Shield, Zap, Award, RefreshCw, AlertCircle, X } from 'lucide-react';
import { useAccount } from 'wagmi';
import { useScores } from '../../lib/hooks/useScores';
import { useLimitOrders, getOrderStatus, getOrderProgress, getTimeUntilExpiry, LimitOrder } from '../../lib/hooks/useLimitOrders';

const LimitOrderInterface: React.FC = () => {
  const [orderType, setOrderType] = useState<'buy' | 'sell'>('buy');
  const [fromToken, setFromToken] = useState('USDC');
  const [toToken, setToToken] = useState('ETH');
  const [amount, setAmount] = useState('');
  const [limitPrice, setLimitPrice] = useState('');
  const [expiry, setExpiry] = useState('1d');

  // Get user scores for intelligent recommendations
  const { data: scoreData, isConnected } = useScores();
  const { address } = useAccount();
  
  // Get limit orders data
  const { 
    orders, 
    loading, 
    error, 
    creating, 
    cancelling, 
    createOrder, 
    cancelOrder, 
    refetch 
  } = useLimitOrders();

  // Mock token data - in real app, fetch from token API
  const [tokens, setTokens] = useState([
    { symbol: 'ETH', name: 'Ethereum', price: '$2,450', balance: '5.2341', address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE' },
    { symbol: 'USDC', name: 'USD Coin', price: '$1.00', balance: '12,450.50', address: '0xA0b86a33E6B8e6B9c4b25E1e1E7d2e3F4e5e6e7e' },
    { symbol: 'BTC', name: 'Bitcoin', price: '$43,250', balance: '0.1592', address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599' },
    { symbol: 'AAVE', name: 'Aave', price: '$275.80', balance: '10.0', address: '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9' },
    { symbol: 'UNI', name: 'Uniswap', price: '$13.45', balance: '102.7', address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984' },
  ]);

  // Handle order creation
  const handleCreateOrder = async () => {
    if (!amount || !limitPrice || !isConnected) return;

    try {
      const fromTokenData = tokens.find(t => t.symbol === fromToken);
      const toTokenData = tokens.find(t => t.symbol === toToken);
      
      if (!fromTokenData || !toTokenData) {
        throw new Error('Token not found');
      }

      // Calculate amounts (simplified - in real app, handle decimals properly)
      const makingAmount = (parseFloat(amount) * Math.pow(10, 18)).toString(); // Assuming 18 decimals
      const takingAmount = (parseFloat(amount) * parseFloat(limitPrice) * Math.pow(10, 18)).toString();

      await createOrder({
        makerAsset: fromTokenData.address,
        takerAsset: toTokenData.address,
        makingAmount,
        takingAmount,
        maker: address || '',
        chainId: 1, // Ethereum mainnet
      });

      // Reset form
      setAmount('');
      setLimitPrice('');
      
    } catch (error) {
      console.error('Failed to create order:', error);
    }
  };

  // Handle order cancellation
  const handleCancelOrder = async (orderHash: string) => {
    try {
      await cancelOrder(orderHash);
    } catch (error) {
      console.error('Failed to cancel order:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-blue-400 bg-blue-500/20';
      case 'partial': return 'text-yellow-400 bg-yellow-500/20';
      case 'completed': return 'text-green-400 bg-green-500/20';
      case 'cancelled': return 'text-red-400 bg-red-500/20';
      case 'expired': return 'text-gray-400 bg-gray-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  // Show wallet connection prompt
  if (!isConnected) {
    return (
      <div className="space-y-6">
        <div className="dashboard-card text-center py-12">
          <AlertCircle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Connect Your Wallet</h3>
          <p className="text-gray-400">Please connect your wallet to access limit order functionality.</p>
        </div>
      </div>
    );
  }

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
            onClick={handleCreateOrder}
            disabled={!amount || !limitPrice || creating}
            className={`w-full py-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
              orderType === 'buy'
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600'
                : 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600'
            } disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white`}
          >
            <Target className="w-5 h-5" />
            <span>
              {creating ? 'Creating...' : 
               amount && limitPrice ? `Create ${orderType === 'buy' ? 'Buy' : 'Sell'} Order` : 'Enter Details'}
            </span>
          </button>
        </div>
      </div>

      {/* AI-Powered Recommendations */}
      {scoreData && (
        <div className="dashboard-card glow-purple">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Zap className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">AI Recommendations</h3>
            <div className="flex items-center space-x-1">
              <Shield className="w-4 h-4 text-green-400" />
              <span className="text-xs text-green-400">Risk Score: {scoreData.deFiRiskScore}/100</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg border border-blue-500/20">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-semibold text-blue-400">Price Strategy</span>
              </div>
              <p className="text-xs text-gray-300">
                {scoreData.deFiRiskScore > 70 
                  ? 'Your high risk score qualifies you for tighter spreads. Consider limit orders 2-3% from market price.'
                  : 'Start with conservative limit orders 5-8% from market price to build your trading history.'
                }
              </p>
            </div>

            <div className="p-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/20">
              <div className="flex items-center space-x-2 mb-2">
                <Award className="w-4 h-4 text-green-400" />
                <span className="text-sm font-semibold text-green-400">User Type Bonus</span>
              </div>
              <p className="text-xs text-gray-300">
                As an {scoreData.userType.toLowerCase()}, you get enhanced order matching priority and reduced fees on limit orders.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Active Orders */}
      <div className="dashboard-card glow-cyan">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-cyan-500/20 rounded-lg">
              <Clock className="w-6 h-6 text-cyan-400" />
            </div>
            <h2 className="text-xl font-semibold text-white">Your Limit Orders</h2>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">
              {orders.length} order{orders.length !== 1 ? 's' : ''}
            </span>
            <button
              onClick={refetch}
              disabled={loading}
              className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50"
              title="Refresh orders"
            >
              <RefreshCw className={`w-4 h-4 text-gray-400 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {loading && orders.length === 0 ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse p-4 bg-white/5 rounded-lg">
                <div className="h-4 bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-700 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-2" />
            <p className="text-red-400 mb-4">{error}</p>
            <button onClick={refetch} className="btn-primary">
              Retry
            </button>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-8">
            <Clock className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">No Active Orders</h3>
            <p className="text-gray-400">Create your first limit order to get started with automated trading.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order: LimitOrder) => {
              const status = getOrderStatus(order);
              const progress = getOrderProgress(order);
              const timeLeft = getTimeUntilExpiry(order);
              
              return (
                <div key={order.orderHash} className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/8 transition-colors duration-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${status.color}`}>
                        {status.label}
                      </span>
                      <span className="text-white font-medium">
                        {order.makingAmount} → {order.takingAmount}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {status.status === 'active' && (
                        <button 
                          onClick={() => handleCancelOrder(order.orderHash)}
                          disabled={cancelling === order.orderHash}
                          className="p-1 hover:bg-red-500/20 rounded transition-colors duration-200 text-red-400"
                          title="Cancel order"
                        >
                          {cancelling === order.orderHash ? (
                            <RefreshCw className="w-4 h-4 animate-spin" />
                          ) : (
                            <X className="w-4 h-4" />
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">Making Amount</p>
                      <p className="text-white font-semibold">{order.makingAmount}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Taking Amount</p>
                      <p className="text-white font-semibold">{order.takingAmount}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Progress</p>
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-white/10 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                        <span className="text-white font-semibold text-xs">{progress.toFixed(1)}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-400">Expires</p>
                      <p className="text-white font-semibold">{timeLeft}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default LimitOrderInterface;