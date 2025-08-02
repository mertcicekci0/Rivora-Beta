import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  sepolia,
} from 'wagmi/chains';

// Geliştirme ortamı için basit bir project ID kullan
const projectId = 'demo-project-id';

export const config = getDefaultConfig({
  appName: 'Rivora DeFi Platform',
  projectId,
  chains: [mainnet, polygon, optimism, arbitrum, base, sepolia],
  ssr: true,
  multiInjectedProviderDiscovery: false,
});