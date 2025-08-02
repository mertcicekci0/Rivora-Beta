'use client';

import Portfolio3D from '@/components/Dashboard/Portfolio3D';
import AnalyticsChart from '@/components/Analytics/AnalyticsChart';

export default function PortfolioPage() {
  return (
    <div className="space-y-8">
      <Portfolio3D />
      <AnalyticsChart />
    </div>
  );
}
