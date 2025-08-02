'use client';

import AnalyticsChart from '@/components/Analytics/AnalyticsChart';

export default function AnalyticsPage() {
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
}
