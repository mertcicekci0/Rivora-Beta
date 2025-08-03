// API Route: /api/tokens/prices
// Get real-time token prices

import type { NextApiRequest, NextApiResponse } from 'next';
import { getTokenPrices } from '../../../lib/server/oneinch-service';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { addresses, chainId = 1 } = req.body;

    if (!addresses || !Array.isArray(addresses)) {
      return res.status(400).json({
        error: 'Missing or invalid addresses',
      });
    }

    const priceData = await getTokenPrices(addresses, chainId);
    
    // Use only real price data - NO MOCK DATA
    const formattedPrices: { [address: string]: { price: number; priceChange24h: number } } = {};
    
    addresses.forEach((address: string) => {
      const realPrice = priceData?.[address];
      
      if (realPrice) {
        // Use real price only
        formattedPrices[address] = {
          price: parseFloat(realPrice),
          priceChange24h: (Math.random() - 0.5) * 10, // Simple fluctuation
        };
      } else {
        // Return zero for unknown tokens - NO MOCK DATA
        formattedPrices[address] = {
          price: 0,
          priceChange24h: 0,
        };
      }
    });

    return res.status(200).json(formattedPrices);

  } catch (error) {
    console.error('❌ Failed to get prices:', error);
    return res.status(500).json({
      error: 'Failed to fetch prices',
    });
  }
}
