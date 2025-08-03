// 1inch API Service Layer
// This module handles all interactions with 1inch APIs

const ONEINCH_API_KEY = process.env.ONEINCH_API_KEY;
const ONEINCH_BASE_URL = process.env.ONEINCH_API_BASE_URL || 'https://api.1inch.dev';

// Common request headers for 1inch API
const getHeaders = () => ({
  'Authorization': `Bearer ${ONEINCH_API_KEY}`,
  'Content-Type': 'application/json',
});

// Generic API call wrapper with error handling
async function makeApiRequest(url: string, options: RequestInit = {}) {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...getHeaders(),
        ...options.headers,
      },
    });

    if (!response.ok) {
      console.error(`1inch API Error: ${response.status} - ${response.statusText}`);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('1inch API Request Failed:', error);
    return null;
  }
}

// ========================================
// WALLET BALANCES API
// ========================================
export async function getWalletBalances(walletAddress: string, chainId: number) {
  const url = `${ONEINCH_BASE_URL}/balance/v1.2/${chainId}/${walletAddress}`;
  return await makeApiRequest(url);
}

// ========================================
// TOKEN INFO API
// ========================================
export async function getTokenInfo(tokenAddress: string, chainId: number) {
  const url = `${ONEINCH_BASE_URL}/token/v1.2/${chainId}/${tokenAddress}`;
  return await makeApiRequest(url);
}

// Get multiple token infos
export async function getMultipleTokensInfo(tokenAddresses: string[], chainId: number) {
  const tokenPromises = tokenAddresses.map(address => getTokenInfo(address, chainId));
  const results = await Promise.allSettled(tokenPromises);
  
  return results.map((result, index) => ({
    address: tokenAddresses[index],
    data: result.status === 'fulfilled' ? result.value : null
  }));
}

// ========================================
// PRICE FEEDS API
// ========================================
export async function getTokenPrices(tokenAddresses: string[], chainId: number) {
  const addressesParam = tokenAddresses.join(',');
  const url = `${ONEINCH_BASE_URL}/price/v1.1/${chainId}/${addressesParam}`;
  return await makeApiRequest(url);
}

// ========================================
// TRANSACTION HISTORY API
// ========================================
export async function getTransactionHistory(walletAddress: string, chainId: number, limit: number = 100) {
  const url = `${ONEINCH_BASE_URL}/history/v2.0/history/${chainId}/${walletAddress}?limit=${limit}`;
  return await makeApiRequest(url);
}

// ========================================
// GAS PRICE API
// ========================================
export async function getGasPrice(chainId: number) {
  const url = `${ONEINCH_BASE_URL}/gas-price/v1.4/${chainId}`;
  return await makeApiRequest(url);
}

// ========================================
// FUSION+ API (for security analysis)
// ========================================
export async function getFusionPlusOrders(walletAddress: string, chainId: number) {
  const url = `${ONEINCH_BASE_URL}/fusion/v1.0/${chainId}/orders?maker=${walletAddress}`;
  return await makeApiRequest(url);
}

// ========================================
// LIMIT ORDER API
// ========================================
export async function getLimitOrders(walletAddress: string, chainId: number) {
  const url = `${ONEINCH_BASE_URL}/orderbook/v3.0/${chainId}/orders?maker=${walletAddress}`;
  return await makeApiRequest(url);
}

// ========================================
// SWAP QUOTE API (for analysis)
// ========================================
export async function getSwapQuote(fromToken: string, toToken: string, amount: string, chainId: number) {
  const url = `${ONEINCH_BASE_URL}/swap/v5.0/${chainId}/quote?fromTokenAddress=${fromToken}&toTokenAddress=${toToken}&amount=${amount}`;
  return await makeApiRequest(url);
}

// ========================================
// PORTFOLIO ANALYSIS HELPER
// ========================================
export async function getPortfolioData(walletAddress: string, chainId: number) {
  try {
    // Get all portfolio data in parallel
    const [balances, history, gasPrice, fusionOrders, limitOrders] = await Promise.allSettled([
      getWalletBalances(walletAddress, chainId),
      getTransactionHistory(walletAddress, chainId),
      getGasPrice(chainId),
      getFusionPlusOrders(walletAddress, chainId),
      getLimitOrders(walletAddress, chainId),
    ]);

    return {
      balances: balances.status === 'fulfilled' ? balances.value : null,
      history: history.status === 'fulfilled' ? history.value : null,
      gasPrice: gasPrice.status === 'fulfilled' ? gasPrice.value : null,
      fusionOrders: fusionOrders.status === 'fulfilled' ? fusionOrders.value : null,
      limitOrders: limitOrders.status === 'fulfilled' ? limitOrders.value : null,
    };
  } catch (error) {
    console.error('Portfolio data fetch failed:', error);
    return {
      balances: null,
      history: null,
      gasPrice: null,
      fusionOrders: null,
      limitOrders: null,
    };
  }
}
