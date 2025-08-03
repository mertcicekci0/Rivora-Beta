'use client'

import React, { useState, Suspense } from 'react';
import { useAccount } from 'wagmi';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import FinalCTA from '@/components/FinalCTA';
import CosmicBackground from '@/components/Background/CosmicBackground';
import Header from '@/components/Layout/Header';
import InsightScore from '@/components/Dashboard/InsightScore';
import SwapInterface from '@/components/Swap/SwapInterface';
import LendingProtocols from '@/components/Lending/LendingProtocols';
import ScoresOverview from '@/components/Scores/ScoresOverview';
import LimitOrderInterface from '@/components/LimitOrder/LimitOrderInterface';
import { ErrorBoundary } from '@/components/ErrorBoundary';

export default function Home() {
  const { isConnected } = useAccount();
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleConnectWallet = () => {
    // This will be handled by RainbowKit modal
  };

  const handleDisconnectWallet = () => {
    setActiveTab('dashboard');
  };

  // Landing Page Component
  const LandingPage = () => (
    <div className="min-h-screen bg-[#0B0A0F] text-white overflow-x-hidden relative">
      {/* Animated Starfield Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B0A0F] via-[#18181C] to-[#0B0A0F]"></div>
        <div className="starfield"></div>
        <div className="dust-particles"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <HeroSection onConnectWallet={handleConnectWallet} />
        <FeaturesSection />
        <FinalCTA onConnectWallet={handleConnectWallet} />
      </div>
    </div>
  );

  // Dashboard Content Component
  const DashboardContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <ErrorBoundary>
            <div className="space-y-6">
              <InsightScore />
            </div>
          </ErrorBoundary>
        );
      case 'scores':
        return (
          <ErrorBoundary>
            <div className="space-y-6">
              <ScoresOverview />
            </div>
          </ErrorBoundary>
        );
      case 'swap':
        return (
          <ErrorBoundary>
            <div className="max-w-2xl mx-auto">
              <SwapInterface />
            </div>
          </ErrorBoundary>
        );
      case 'lending':
        return (
          <ErrorBoundary>
            <LendingProtocols />
          </ErrorBoundary>
        );
      case 'limit-order':
        return (
          <ErrorBoundary>
            <LimitOrderInterface />
          </ErrorBoundary>
        );
      default:
        return (
          <ErrorBoundary>
            <div className="space-y-6">
              <InsightScore />
            </div>
          </ErrorBoundary>
        );
    }
  };

  // Dashboard App Component
  const DashboardApp = () => (
    <div className="min-h-screen bg-[#0E1014] text-white">
      <CosmicBackground />
      <Header 
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onDisconnect={handleDisconnectWallet}
      />
      <main className="container mx-auto px-6 py-8">
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
          </div>
        }>
          <DashboardContent />
        </Suspense>
      </main>
    </div>
  );

  // Conditional Rendering: Landing Page vs Dashboard
  if (!isConnected) {
    return <LandingPage />;
  }

  return <DashboardApp />;
}