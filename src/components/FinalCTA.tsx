'use client'

import React from 'react';

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
            <button 
              onClick={onConnectWallet}
              className="final-cta-button group"
            >
              <span className="button-text">Connect Wallet</span>
              <span className="button-arrow">→</span>
              <div className="button-glow-effect"></div>
              <div className="button-ripple"></div>
              <div className="button-magnetic-field"></div>
            </button>
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