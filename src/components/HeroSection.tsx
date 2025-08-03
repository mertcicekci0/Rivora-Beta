'use client'

import React, { useRef, useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

interface HeroSectionProps {
  onConnectWallet: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onConnectWallet }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-6 text-center relative z-10">
        {/* Interactive Liquid Metal Orb */}
        <div className="relative mb-16">
          <div className="liquid-orb">
            <div className="orb-core"></div>
            <div className="orb-liquid"></div>
            <div className="orb-glow-ring"></div>
            <div className="orb-reflection"></div>
            <div className="orb-caustics"></div>
          </div>
        </div>

        {/* Hero Typography */}
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="word-decode rivora-title" style={{ animationDelay: '0s' }}>
              Rivora
            </span>
          </h1>
          
          <div className="mt-16">
            <ConnectButton.Custom>
              {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                authenticationStatus,
                mounted,
              }) => {
                // Note: If your app doesn't use authentication, you
                // can remove all 'authenticationStatus' checks
                const ready = mounted && authenticationStatus !== 'loading';
                const connected =
                  ready &&
                  account &&
                  chain &&
                  (!authenticationStatus ||
                    authenticationStatus === 'authenticated');

                return (
                  <div
                    {...(!ready && {
                      'aria-hidden': true,
                      'style': {
                        opacity: 0,
                        pointerEvents: 'none',
                        userSelect: 'none',
                      },
                    })}
                  >
                    {(() => {
                      if (!connected) {
                        return (
                          <button 
                            onClick={() => {
                              openConnectModal();
                              onConnectWallet();
                            }}
                            className="premium-hero-cta-button group"
                          >
                            <span className="button-text">Connect Wallet</span>
                            <span className="button-arrow">→</span>
                            <div className="button-glow-effect"></div>
                            <div className="button-ripple"></div>
                            <div className="button-energy-field"></div>
                          </button>
                        );
                      }

                      if (chain.unsupported) {
                        return (
                          <button 
                            onClick={openChainModal} 
                            className="premium-hero-cta-button group bg-red-600 hover:bg-red-700"
                          >
                            <span className="button-text">Wrong network</span>
                            <span className="button-arrow">⚠️</span>
                            <div className="button-glow-effect"></div>
                            <div className="button-ripple"></div>
                            <div className="button-energy-field"></div>
                          </button>
                        );
                      }

                      return (
                        <div className="flex gap-4 items-center justify-center">
                          <button
                            onClick={openChainModal}
                            className="premium-hero-cta-button group !py-3 !px-6"
                          >
                            {chain.hasIcon && (
                              <div
                                style={{
                                  background: chain.iconBackground,
                                  width: 24,
                                  height: 24,
                                  borderRadius: 999,
                                  overflow: 'hidden',
                                  marginRight: 8,
                                }}
                              >
                                {chain.iconUrl && (
                                  <img
                                    alt={chain.name ?? 'Chain icon'}
                                    src={chain.iconUrl}
                                    style={{ width: 24, height: 24 }}
                                  />
                                )}
                              </div>
                            )}
                            <span className="button-text">{chain.name}</span>
                          </button>

                          <button 
                            onClick={openAccountModal} 
                            className="premium-hero-cta-button group !py-3 !px-6"
                          >
                            <span className="button-text">
                              {account.displayName}
                              {account.displayBalance
                                ? ` (${account.displayBalance})`
                                : ''}
                            </span>
                          </button>
                        </div>
                      );
                    })()}
                  </div>
                );
              }}
            </ConnectButton.Custom>
          </div>
        </div>
      </div>

      {/* Atmospheric Lighting */}
      <div className="spotlight spotlight-1"></div>
      <div className="spotlight spotlight-2"></div>
      <div className="spotlight spotlight-3"></div>
    </section>
  );
};

export default HeroSection;