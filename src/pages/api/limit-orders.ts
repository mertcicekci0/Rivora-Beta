// API Route: /api/limit-orders
// Handles limit order operations

import type { NextApiRequest, NextApiResponse } from 'next';
import { createLimitOrder } from '../../lib/server/limit-order-sdk';

interface CreateOrderRequest {
  makerAsset: string;
  takerAsset: string;
  makingAmount: string;
  takingAmount: string;
  maker: string;
  chainId: number;
  makerDecimals: number;
  takerDecimals: number;
}

interface LimitOrderResponse {
  success: boolean;
  orderData?: any;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LimitOrderResponse>
) {
  if (req.method === 'POST') {
    try {
      const {
        makerAsset,
        takerAsset,
        makingAmount,
        takingAmount,
        maker,
        chainId,
      }: CreateOrderRequest = req.body;

      // Validate required fields
      if (!makerAsset || !takerAsset || !makingAmount || !takingAmount || !maker) {
        return res.status(400).json({
          success: false,
          error: 'Missing required fields',
        });
      }

      // Validate wallet address format
      if (!/^0x[a-fA-F0-9]{40}$/.test(maker)) {
        return res.status(400).json({
          success: false,
          error: 'Invalid wallet address format',
        });
      }

      console.log('🎯 Creating limit order:', {
        makerAsset: makerAsset.slice(0, 8) + '...',
        takerAsset: takerAsset.slice(0, 8) + '...',
        makingAmount,
        takingAmount,
        maker: maker.slice(0, 10) + '...',
        chainId,
      });

      // Create limit order data structure
      const orderData = await createLimitOrder({
        makerAsset,
        takerAsset,
        makingAmount: BigInt(makingAmount),
        takingAmount: BigInt(takingAmount),
        maker,
        chainId,
        expirationInSeconds: 24 * 60 * 60, // 24 hours
        allowPartialFills: true,
        allowMultipleFills: false,
      });

      console.log('✅ Limit order created successfully');

      return res.status(200).json({
        success: true,
        orderData,
      });

    } catch (error) {
      console.error('❌ Failed to create limit order:', error);
      return res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create limit order',
      });
    }
  }

  // Handle GET requests - fetch user's orders
  if (req.method === 'GET') {
    try {
      const { walletAddress, chainId, type = 'active' } = req.query;

      if (!walletAddress || !chainId) {
        return res.status(400).json({
          success: false,
          error: 'Missing walletAddress or chainId',
        });
      }

      // Validate wallet address format
      if (!/^0x[a-fA-F0-9]{40}$/.test(walletAddress as string)) {
        return res.status(400).json({
          success: false,
          error: 'Invalid wallet address format',
        });
      }

      console.log(`🔍 Fetching ${type} orders for: ${(walletAddress as string).slice(0, 10)}... on chain: ${chainId}`);

      // For demo purposes, return realistic mock data
      // In production, this would call the 1inch Order Book API
      const baseTime = Date.now();
      const mockOrders = [
        {
          orderHash: '0x1234567890abcdef1234567890abcdef12345678',
          makerAsset: '0xA0b86a33E6B8e6B9c4b25E1e1E7d2e3F4e5e6e7e', // USDC
          takerAsset: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', // ETH
          makingAmount: '1000000000', // 1000 USDC (6 decimals)
          takingAmount: '416666666666666666', // ~0.417 ETH (18 decimals)
          maker: walletAddress,
          receiver: walletAddress,
          salt: '12345',
          status: 1, // Active
          statusName: 'Active',
          filledTakingAmount: '0',
          remainingMakingAmount: '1000000000',
          createdAt: new Date(baseTime - 3600000).toISOString(), // 1 hour ago
          expiresAt: new Date(baseTime + 86400000).toISOString(), // 24 hours from now
        },
        {
          orderHash: '0xabcdef1234567890abcdef1234567890abcdef12',
          makerAsset: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', // ETH
          takerAsset: '0xA0b86a33E6B8e6B9c4b25E1e1E7d2e3F4e5e6e7e', // USDC
          makingAmount: '500000000000000000', // 0.5 ETH
          takingAmount: '1250000000', // 1250 USDC
          maker: walletAddress,
          receiver: walletAddress,
          salt: '67890',
          status: 2, // Partially filled
          statusName: 'Partially Filled',
          filledTakingAmount: '625000000', // 625 USDC filled
          remainingMakingAmount: '250000000000000000', // 0.25 ETH remaining
          createdAt: new Date(baseTime - 7200000).toISOString(), // 2 hours ago
          expiresAt: new Date(baseTime + 43200000).toISOString(), // 12 hours from now
        },
      ];

      // Filter by type if requested
      let filteredOrders = mockOrders;
      if (type === 'active') {
        filteredOrders = mockOrders.filter(order => order.status === 1 || order.status === 2);
      }

      return res.status(200).json({
        success: true,
        data: {
          orders: filteredOrders,
        },
      });

    } catch (error) {
      console.error('❌ Failed to fetch orders:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch orders',
      });
    }
  }

  // Handle DELETE requests - cancel order
  if (req.method === 'DELETE') {
    try {
      const { orderHash, chainId } = req.body;

      if (!orderHash || !chainId) {
        return res.status(400).json({
          success: false,
          error: 'Missing orderHash or chainId',
        });
      }

      console.log(`🗑️ Cancelling order: ${orderHash.slice(0, 10)}... on chain: ${chainId}`);

      // For demo purposes, simulate successful cancellation
      // In production, this would call the 1inch Order Book API to cancel the order

      return res.status(200).json({
        success: true,
        data: {
          orderHash,
          status: 'cancelled',
          message: 'Order cancelled successfully',
        },
      });

    } catch (error) {
      console.error('❌ Failed to cancel order:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to cancel order',
      });
    }
  }

  return res.status(405).json({
    success: false,
    error: 'Method not allowed',
  });
}