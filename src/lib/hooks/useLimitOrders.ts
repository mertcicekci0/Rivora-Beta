// Custom hook for limit order operations
'use client'

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';

export interface LimitOrder {
  orderHash: string;
  signature: string;
  makerAsset: string;
  takerAsset: string;
  makingAmount: string;
  takingAmount: string;
  maker: string;
  receiver: string;
  allowedSender: string;
  salt: string;
  auctionStartTime: number;
  auctionEndTime: number;
  makingAmountIncrease: string;
  takingAmountIncrease: string;
  status: number;
  filledTakingAmount: string;
  remainingMakingAmount: string;
  createdAt: string;
}

export interface CreateOrderData {
  makerAsset: string;
  takerAsset: string;
  makingAmount: string;
  takingAmount: string;
  maker: string;
  chainId: number;
  salt?: string;
  receiver?: string;
  allowedSender?: string;
}

export interface LimitOrderState {
  orders: LimitOrder[];
  loading: boolean;
  error: string | null;
  creating: boolean;
  cancelling: string | null; // orderHash being cancelled
}

export function useLimitOrders(chainId: number = 1) {
  const { address, isConnected } = useAccount();
  const [state, setState] = useState<LimitOrderState>({
    orders: [],
    loading: false,
    error: null,
    creating: false,
    cancelling: null,
  });

  // Fetch limit orders
  const fetchOrders = async (type: 'active' | 'all' | 'historical' = 'active') => {
    if (!address || !isConnected) return;

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await fetch(`/api/limit-orders?walletAddress=${address}&chainId=${chainId}&type=${type}&limit=100`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setState(prev => ({
        ...prev,
        orders: data.orders || [],
        loading: false,
        error: null,
      }));

      console.log('✅ Limit orders fetched:', data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch limit orders';
      console.error('❌ Limit orders fetch failed:', errorMessage);
      
      setState(prev => ({
        ...prev,
        orders: [],
        loading: false,
        error: errorMessage,
      }));
    }
  };

  // Create new limit order
  const createOrder = async (orderData: CreateOrderData) => {
    setState(prev => ({ ...prev, creating: true, error: null }));

    try {
      const response = await fetch('/api/limit-orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      setState(prev => ({
        ...prev,
        creating: false,
        error: null,
      }));

      // Refresh orders list
      await fetchOrders();

      console.log('✅ Limit order created:', result);
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create limit order';
      console.error('❌ Limit order creation failed:', errorMessage);
      
      setState(prev => ({
        ...prev,
        creating: false,
        error: errorMessage,
      }));
      throw error;
    }
  };

  // Cancel limit order
  const cancelOrder = async (orderHash: string) => {
    setState(prev => ({ ...prev, cancelling: orderHash, error: null }));

    try {
      const response = await fetch(`/api/limit-orders?orderHash=${orderHash}&chainId=${chainId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      setState(prev => ({
        ...prev,
        cancelling: null,
        error: null,
      }));

      // Refresh orders list
      await fetchOrders();

      console.log('✅ Limit order cancelled:', result);
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to cancel limit order';
      console.error('❌ Limit order cancellation failed:', errorMessage);
      
      setState(prev => ({
        ...prev,
        cancelling: null,
        error: errorMessage,
      }));
      throw error;
    }
  };

  // Auto-fetch when wallet connects
  useEffect(() => {
    if (address && isConnected) {
      fetchOrders();
    } else {
      setState({
        orders: [],
        loading: false,
        error: null,
        creating: false,
        cancelling: null,
      });
    }
  }, [address, isConnected, chainId]);

  return {
    ...state,
    fetchOrders,
    createOrder,
    cancelOrder,
    refetch: () => fetchOrders(),
    isConnected,
    walletAddress: address,
  };
}

// Helper functions for order status
export function getOrderStatus(order: LimitOrder): {
  status: 'active' | 'partial' | 'completed' | 'cancelled' | 'expired';
  label: string;
  color: string;
} {
  switch (order.status) {
    case 1:
      return { status: 'active', label: 'Active', color: 'text-blue-400 bg-blue-500/20' };
    case 2:
      return { status: 'partial', label: 'Partial', color: 'text-yellow-400 bg-yellow-500/20' };
    case 3:
      return { status: 'completed', label: 'Completed', color: 'text-green-400 bg-green-500/20' };
    case 4:
      return { status: 'cancelled', label: 'Cancelled', color: 'text-red-400 bg-red-500/20' };
    case 5:
      return { status: 'expired', label: 'Expired', color: 'text-gray-400 bg-gray-500/20' };
    default:
      return { status: 'active', label: 'Unknown', color: 'text-gray-400 bg-gray-500/20' };
  }
}

// Calculate order progress
export function getOrderProgress(order: LimitOrder): number {
  const filled = parseFloat(order.filledTakingAmount || '0');
  const total = parseFloat(order.takingAmount || '1');
  return total > 0 ? (filled / total) * 100 : 0;
}

// Calculate time until expiry
export function getTimeUntilExpiry(order: LimitOrder): string {
  const now = Math.floor(Date.now() / 1000);
  const expiry = order.auctionEndTime;
  
  if (expiry <= now) return 'Expired';
  
  const diff = expiry - now;
  const days = Math.floor(diff / 86400);
  const hours = Math.floor((diff % 86400) / 3600);
  const minutes = Math.floor((diff % 3600) / 60);
  
  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}
