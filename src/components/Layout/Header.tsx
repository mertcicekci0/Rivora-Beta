'use client'

import React from 'react';
import { Home, PieChart, ArrowLeftRight, Coins, TrendingUp, LogOut, Target, BarChart3 } from 'lucide-react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onDisconnect: () => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange, onDisconnect }) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'scores', label: 'Scores', icon: PieChart },
    { id: 'swap', label: 'Swap', icon: ArrowLeftRight },
    { id: 'lending', label: 'Lending', icon: Coins },
    { id: 'limit-order', label: 'Limit Order', icon: Target },
  ];

  return (
    <header className="glassmorphism border-b border-white/10 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full cosmic-gradient flex items-center justify-center">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <h1 className="text-2xl font-bold cosmic-text-gradient">Rivora</h1>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'tab-active bg-purple-500/20'
                      : 'tab-inactive hover:bg-white/5'
                  }`}
                >
                  <Icon size={18} />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Account & Network Info */}
          <div className="flex items-center space-x-3">
            <ConnectButton chainStatus="icon" accountStatus="address" showBalance={false} />
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden mt-4 flex overflow-x-auto space-x-4 pb-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg whitespace-nowrap transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'tab-active bg-purple-500/20'
                    : 'tab-inactive hover:bg-white/5'
                }`}
              >
                <Icon size={16} />
                <span className="text-xs font-medium">{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Header;