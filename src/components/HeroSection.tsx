'use client'

import React, { useRef, useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';

interface HeroSectionProps {
  scrollY: number;
  mousePosition: { x: number; y: number };
}

const HeroSection: React.FC<HeroSectionProps> = ({ scrollY, mousePosition }) => {
  const orbRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { isConnected } = useAccount();

  // Wallet bağlandığında dashboard'a yönlendir
  useEffect(() => {
    if (isConnected) {
      setTimeout(() => {
        router.push('/dashboard');
      }, 1000); // 1 saniye bekle (animasyon için)
    }
  }, [isConnected, router]);

  useEffect(() => {
    if (orbRef.current) {
      const orb = orbRef.current;
      const title = document.querySelector('.rivora-title') as HTMLElement;
      const rect = orb.getBoundingClientRect();
      const orbCenterX = rect.left + rect.width / 2;
      const orbCenterY = rect.top + rect.height / 2;
      
      const deltaX = (mousePosition.x - orbCenterX) / window.innerWidth;
      const deltaY = (mousePosition.y - orbCenterY) / window.innerHeight;
      
      const rotateX = deltaY * 15;
      const rotateY = deltaX * 15;
      const scale = 1 + (Math.abs(deltaX) + Math.abs(deltaY)) * 0.1;
      
      orb.style.setProperty('--rotate-x', `${rotateX}deg`);
      orb.style.setProperty('--rotate-y', `${rotateY}deg`);
      orb.style.setProperty('--scale', scale.toString());
      
      // Parallax effect for typography material
      if (title) {
        const parallaxX = deltaX * 5; // 5% movement rate difference
        const parallaxY = deltaY * 5;
        title.style.setProperty('--parallax-x', `${parallaxX}px`);
        title.style.setProperty('--parallax-y', `${parallaxY}px`);
      }
    }
  }, [mousePosition]);

  // Particle dissolution effect
  useEffect(() => {
    if (particlesRef.current && scrollY > 200) {
      const particles = particlesRef.current;
      particles.style.opacity = Math.min(1, (scrollY - 200) / 300).toString();
    }
  }, [scrollY]);

  const heroOpacity = Math.max(0, 1 - scrollY / 400);
  const orbTransform = scrollY > 0 ? `translateY(${scrollY * 0.5}px) scale(${1 - scrollY / 1000})` : '';

  return (
    <section 
      className="relative w-full overflow-hidden"
      style={{ 
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {/* Particle Dissolution Effect */}
      <div 
        ref={particlesRef}
        className="dissolve-particles"
        style={{ opacity: 0 }}
      >
      </div>

      {/* Main Content Container */}
      <div 
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem',
          gap: '3rem'
        }}
      >
        {/* Orb */}
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <div 
            ref={orbRef}
            className="liquid-orb"
            style={{ transform: orbTransform }}
          >
            <div className="orb-core"></div>
            <div className="orb-liquid"></div>
            <div className="orb-glow-ring"></div>
            <div className="orb-reflection"></div>
            <div className="orb-caustics"></div>
          </div>
        </div>

        {/* Rivora Title */}
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <h1 className="hero-title" style={{ textAlign: 'center' }}>
            <span className="word-decode rivora-title" style={{ animationDelay: '0s' }}>
              Rivora
            </span>
          </h1>
        </div>
        
        {/* Connect Wallet Button */}
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <ConnectButton.Custom>
            {({
              account,
              chain,
              openAccountModal,
              openChainModal,
              openConnectModal,
              mounted,
            }) => {
              const ready = mounted;
              const connected = ready && account && chain;

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
                          className="premium-hero-cta-button group" 
                          onClick={openConnectModal} 
                          type="button"
                        >
                          <span className="button-text">CONNECT WALLET</span>
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
                          className="premium-hero-cta-button group" 
                          onClick={openChainModal} 
                          type="button"
                          style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)' }}
                        >
                          <span className="button-text">WRONG NETWORK</span>
                          <span className="button-arrow">⚠</span>
                          <div className="button-glow-effect"></div>
                          <div className="button-ripple"></div>
                          <div className="button-energy-field"></div>
                        </button>
                      );
                    }

                    return (
                      <div style={{ display: 'flex', gap: 12 }}>
                        <button
                          className="premium-hero-cta-button group"
                          onClick={openChainModal}
                          style={{ padding: '12px 20px', minWidth: 'auto' }}
                          type="button"
                        >
                          <span className="button-text">{chain.name}</span>
                          <div className="button-glow-effect"></div>
                          <div className="button-ripple"></div>
                          <div className="button-energy-field"></div>
                        </button>

                        <button
                          className="premium-hero-cta-button group"
                          onClick={openAccountModal}
                          type="button"
                        >
                          <span className="button-text">
                            {account.displayName}
                            {account.displayBalance
                              ? ` (${account.displayBalance})`
                              : ''}
                          </span>
                          <span className="button-arrow">👤</span>
                          <div className="button-glow-effect"></div>
                          <div className="button-ripple"></div>
                          <div className="button-energy-field"></div>
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
          
      {/* Atmospheric Lighting */}
      <div className="spotlight spotlight-1"></div>
      <div className="spotlight spotlight-2"></div>
      <div className="spotlight spotlight-3"></div>
    </section>
  );
};

export default HeroSection;