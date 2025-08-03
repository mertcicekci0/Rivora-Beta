'use client'

import React, { useRef, useEffect } from 'react';

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
            <button 
              onClick={onConnectWallet}
              className="premium-hero-cta-button group"
            >
              <span className="button-text">Connect Wallet</span>
              <span className="button-arrow">→</span>
              <div className="button-glow-effect"></div>
              <div className="button-ripple"></div>
              <div className="button-energy-field"></div>
            </button>
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