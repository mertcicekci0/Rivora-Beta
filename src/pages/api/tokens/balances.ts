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

    // Use real balance data only - NO MOCK DATA
    const balanceData = await getWalletBalances(walletAddress, chainId);
    
    // Format balances for the requested tokens
    const formattedBalances: { [address: string]: string } = {};
    
    if (balanceData && balanceData[walletAddress]) {
      tokenAddresses.forEach((address: string) => {
        formattedBalances[address] = balanceData[walletAddress][address] || '0';
      });
    } else {
      // Return zeros if no balance data - NO MOCK DATA
      tokenAddresses.forEach((address: string) => {
        formattedBalances[address] = '0';
      });
    }

    return res.status(200).json(formattedBalances);

  } catch (error) {
    console.error('❌ Failed to get balances:', error);
    return res.status(500).json({
      error: 'Failed to fetch balances',
    });
  }
}
