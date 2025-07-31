import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  sepolia,
} from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Rivora DeFi Platform',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '2f5a0b4b30a7c5f8e9d1a3c6b7e0f2a9',
  chains: [mainnet, polygon, optimism, arbitrum, base, sepolia],
  ssr: true,
});
