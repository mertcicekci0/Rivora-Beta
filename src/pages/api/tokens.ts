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
  res: NextApiResponse<any>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { chainId, addresses, prices, type } = req.query;

    if (!chainId) {
      return res.status(400).json({ error: 'Missing chainId parameter' });
    }

    const chain = parseInt(chainId as string);

    // Get popular tokens for limit orders
    if (type === 'popular') {
      const popularTokens = [
        {
          symbol: 'ETH',
          name: 'Ethereum',
          address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
          decimals: 18,
          price: 2450.50,
          priceChange24h: 3.2,
          balance: '0.0',
          balanceUSD: 0,
          logoURI: 'https://tokens.1inch.io/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.png',
        },
        {
          symbol: 'USDC',
          name: 'USD Coin',
          address: '0xA0b86a33E6B8e6B9c4b25E1e1E7d2e3F4e5e6e7e',
          decimals: 6,
          price: 1.00,
          priceChange24h: 0.1,
          balance: '0.0',
          balanceUSD: 0,
          logoURI: 'https://tokens.1inch.io/0xa0b86a33e6b8e6b9c4b25e1e1e7d2e3f4e5e6e7e.png',
        },
        {
          symbol: 'WBTC',
          name: 'Wrapped Bitcoin',
          address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
          decimals: 8,
          price: 43250.75,
          priceChange24h: -1.8,
          balance: '0.0',
          balanceUSD: 0,
          logoURI: 'https://tokens.1inch.io/0x2260fac5e5542a773aa44fbcfedf7c193bc2c599.png',
        },
        {
          symbol: 'AAVE',
          name: 'Aave',
          address: '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9',
          decimals: 18,
          price: 275.80,
          priceChange24h: 5.7,
          balance: '0.0',
          balanceUSD: 0,
          logoURI: 'https://tokens.1inch.io/0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9.png',
        },
        {
          symbol: 'UNI',
          name: 'Uniswap',
          address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
          decimals: 18,
          price: 13.45,
          priceChange24h: -2.3,
          balance: '0.0',
          balanceUSD: 0,
          logoURI: 'https://tokens.1inch.io/0x1f9840a85d5af5bf1d1762f925bdaddc4201f984.png',
        },
        {
          symbol: 'LINK',
          name: 'Chainlink',
          address: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
          decimals: 18,
          price: 23.45,
          priceChange24h: 4.1,
          balance: '0.0',
          balanceUSD: 0,
          logoURI: 'https://tokens.1inch.io/0x514910771af9ca656af840dff83e8264ecf986ca.png',
        },
      ];

      return res.status(200).json({ tokens: popularTokens });
    }

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
