import React from 'react';
import { Menu, Wallet, Globe, Bell } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'swap', label: 'Swap' },
    { id: 'lending', label: 'Lending' },
    { id: 'analytics', label: 'Analytics' },
  ];

  return (
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
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`text-sm font-medium transition-all duration-200 hover:text-[#8033ff] ${
                  activeTab === item.id
                    ? 'text-[#8033ff] border-b-2 border-[#8033ff]'
                    : 'text-gray-400'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-[#8033ff] transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-[#8033ff] transition-colors">
              <Globe className="w-5 h-5" />
            </button>
            <button className="bg-gradient-to-r from-[#8033ff] to-[#00FFE0] text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg hover:shadow-[#8033ff]/25 transition-all duration-200">
              <Wallet className="w-4 h-4 inline mr-2" />
              Connect Wallet
            </button>
            <button className="md:hidden p-2 text-gray-400 hover:text-[#8033ff] transition-colors">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;