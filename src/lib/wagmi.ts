import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  sepolia,
} from 'wagmi/chains';

// Use a valid WalletConnect project ID format for development
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '2f5a2b1c8d9e3f4a5b6c7d8e9f0a1b2c';

export const config = getDefaultConfig({
  appName: 'Rivora DeFi Platform',
  projectId,
  chains: [mainnet, polygon, optimism, arbitrum, base, sepolia],
  ssr: true,
  multiInjectedProviderDiscovery: false,
});