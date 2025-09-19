'use client';

import { DashboardHeader } from "../app/components/dashboard-header";
import { DashboardSidebar } from "../app/components/dashboard-sidebar";
import { SummaryCards } from "../app/components/summary-cards";
import { EngagementChart } from "../app/components/engagement-chart";
import { AttendanceChart } from "../app/components/attendance-chart";
import { StudentQueries } from "../app/components/student-queries";
import { FilterControls } from "../app/components//filter-controls";
import { useDashboardData } from '@/hooks/useDashboardData';
import { Student } from "@/hooks/useDashboardData"; // Import for type consistency

export default function DashboardPage() {
  const { students, loading, getAttendanceTrend, getEngagementByGrade, applyFilters } = useDashboardData();

  if (loading) return <div className="text-center text-foreground">Loading...</div>;

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col lg:ml-64">
        <DashboardHeader />
        <main className="flex-1 p-4 lg:p-6 space-y-6">
          <FilterControls onFilterChange={(filters) => applyFilters(filters as any)} />
          <SummaryCards students={students} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <EngagementChart students={students} getEngagementByGrade={getEngagementByGrade} />
            <AttendanceChart students={students} getAttendanceTrend={getAttendanceTrend} />
            <StudentQueries students={students} />
          </div>
        </main>
      </div>
    </div>
  );
}