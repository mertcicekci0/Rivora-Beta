'use client';

import InsightScore from '@/components/Dashboard/InsightScore';
import Portfolio3D from '@/components/Dashboard/Portfolio3D';
import AnalyticsChart from '@/components/Analytics/AnalyticsChart';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <InsightScore />
        <Portfolio3D />
      </div>
      <AnalyticsChart />
    </div>
  );
}
