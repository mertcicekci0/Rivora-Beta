// API Route: /api/tokens
// Handles token information from 1inch API

import type { NextApiRequest, NextApiResponse } from 'next';
import { getTokenInfo, getMultipleTokensInfo, getTokenPrices } from '../../lib/server/oneinch-service';

interface TokenInfo {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  logoURI?: string;
}

interface TokenPrice {
  [address: string]: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TokenInfo[] | TokenPrice | { error: string }>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { chainId, addresses, prices } = req.query;

    if (!chainId) {
      return res.status(400).json({ error: 'Missing chainId parameter' });
    }

    const chain = parseInt(chainId as string);

    // Get token prices
    if (prices === 'true' && addresses) {
      const tokenAddresses = (addresses as string).split(',');
      const pricesData = await getTokenPrices(tokenAddresses, chain);
      
      if (!pricesData) {
        return res.status(500).json({ error: 'Failed to fetch token prices' });
      }

      return res.status(200).json(pricesData);
    }

    // Get token info
    if (addresses) {
      const tokenAddresses = (addresses as string).split(',');
      
      if (tokenAddresses.length === 1) {
        const tokenInfo = await getTokenInfo(tokenAddresses[0], chain);
        return res.status(200).json(tokenInfo ? [tokenInfo] : []);
      } else {
        const tokensInfo = await getMultipleTokensInfo(tokenAddresses, chain);
        const validTokens = tokensInfo
          .filter((result: any) => result.data)
          .map((result: any) => result.data);
        
        return res.status(200).json(validTokens);
      }
    }

    return res.status(400).json({ error: 'Missing addresses parameter' });

  } catch (error) {
    console.error('❌ Token API error:', error);
    return res.status(500).json({
      error: 'Internal server error in token API'
    });
  }
}
