import { Button } from "@/components/ui/button";

export function DashboardHeader() {
  return (
    <header className="bg-card border-b border-border p-4 lg:p-6">
      <div className="ml-12 lg:ml-0">
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground text-balance">Fayeda Marketing Dashboard</h1>
        <p className="text-muted-foreground mt-1 text-pretty">Insights for Grades 9-12 National Exam Prep</p>
      </div>
    </header>
  );
}
