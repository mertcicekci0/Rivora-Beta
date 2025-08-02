'use client';

import Header from '@/components/Layout/Header';
import CosmicBackground from '@/components/Background/CosmicBackground';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isConnected } = useAccount();
  const router = useRouter();

  useEffect(() => {
    // Wallet bağlı değilse landing page'e yönlendir
    if (!isConnected) {
      router.push('/');
    }
  }, [isConnected, router]);

  // Wallet bağlı değilse hiçbir şey render etme
  if (!isConnected) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0E1014] relative">
      <CosmicBackground />
      
      <Header />
      
      <main className="relative z-10 pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
      
      {/* Footer */}
      <footer className="relative z-10 mt-20 border-t border-[#8033ff]/20 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-r from-[#0075FF] to-[#9D4DFF] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xs">R</span>
              </div>
              <span className="text-white font-bold">Rivora</span>
            </div>
            <p className="text-gray-400 text-sm">
              © 2024 Rivora. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
