'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Menu, Globe, Bell } from 'lucide-react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Header: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  
  const getActiveTab = (pathname: string) => {
    if (pathname === '/dashboard') return '/dashboard';
    if (pathname.startsWith('/dashboard/portfolio')) return '/dashboard/portfolio';
    if (pathname.startsWith('/dashboard/swap')) return '/dashboard/swap';
    if (pathname.startsWith('/dashboard/lending')) return '/dashboard/lending';
    if (pathname.startsWith('/dashboard/analytics')) return '/dashboard/analytics';
    return '/dashboard';
  };

  const activeTab = getActiveTab(pathname);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', path: '/dashboard' },
    { id: 'portfolio', label: 'Portfolio', path: '/dashboard/portfolio' },
    { id: 'swap', label: 'Swap', path: '/dashboard/swap' },
    { id: 'lending', label: 'Lending', path: '/dashboard/lending' },
    { id: 'analytics', label: 'Analytics', path: '/dashboard/analytics' },
  ];

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0E1014]/90 backdrop-blur-xl border-b border-[#8033ff]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => handleNavigation('/')}>
            <div className="w-8 h-8 bg-gradient-to-r from-[#0075FF] to-[#9D4DFF] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <span className="text-white font-bold text-xl">Rivora</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.path)}
                className={`text-sm font-medium transition-all duration-200 hover:text-[#8033ff] ${
                  pathname === item.path
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
            <ConnectButton />
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