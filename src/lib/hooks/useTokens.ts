// Enhanced hook for limit order token management
'use client'

import { useState, useEffect, useCallback } from 'react';
import { useAccount } from 'wagmi';

export interface Token {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
  logoURI?: string;
  price: number;
  priceChange24h: number;
  balance: string; // User's balance
  balanceUSD: number;
}

export interface TokenState {
  tokens: Token[];
  loading: boolean;
  error: string | null;
  popularTokens: Token[];
  searchResults: Token[];
}

export function useTokens(chainId: number = 1) {
  const { address, isConnected } = useAccount();
  const [state, setState] = useState<TokenState>({
    tokens: [],
    loading: false,
    error: null,
    popularTokens: [],
    searchResults: [],
  });

  // Fetch popular tokens with real data
  const fetchPopularTokens = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await fetch(`/api/tokens?type=popular&chainId=${chainId}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch tokens: ${response.status}`);
      }

      const data = await response.json();
      
      setState(prev => ({
        ...prev,
        popularTokens: data.tokens || [],
        tokens: data.tokens || [],
        loading: false,
      }));

    } catch (error) {
      console.error('❌ Failed to fetch popular tokens:', error);
      
      // Fallback to mock data if API fails
      const fallbackTokens: Token[] = [
        {
          symbol: 'ETH',
          name: 'Ethereum',
          address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
          decimals: 18,
          price: 2450.50,
          priceChange24h: 3.2,
          balance: '0.0',
          balanceUSD: 0,
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
        },
      ];

      setState(prev => ({
        ...prev,
        popularTokens: fallbackTokens,
        tokens: fallbackTokens,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch tokens',
      }));
    }
  }, [chainId]);

  // Fetch user balances for tokens
  const fetchUserBalances = useCallback(async (tokenAddresses: string[]) => {
    if (!address || !isConnected) return;

    try {
      const response = await fetch('/api/tokens/balances', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          walletAddress: address,
          tokenAddresses,
          chainId,
        }),
      });

      if (!response.ok) throw new Error('Failed to fetch balances');

      const balances = await response.json();
      
      // Update tokens with balance data
      setState(prev => ({
        ...prev,
        tokens: prev.tokens.map(token => {
          const balance = balances[token.address] || '0';
          const balanceFormatted = formatTokenBalance(balance, token.decimals);
          return {
            ...token,
            balance: balanceFormatted,
            balanceUSD: parseFloat(balanceFormatted) * token.price,
          };
        }),
      }));

    } catch (error) {
      console.error('❌ Failed to fetch user balances:', error);
    }
  }, [address, isConnected, chainId]);

  // Search tokens by symbol or name
  const searchTokens = useCallback(async (query: string) => {
    if (!query.trim()) {
      setState(prev => ({ ...prev, searchResults: [] }));
      return;
    }

    try {
      const response = await fetch(`/api/tokens/search?query=${encodeURIComponent(query)}&chainId=${chainId}`);
      
      if (!response.ok) throw new Error('Failed to search tokens');

      const data = await response.json();
      setState(prev => ({ ...prev, searchResults: data.tokens || [] }));

    } catch (error) {
      console.error('❌ Failed to search tokens:', error);
      setState(prev => ({ ...prev, searchResults: [] }));
    }
  }, [chainId]);

  // Refresh balances for current tokens
  const refreshBalances = useCallback(async () => {
    if (state.tokens.length > 0) {
      const tokenAddresses = state.tokens.map(t => t.address);
      await fetchUserBalances(tokenAddresses);
    }
  }, [state.tokens, fetchUserBalances]);

  // Auto-fetch popular tokens on mount
  useEffect(() => {
    fetchPopularTokens();
  }, [fetchPopularTokens]);

  // Auto-fetch balances when wallet connects
  useEffect(() => {
    if (address && isConnected && state.tokens.length > 0) {
      const tokenAddresses = state.tokens.map(t => t.address);
      fetchUserBalances(tokenAddresses);
    }
  }, [address, isConnected, state.tokens, fetchUserBalances]);

  return {
    ...state,
    searchTokens,
    refreshBalances,
    fetchPopularTokens,
  };
}

// Helper function to format token balance
function formatTokenBalance(balance: string, decimals: number): string {
  try {
    const balanceBig = BigInt(balance);
    const divisor = BigInt(10 ** decimals);
    const integer = balanceBig / divisor;
    const remainder = balanceBig % divisor;
    
    if (remainder === BigInt(0)) {
      return integer.toString();
    }
    
    const decimal = remainder.toString().padStart(decimals, '0');
    const trimmed = decimal.replace(/0+$/, '');
    return trimmed ? `${integer}.${trimmed}` : integer.toString();
  } catch {
    return '0';
  }
}

// Get token by address
export function getTokenByAddress(tokens: Token[], address: string): Token | undefined {
  return tokens.find(token => token.address.toLowerCase() === address.toLowerCase());
}

// Format price with appropriate decimals
export function formatPrice(price: number): string {
  if (price < 0.01) return `$${price.toFixed(6)}`;
  if (price < 1) return `$${price.toFixed(4)}`;
  if (price < 100) return `$${price.toFixed(2)}`;
  return `$${price.toLocaleString()}`;
}

// Format price change with sign and color
export function formatPriceChange(change: number): {
  formatted: string;
  color: string;
  isPositive: boolean;
} {
  const isPositive = change >= 0;
  const formatted = `${isPositive ? '+' : ''}${change.toFixed(2)}%`;
  const color = isPositive ? 'text-green-400' : 'text-red-400';
  
  return { formatted, color, isPositive };
}
