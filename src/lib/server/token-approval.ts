// Token approval utilities for limit orders
// This module handles ERC20 token approvals for the 1inch limit order contract

import { ethers } from 'ethers';
import { getLimitOrderV4Domain } from '@1inch/limit-order-sdk';

// Standard ERC20 ABI fragments needed for approval
const ERC20_ABI = [
  'function approve(address spender, uint256 amount) external returns (bool)',
  'function allowance(address owner, address spender) external view returns (uint256)',
  'function balanceOf(address account) external view returns (uint256)',
  'function decimals() external view returns (uint8)',
  'function symbol() external view returns (string)',
  'function name() external view returns (string)',
];

// Get the 1inch limit order contract address for the given chain
export function getLimitOrderContractAddress(chainId: number): string {
  const domain = getLimitOrderV4Domain(chainId);
  return domain.verifyingContract;
}

// Check if token allowance is sufficient
export async function checkTokenAllowance(
  tokenAddress: string,
  ownerAddress: string,
  chainId: number,
  provider: ethers.Provider
): Promise<{ allowance: bigint; isApproved: boolean; contractAddress: string }> {
  try {
    const contract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
    const limitOrderContract = getLimitOrderContractAddress(chainId);
    
    const allowance = await contract.allowance(ownerAddress, limitOrderContract);
    
    return {
      allowance,
      isApproved: allowance > BigInt(0),
      contractAddress: limitOrderContract,
    };
    
  } catch (error) {
    console.error('❌ Failed to check token allowance:', error);
    throw error;
  }
}

// Get token information
export async function getTokenInfo(
  tokenAddress: string,
  provider: ethers.Provider
): Promise<{
  symbol: string;
  name: string;
  decimals: number;
}> {
  try {
    const contract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
    
    const [symbol, name, decimals] = await Promise.all([
      contract.symbol(),
      contract.name(),
      contract.decimals(),
    ]);
    
    return { symbol, name, decimals };
    
  } catch (error) {
    console.error('❌ Failed to get token info:', error);
    throw error;
  }
}

// Get user token balance
export async function getTokenBalance(
  tokenAddress: string,
  userAddress: string,
  provider: ethers.Provider
): Promise<bigint> {
  try {
    const contract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
    return await contract.balanceOf(userAddress);
    
  } catch (error) {
    console.error('❌ Failed to get token balance:', error);
    throw error;
  }
}

// Prepare approval transaction data
export async function prepareApprovalTransaction(
  tokenAddress: string,
  amount: bigint,
  chainId: number,
  provider: ethers.Provider
): Promise<{
  to: string;
  data: string;
  value: string;
}> {
  try {
    const contract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
    const limitOrderContract = getLimitOrderContractAddress(chainId);
    
    // Encode the approval function call
    const data = contract.interface.encodeFunctionData('approve', [
      limitOrderContract,
      amount,
    ]);
    
    return {
      to: tokenAddress,
      data,
      value: '0',
    };
    
  } catch (error) {
    console.error('❌ Failed to prepare approval transaction:', error);
    throw error;
  }
}

// Helper to approve max amount (saves gas on future orders)
export async function prepareMaxApprovalTransaction(
  tokenAddress: string,
  chainId: number,
  provider: ethers.Provider
): Promise<{
  to: string;
  data: string;
  value: string;
}> {
  const maxAmount = ethers.MaxUint256;
  return prepareApprovalTransaction(tokenAddress, maxAmount, chainId, provider);
}

// Check if user has sufficient balance
export async function checkSufficientBalance(
  tokenAddress: string,
  userAddress: string,
  requiredAmount: bigint,
  provider: ethers.Provider
): Promise<{ balance: bigint; hasSufficientBalance: boolean }> {
  try {
    const balance = await getTokenBalance(tokenAddress, userAddress, provider);
    
    return {
      balance,
      hasSufficientBalance: balance >= requiredAmount,
    };
    
  } catch (error) {
    console.error('❌ Failed to check sufficient balance:', error);
    throw error;
  }
}

// Comprehensive pre-order validation
export async function validateOrderPrerequisites(
  tokenAddress: string,
  userAddress: string,
  amount: bigint,
  chainId: number,
  provider: ethers.Provider
): Promise<{
  isValid: boolean;
  issues: string[];
  tokenInfo: { symbol: string; name: string; decimals: number };
  balance: bigint;
  allowance: bigint;
  needsApproval: boolean;
  contractAddress: string;
}> {
  const issues: string[] = [];
  
  try {
    // Get token info
    const tokenInfo = await getTokenInfo(tokenAddress, provider);
    
    // Check balance
    const { balance, hasSufficientBalance } = await checkSufficientBalance(
      tokenAddress,
      userAddress,
      amount,
      provider
    );
    
    if (!hasSufficientBalance) {
      issues.push(`Insufficient ${tokenInfo.symbol} balance. Required: ${amount}, Available: ${balance}`);
    }
    
    // Check allowance
    const { allowance, contractAddress } = await checkTokenAllowance(
      tokenAddress,
      userAddress,
      chainId,
      provider
    );
    
    const needsApproval = allowance < amount;
    if (needsApproval) {
      issues.push(`${tokenInfo.symbol} approval required for limit order contract`);
    }
    
    return {
      isValid: issues.length === 0,
      issues,
      tokenInfo,
      balance,
      allowance,
      needsApproval,
      contractAddress,
    };
    
  } catch (error) {
    console.error('❌ Failed to validate order prerequisites:', error);
    issues.push('Failed to validate order prerequisites');
    
    return {
      isValid: false,
      issues,
      tokenInfo: { symbol: 'Unknown', name: 'Unknown', decimals: 18 },
      balance: BigInt(0),
      allowance: BigInt(0),
      needsApproval: true,
      contractAddress: getLimitOrderContractAddress(chainId),
    };
  }
}
