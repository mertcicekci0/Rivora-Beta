// 1inch Limit Order SDK Integration - Simplified Version
// This module handles limit order creation using direct API calls

const ONEINCH_API_KEY = process.env.ONEINCH_API_KEY;

// Order creation parameters
export interface CreateLimitOrderParams {
  makerAsset: string;
  takerAsset: string;
  makingAmount: bigint;
  takingAmount: bigint;
  maker: string;
  receiver?: string;
  chainId: number;
  expirationInSeconds?: number;
  allowPartialFills?: boolean;
  allowMultipleFills?: boolean;
}

// Create a limit order data structure for frontend signing
export async function createLimitOrder(params: CreateLimitOrderParams) {
  try {
    const {
      makerAsset,
      takerAsset,
      makingAmount,
      takingAmount,
      maker,
      receiver,
      chainId,
      expirationInSeconds = 3600, // 1 hour default
    } = params;

    // Calculate expiration timestamp
    const expiration = Math.floor(Date.now() / 1000) + expirationInSeconds;

    // Generate random salt for uniqueness
    const salt = Math.floor(Math.random() * 1e16).toString();

    // Create order data structure for EIP-712 signing
    const orderData = {
      makerAsset,
      takerAsset,
      makingAmount: makingAmount.toString(),
      takingAmount: takingAmount.toString(),
      maker,
      receiver: receiver || maker,
      salt,
      expiration: expiration.toString(),
      allowedSender: '0x0000000000000000000000000000000000000000',
      makingAmountIncrease: '0',
      takingAmountIncrease: '0',
    };

    // EIP-712 domain for limit orders
    const domain = {
      name: '1inch Limit Order Protocol',
      version: '4',
      chainId,
      verifyingContract: getLimitOrderContractAddress(chainId),
    };

    // EIP-712 types
    const types = {
      Order: [
        { name: 'makerAsset', type: 'address' },
        { name: 'takerAsset', type: 'address' },
        { name: 'makingAmount', type: 'uint256' },
        { name: 'takingAmount', type: 'uint256' },
        { name: 'maker', type: 'address' },
        { name: 'receiver', type: 'address' },
        { name: 'salt', type: 'uint256' },
        { name: 'expiration', type: 'uint256' },
        { name: 'allowedSender', type: 'address' },
        { name: 'makingAmountIncrease', type: 'uint256' },
        { name: 'takingAmountIncrease', type: 'uint256' },
      ],
    };

    const typedData = {
      domain,
      types,
      primaryType: 'Order',
      message: orderData,
    };

    // Generate order hash (simplified)
    const orderHash = `0x${salt}${Date.now().toString(16)}`;

    return {
      order: orderData,
      typedData,
      domain,
      orderHash,
    };

  } catch (error) {
    console.error('❌ Failed to create limit order:', error);
    throw error;
  }
}

// Get limit order contract address for different chains
function getLimitOrderContractAddress(chainId: number): string {
  // 1inch Limit Order Protocol v4 contract addresses
  const contracts: { [key: number]: string } = {
    1: '0x1111111254eeb25477b68fb85ed929f73a960582', // Ethereum
    137: '0x1111111254eeb25477b68fb85ed929f73a960582', // Polygon
    10: '0x1111111254eeb25477b68fb85ed929f73a960582', // Optimism
    42161: '0x1111111254eeb25477b68fb85ed929f73a960582', // Arbitrum
    8453: '0x1111111254eeb25477b68fb85ed929f73a960582', // Base
  };
  
  return contracts[chainId] || contracts[1]; // Default to Ethereum
}

// Submit signed order to 1inch Orderbook
export async function submitLimitOrder(
  orderData: any,
  signature: string,
  chainId: number
) {
  try {
    if (!ONEINCH_API_KEY) {
      throw new Error('1inch API key is not configured');
    }

    const url = `https://api.1inch.dev/orderbook/v3.0/${chainId}/order`;
    
    const payload = {
      ...orderData,
      signature,
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ONEINCH_API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to submit order: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const result = await response.json();
    console.log('✅ Order submitted successfully:', result);
    
    return result;
    
  } catch (error) {
    console.error('❌ Failed to submit order:', error);
    throw error;
  }
}

// Get orders for a wallet
export async function getWalletOrders(
  walletAddress: string,
  chainId: number,
  limit: number = 100,
  statuses?: number[]
) {
  try {
    if (!ONEINCH_API_KEY) {
      throw new Error('1inch API key is not configured');
    }

    // Build query parameters
    const params = new URLSearchParams({
      maker: walletAddress,
      limit: limit.toString(),
    });

    if (statuses && statuses.length > 0) {
      params.append('statuses', statuses.join(','));
    }

    const url = `https://api.1inch.dev/orderbook/v3.0/${chainId}/orders?${params.toString()}`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${ONEINCH_API_KEY}`,
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch orders: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('❌ Failed to get wallet orders:', error);
    throw error;
  }
}

// Cancel a limit order
export async function cancelLimitOrder(
  orderHash: string,
  chainId: number
) {
  try {
    if (!ONEINCH_API_KEY) {
      throw new Error('1inch API key is not configured');
    }

    const url = `https://api.1inch.dev/orderbook/v3.0/${chainId}/order/${orderHash}`;
    
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${ONEINCH_API_KEY}`,
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to cancel order: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('✅ Order cancelled successfully:', data);
    
    return data;

  } catch (error) {
    console.error('❌ Failed to cancel order:', error);
    throw error;
  }
}

// Get order details
export async function getOrderDetails(
  orderHash: string,
  chainId: number
) {
  try {
    if (!ONEINCH_API_KEY) {
      throw new Error('1inch API key is not configured');
    }

    const url = `https://api.1inch.dev/orderbook/v3.0/${chainId}/order/${orderHash}`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${ONEINCH_API_KEY}`,
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to get order details: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('❌ Failed to get order details:', error);
    throw error;
  }
}

// Order status constants
export const ORDER_STATUS = {
  PENDING: 1,
  PARTIAL: 2,
  FILLED: 3,
  CANCELLED: 4,
  EXPIRED: 5,
  INVALID: 6,
} as const;

// Helper function to get status name
export function getOrderStatusName(status: number): string {
  switch (status) {
    case ORDER_STATUS.PENDING: return 'Active';
    case ORDER_STATUS.PARTIAL: return 'Partial';
    case ORDER_STATUS.FILLED: return 'Completed';
    case ORDER_STATUS.CANCELLED: return 'Cancelled';
    case ORDER_STATUS.EXPIRED: return 'Expired';
    case ORDER_STATUS.INVALID: return 'Invalid';
    default: return 'Unknown';
  }
}

// Convert amount from string to bigint (handling decimals)
export function parseTokenAmount(amount: string, decimals: number = 18): bigint {
  try {
    const [integer, decimal = ''] = amount.split('.');
    const paddedDecimal = decimal.padEnd(decimals, '0').slice(0, decimals);
    return BigInt(integer + paddedDecimal);
  } catch (error) {
    console.error('Failed to parse token amount:', amount, error);
    return BigInt(0);
  }
}

// Convert bigint amount to string (handling decimals)
export function formatTokenAmount(amount: bigint, decimals: number = 18): string {
  try {
    const amountStr = amount.toString().padStart(decimals + 1, '0');
    const integer = amountStr.slice(0, -decimals) || '0';
    const decimal = amountStr.slice(-decimals).replace(/0+$/, '');
    return decimal ? `${integer}.${decimal}` : integer;
  } catch (error) {
    console.error('Failed to format token amount:', amount, error);
    return '0';
  }
}