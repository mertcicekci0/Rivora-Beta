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
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0E1014] via-[#0A0E13] to-[#0E1014]"></div>
        {/* Subtle cosmic elements for dashboard */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-r from-[#8033ff]/10 to-[#00FFE0]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-r from-[#FF00A8]/10 to-[#8033ff]/10 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-gradient-to-r from-[#00FFE0]/10 to-[#FF00A8]/10 rounded-full blur-xl"></div>
        </div>
      </div>
      
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
