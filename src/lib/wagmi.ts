import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { cookieStorage, createStorage } from 'wagmi'
import { mainnet, arbitrum, polygon } from 'wagmi/chains'
import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'

// Get projectId from https://cloud.reown.com
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'c4f79cc821944d9680842e34466bfbd'

// Create the chains
const chains = [mainnet, arbitrum, polygon] as const

// Create a metadata object
const metadata = {
  name: 'Rivora DeFi Platform',
  description: 'Rivora DeFi Platform',
  url: 'https://rivora.vercel.app', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

// Create Wagmi config
const config = defaultWagmiConfig({
  chains, // required
  projectId, // required
  metadata, // required
  ssr: true,
  storage: createStorage({
    storage: cookieStorage
  }),
  // Disable remote configuration to prevent 403 errors
  enableAnalytics: false,
  enableOnramp: false
})

// Create wagmi adapter
const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage
  }),
  ssr: true,
  chains,
  projectId
})

export const config = wagmiAdapter.wagmiConfig

// Create modal with local configuration only
createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: chains,
  metadata,
  features: {
    analytics: false,
    onramp: false,
    swaps: false,
    email: false,
    socials: []
  },
  // Force local configuration only
  enableWalletConnect: true,
  enableInjected: true,
  enableEIP6963: true,
  enableCoinbase: true
})