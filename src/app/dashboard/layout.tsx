'use client';

import Header from '@/components/Layout/Header';
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
    <div className="min-h-screen bg-[#0f1419] relative">
      
      <Header />
      
      <main className="relative z-10 pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
      
      {/* Footer */}
      <footer className="relative z-10 mt-20 border-t border-[#2a2d47] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xs">1</span>
              </div>
              <span className="text-white font-bold">StopInch</span>
            </div>
            <p className="text-gray-400 text-sm">
              © 2024 StopInch. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
