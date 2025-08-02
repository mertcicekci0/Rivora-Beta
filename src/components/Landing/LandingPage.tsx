import React from 'react';
import HeroSection from './HeroSection';
import FeatureHighlights from './FeatureHighlights';
import TrustIndicators from './TrustIndicators';
import CosmicBackground from '../Background/CosmicBackground';

interface LandingPageProps {
  onConnectWallet: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onConnectWallet }) => {
  return (
    <div className="min-h-screen bg-[#0E1014] relative overflow-hidden">
      <CosmicBackground />
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0E1014]/90 backdrop-blur-xl border-b border-[#8033ff]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-[#8033ff] to-[#00FFE0] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">1</span>
              </div>
              <span className="text-white font-bold text-xl">StopInch</span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-400 hover:text-[#8033ff] transition-colors duration-200">Features</a>
              <a href="#about" className="text-gray-400 hover:text-[#8033ff] transition-colors duration-200">About</a>
              <a href="#security" className="text-gray-400 hover:text-[#8033ff] transition-colors duration-200">Security</a>
              <a href="#docs" className="text-gray-400 hover:text-[#8033ff] transition-colors duration-200">Docs</a>
            </nav>

            {/* CTA */}
            <button
              onClick={onConnectWallet}
              className="bg-gradient-to-r from-[#8033ff] to-[#00FFE0] text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg hover:shadow-[#8033ff]/25 transition-all duration-200"
            >
              Launch dApp
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10">
        <HeroSection onConnectWallet={onConnectWallet} />
        <FeatureHighlights />
        <TrustIndicators />
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#8033ff]/20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-[#8033ff] to-[#00FFE0] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">1</span>
                </div>
                <span className="text-white font-bold text-xl">StopInch</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                The most advanced DeFi platform powered by AI. Experience the future of decentralized finance.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-[#8033ff] transition-colors">Twitter</a>
                <a href="#" className="text-gray-400 hover:text-[#8033ff] transition-colors">Discord</a>
                <a href="#" className="text-gray-400 hover:text-[#8033ff] transition-colors">Telegram</a>
                <a href="#" className="text-gray-400 hover:text-[#8033ff] transition-colors">GitHub</a>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-white font-bold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-[#8033ff] transition-colors">Swap</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#8033ff] transition-colors">Lending</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#8033ff] transition-colors">Portfolio</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#8033ff] transition-colors">Analytics</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-[#8033ff] transition-colors">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#8033ff] transition-colors">API</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#8033ff] transition-colors">Security</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#8033ff] transition-colors">Support</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[#8033ff]/20 mt-8 pt-8 flex justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 1StopInch. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-[#8033ff] transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-[#8033ff] transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;