'use client'

import React, { useEffect, useRef } from 'react';
import { Shield, TrendingUp, User } from 'lucide-react';

interface FeaturesSectionProps {
  scrollY: number;
}

const FeaturesSection: React.FC<FeaturesSectionProps> = ({ scrollY }) => {
  const featuresRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      icon: Shield,
      subtitle: "Security",
      title: "An Impenetrable Shield for Your Assets",
      description: "Military-grade encryption and multi-signature protection ensure your digital wealth remains untouchable in the ever-evolving DeFi landscape.",
      color: "from-[#0075FF]/30 to-cyan-400/20",
      accentColor: "#0075FF",
      delay: 0
    },
    {
      icon: TrendingUp,
      subtitle: "Clarity & Optimization",
      title: "See Your Portfolio in a New Light",
      description: "Advanced analytics and real-time insights transform complex data into actionable intelligence, revealing hidden opportunities.",
      color: "from-[#FF007A]/30 to-pink-400/20",
      accentColor: "#FF007A",
      delay: 0.3
    },
    {
      icon: User,
      subtitle: "Personalized Intelligence",
      title: "An Experience Built Only For You",
      description: "AI-driven recommendations and personalized strategies adapt to your unique financial goals and risk preferences.",
      color: "from-[#9D4DFF]/30 to-purple-400/20",
      accentColor: "#9D4DFF",
      delay: 0.6
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-feature-reveal');
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (featuresRef.current) {
      const featureCards = featuresRef.current.querySelectorAll('.feature-card');
      featureCards.forEach((card) => observer.observe(card));
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={featuresRef} className="relative py-32 z-10 overflow-hidden w-full" style={{ marginTop: '5vh' }}>
      <div className="w-full max-w-7xl mx-auto px-6">
        {features.map((feature, index) => (
          <div 
            key={index}
            className="feature-card mb-32 last:mb-0"
            style={{ 
              '--accent-color': feature.accentColor,
              '--animation-delay': `${feature.delay}s`
            } as React.CSSProperties}
          >
            <div className="feature-content items-center justify-center">
              <div className="feature-visual flex items-center justify-center w-full">
                <div className="icon-container mx-auto flex items-center justify-center">
                  <feature.icon size={48} className="feature-icon" />
                  <div className="icon-glow"></div>
                  <div className="icon-particles"></div>
                </div>
              </div>
              
              <div className="feature-text text-center w-full flex flex-col items-center justify-center">
                <div className="feature-subtitle">{feature.subtitle}</div>
                <h2 className="feature-title text-center w-full">
                  {feature.title.split(' ').map((word, wordIndex) => (
                    <span 
                      key={wordIndex}
                      className="word-unfold"
                      style={{ animationDelay: `${feature.delay + wordIndex * 0.1}s` }}
                    >
                      {word}
                    </span>
                  ))}
                </h2>
                <p className="feature-description text-center max-w-2xl mx-auto">
                  {feature.description}
                </p>
              </div>
            </div>
            
            <div className={`feature-background bg-gradient-to-r ${feature.color}`}></div>
            <div className="feature-border"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;