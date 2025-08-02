import { cookieStorage, createStorage, createConfig } from 'wagmi'
import { mainnet, arbitrum, polygon } from 'wagmi/chains'
import { injected, walletConnect } from 'wagmi/connectors'

// Get projectId from https://cloud.reown.com
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'c4f79cc821944d9680842e34466bfbd'

// Create the chains
const chains = [mainnet, arbitrum, polygon] as const

// Create a metadata object
const metadata = {
  name: 'Rivora DeFi Platform',
  description: 'Rivora DeFi Platform',
  url: 'https://rivora.vercel.app',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

// Create Wagmi config using createConfig
export const config = createConfig({
  chains,
  connectors: [
    injected(),
    walletConnect({ 
      projectId,
      metadata,
      showQrModal: true,
      qrModalOptions: {
        enableExplorer: false
      }
    })
  ],
  storage: createStorage({
    storage: cookieStorage
  }),
  ssr: true