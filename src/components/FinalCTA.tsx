'use client'

import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

interface FinalCTAProps {
  onConnectWallet: () => void;
}

const FinalCTA: React.FC<FinalCTAProps> = ({ onConnectWallet }) => {
  return (
    <section className="relative py-32 z-10">
      <div className="container mx-auto px-6 text-center">
        <div className="final-cta-content">
          <h2 className="final-title">
            <span className="title-word" style={{ animationDelay: '0s' }}>Begin</span>
            <span className="title-word" style={{ animationDelay: '0.2s' }}>Your</span>
            <span className="title-word gradient-text" style={{ animationDelay: '0.4s' }}>Journey</span>
          </h2>
          
          <p className="final-subtitle">
            Step into the future of decentralized finance with confidence and clarity.
          </p>
          
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
                            className="final-cta-button group"
                          >
                            <span className="button-text">Connect Wallet</span>
                            <span className="button-arrow">→</span>
                            <div className="button-glow-effect"></div>
                            <div className="button-ripple"></div>
                            <div className="button-magnetic-field"></div>
                          </button>
                        );
                      }

                      if (chain.unsupported) {
                        return (
                          <button 
                            onClick={openChainModal} 
                            className="final-cta-button group bg-red-600 hover:bg-red-700"
                          >
                            <span className="button-text">Wrong network</span>
                            <span className="button-arrow">⚠️</span>
                            <div className="button-glow-effect"></div>
                            <div className="button-ripple"></div>
                            <div className="button-magnetic-field"></div>
                          </button>
                        );
                      }

                      return (
                        <div className="flex gap-4 items-center justify-center">
                          <button
                            onClick={openChainModal}
                            className="final-cta-button group !py-3 !px-6"
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
                            className="final-cta-button group !py-3 !px-6"
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
        
        {/* Ambient Background Elements */}
        <div className="final-ambient-1"></div>
        <div className="final-ambient-2"></div>
        <div className="final-ambient-3"></div>
      </div>
    </section>
  );
};

export default FinalCTA;