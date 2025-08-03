// API Route: /api/tokens/balances
// Get user token balances

import type { NextApiRequest, NextApiResponse } from 'next';
import { getWalletBalances } from '../../../lib/server/oneinch-service';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { walletAddress, tokenAddresses, chainId = 1 } = req.body;

    if (!walletAddress || !tokenAddresses) {
      return res.status(400).json({
        error: 'Missing walletAddress or tokenAddresses',
      });
    }

    // Mock balances for demo - In production, use getWalletBalances
    const mockBalances: { [address: string]: string } = {
      '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE': '2.5341', // ETH
      '0xA0b86a33E6B8e6B9c4b25E1e1E7d2e3F4e5e6e7e': '1250.50', // USDC  
      '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599': '0.1592', // WBTC
      '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9': '10.0', // AAVE
      '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984': '102.7', // UNI
      '0x514910771AF9Ca656af840dff83E8264EcF986CA': '45.2', // LINK
    };

    // Format balances for the requested tokens
    const formattedBalances: { [address: string]: string } = {};
    
    tokenAddresses.forEach((address: string) => {
      formattedBalances[address] = mockBalances[address] || '0';
    });

    return res.status(200).json(formattedBalances);

  } catch (error) {
    console.error('❌ Failed to get balances:', error);
    return res.status(500).json({
      error: 'Failed to fetch balances',
    });
  }
}
