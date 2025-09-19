import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, TrendingUp } from 'lucide-react';

interface SummaryCardsProps {
  students: any[];
}

export function SummaryCards({ students }: SummaryCardsProps) {
  const totalStudents = students.length;
  const avgCompletion = students.reduce((acc, s) => acc + s.engagement.completionRate, 0) / students.length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Students</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-primary">{totalStudents}</div>
          <p className="text-xs text-muted-foreground mt-1">
            <span className="text-secondary font-medium">+5%</span> from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Avg Completion Rate</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-primary">{avgCompletion.toFixed(1)}%</div>
          <p className="text-xs text-muted-foreground mt-1">
            <span className="text-accent font-medium">+3%</span> from last month
          </p>
        </CardContent>
      </Card>
    </div>
  );
}