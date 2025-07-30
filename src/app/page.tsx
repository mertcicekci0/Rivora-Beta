'use client'

import React, { useEffect, useState } from 'react';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0A0F] text-white overflow-x-hidden relative">
      {/* Animated Starfield Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B0A0F] via-[#18181C] to-[#0B0A0F]"></div>
        <div className="starfield"></div>
        <div className="dust-particles"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <HeroSection scrollY={scrollY} mousePosition={mousePosition} />
        <FeaturesSection scrollY={scrollY} />
      </div>
    </div>
  );
}