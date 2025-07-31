import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  sepolia,
} from 'wagmi/chains';

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || 'fd4c14b5c6a1db8a8f5b7a8e9c3f6b2d';

if (!projectId) {
  throw new Error('NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID is not defined');
}

export const config = getDefaultConfig({
  appName: 'Rivora DeFi Platform',
  projectId,
  chains: [mainnet, polygon, optimism, arbitrum, base, sepolia],
  ssr: true,
  multiInjectedProviderDiscovery: false,
});
