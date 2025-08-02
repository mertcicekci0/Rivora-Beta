import React, { useState } from 'react';
import LandingPage from './components/Landing/LandingPage';
import Header from './components/Layout/Header';
import CosmicBackground from './components/Background/CosmicBackground';
import InsightScore from './components/Dashboard/InsightScore';
import Portfolio3D from './components/Dashboard/Portfolio3D';
import SwapInterface from './components/Swap/SwapInterface';
import LendingProtocols from './components/Lending/LendingProtocols';
import AnalyticsChart from './components/Analytics/AnalyticsChart';

function App() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleConnectWallet = () => {
    // Simulate wallet connection
    setIsWalletConnected(true);
  };

  // Show landing page if wallet is not connected
  if (!isWalletConnected) {
    return <LandingPage onConnectWallet={handleConnectWallet} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <InsightScore />
              <Portfolio3D />
            </div>
            <AnalyticsChart />
          </div>
        );
      case 'portfolio':
        return (
          <div className="space-y-8">
            <Portfolio3D />
            <AnalyticsChart />
          </div>
        );
      case 'swap':
        return (
          <div className="flex justify-center">
            <SwapInterface />
          </div>
        );
      case 'lending':
        return <LendingProtocols />;
      case 'analytics':
        return (
          <div className="space-y-8">
            <AnalyticsChart />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#0A0E13]/80 backdrop-blur-xl border border-[#8033ff]/30 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">Total Volume</h3>
                <div className="text-3xl font-bold text-[#8033ff]">$1.2M</div>
                <div className="text-[#32CD32] text-sm">+24.5%</div>
              </div>
              <div className="bg-[#0A0E13]/80 backdrop-blur-xl border border-[#8033ff]/30 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">Active Positions</h3>
                <div className="text-3xl font-bold text-[#00FFE0]">12</div>
                <div className="text-[#32CD32] text-sm">+2 this week</div>
              </div>
              <div className="bg-[#0A0E13]/80 backdrop-blur-xl border border-[#8033ff]/30 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">Avg. APY</h3>
                <div className="text-3xl font-bold text-[#FF00A8]">8.7%</div>
                <div className="text-[#32CD32] text-sm">+1.2%</div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0E1014] relative">
      <CosmicBackground />
      
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="relative z-10 pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>
      
      {/* Footer */}
      <footer className="relative z-10 mt-20 border-t border-[#8033ff]/20 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-r from-[#8033ff] to-[#00FFE0] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xs">1</span>
              </div>
              <span className="text-white font-bold">StopInch</span>
            </div>
            <p className="text-gray-400 text-sm">
              © 2024 1StopInch. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;