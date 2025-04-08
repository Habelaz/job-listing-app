import dynamic from 'next/dynamic';

const DashboardClient = dynamic(() => import('./dashboardClient'), { ssr: false });

export default function DashboardPage() {
  return <DashboardClient />;
}
