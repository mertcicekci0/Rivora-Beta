// API Route: /api/limit-orders
// Handles limit order operations using 1inch API

import type { NextApiRequest, NextApiResponse } from 'next';
import { 
  getLimitOrders, 
  getAllLimitOrders, 
  createLimitOrder, 
  cancelLimitOrder,
  getOrderDetails,
  getOrderBook,
  getHistoricalOrders 
} from '../../lib/server/oneinch-service';

// Limit Order interfaces
interface LimitOrder {
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

interface LimitOrderResponse {
  orders: LimitOrder[];
  meta?: {
    total: number;
    page: number;
    limit: number;
  };
}

interface CreateOrderRequest {
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LimitOrderResponse | { error: string } | { success: boolean; data?: any }>
) {
  try {
    const { method, query, body } = req;

    switch (method) {
      case 'GET': {
        // Get limit orders for a wallet
        const { walletAddress, chainId, type = 'active', limit = '100' } = query;

        if (!walletAddress || !chainId) {
          return res.status(400).json({ error: 'Missing walletAddress or chainId' });
        }

        const wallet = walletAddress as string;
        const chain = parseInt(chainId as string);
        const orderLimit = parseInt(limit as string);

        let ordersData;
        switch (type) {
          case 'active':
            ordersData = await getLimitOrders(wallet, chain, orderLimit);
            break;
          case 'all':
            ordersData = await getAllLimitOrders(wallet, chain, orderLimit);
            break;
          case 'historical':
            ordersData = await getHistoricalOrders(wallet, chain, orderLimit);
            break;
          default:
            ordersData = await getLimitOrders(wallet, chain, orderLimit);
        }

        if (!ordersData) {
          return res.status(500).json({ error: 'Failed to fetch limit orders' });
        }

        console.log('✅ Limit orders fetched:', {
          wallet: wallet.slice(0, 10) + '...',
          chain,
          type,
          count: ordersData?.orders?.length || 0
        });

        return res.status(200).json(ordersData);
      }

      case 'POST': {
        // Create a new limit order
        const orderData: CreateOrderRequest = body;

        if (!orderData.makerAsset || !orderData.takerAsset || !orderData.makingAmount || 
            !orderData.takingAmount || !orderData.maker || !orderData.chainId) {
          return res.status(400).json({ 
            error: 'Missing required fields: makerAsset, takerAsset, makingAmount, takingAmount, maker, chainId' 
          });
        }

        const result = await createLimitOrder(orderData);

        if (!result) {
          return res.status(500).json({ error: 'Failed to create limit order' });
        }

        console.log('✅ Limit order created:', {
          maker: orderData.maker.slice(0, 10) + '...',
          makerAsset: orderData.makerAsset,
          takerAsset: orderData.takerAsset,
          chain: orderData.chainId
        });

        return res.status(201).json({ success: true, data: result });
      }

      case 'DELETE': {
        // Cancel a limit order
        const { orderHash, chainId } = query;

        if (!orderHash || !chainId) {
          return res.status(400).json({ error: 'Missing orderHash or chainId' });
        }

        const result = await cancelLimitOrder(orderHash as string, parseInt(chainId as string));

        if (!result) {
          return res.status(500).json({ error: 'Failed to cancel limit order' });
        }

        console.log('✅ Limit order cancelled:', {
          orderHash: (orderHash as string).slice(0, 10) + '...',
          chain: chainId
        });

        return res.status(200).json({ success: true, data: result });
      }

      default:
        return res.status(405).json({ error: `Method ${method} not allowed` });
    }

  } catch (error) {
    console.error('❌ Limit order API error:', error);
    return res.status(500).json({
      error: 'Internal server error in limit order API'
    });
  }
}
