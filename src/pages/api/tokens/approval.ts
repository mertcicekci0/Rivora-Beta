// API endpoint for checking and managing token approvals for limit orders
import type { NextApiRequest, NextApiResponse } from 'next';

interface TokenApprovalRequest {
  tokenAddress: string;
  walletAddress: string;
  amount: string;
  decimals: number;
  chainId: number;
}

interface TokenApprovalResponse {
  hasApproval: boolean;
  currentAllowance: string;
  requiredAllowance: string;
  approvalTxData?: {
    to: string;
    data: string;
    value: string;
  };
}

// 1inch Limit Order Protocol Contract Addresses
const LIMIT_ORDER_CONTRACTS: Record<number, string> = {
  1: '0x119c71D3BbAC22029622cbaEc24854d3D32D2828', // Ethereum Mainnet
  56: '0x119c71D3BbAC22029622cbaEc24854d3D32D2828', // BSC
  137: '0x119c71D3BbAC22029622cbaEc24854d3D32D2828', // Polygon
  42161: '0x119c71D3BbAC22029622cbaEc24854d3D32D2828', // Arbitrum
  10: '0x119c71D3BbAC22029622cbaEc24854d3D32D2828', // Optimism
};

// ERC20 ABI for allowance and approve functions
const ERC20_ABI = [
  'function allowance(address owner, address spender) view returns (uint256)',
  'function approve(address spender, uint256 amount) returns (bool)',
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TokenApprovalResponse | { error: string }>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { tokenAddress, walletAddress, amount, decimals, chainId }: TokenApprovalRequest = req.body;

    if (!tokenAddress || !walletAddress || !amount || !chainId) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    // Get the limit order contract address for the chain
    const spenderAddress = LIMIT_ORDER_CONTRACTS[chainId];
    if (!spenderAddress) {
      return res.status(400).json({ error: `Unsupported chain ID: ${chainId}` });
    }

    // Skip approval check for ETH (native token)
    if (tokenAddress.toLowerCase() === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
      return res.status(200).json({
        hasApproval: true,
        currentAllowance: 'unlimited',
        requiredAllowance: amount,
      });
    }

    // Calculate required allowance in wei
    const requiredAllowance = BigInt(parseFloat(amount) * Math.pow(10, decimals)).toString();

    // Mock allowance check (in a real implementation, you'd query the blockchain)
    // For demo purposes, we'll assume no approval exists initially
    const currentAllowance = '0';
    const hasApproval = BigInt(currentAllowance) >= BigInt(requiredAllowance);

    if (hasApproval) {
      return res.status(200).json({
        hasApproval: true,
        currentAllowance,
        requiredAllowance,
      });
    }

    // Generate approval transaction data
    // In a real implementation, you'd use ethers.js or web3.js to encode this
    const approvalTxData = {
      to: tokenAddress,
      data: `0x095ea7b3${spenderAddress.slice(2).padStart(64, '0')}${'f'.repeat(64)}`, // approve(spender, uint256.max)
      value: '0',
    };

    return res.status(200).json({
      hasApproval: false,
      currentAllowance,
      requiredAllowance,
      approvalTxData,
    });

  } catch (error) {
    console.error('❌ Token approval check failed:', error);
    return res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Internal server error' 
    });
  }
}
