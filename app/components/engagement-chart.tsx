"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Download } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Student } from "@/hooks/useDashboardData";

interface EngagementChartProps {
  students: Student[];
  getEngagementByGrade: () => Record<number, { totalSessions: number; totalDuration: number; count: number }>;
}

export function EngagementChart({ students, getEngagementByGrade }: EngagementChartProps) {
  const engagementData = Object.entries(getEngagementByGrade()).map(([grade, { totalSessions, totalDuration, count }]) => ({
    grade: `Grade ${grade}`,
    sessions: totalSessions / count,
    duration: (totalDuration / count) * 60, // Convert to minutes for consistency
  }));

  const handleExport = async (format: "pdf" | "jpg") => {
    const element = document.getElementById("engagement-chart");
    if (!element) return;
    if (format === "jpg") {
      const canvas = await html2canvas(element);
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/jpeg");
      link.download = "engagement.jpg";
      link.click();
    } else {
      const canvas = await html2canvas(element);
      const pdf = new jsPDF();
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 10, 10, 180, 160);
      pdf.save("engagement.pdf");
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Engagement by Grade</CardTitle>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={() => handleExport("pdf")}>
            <Download className="h-4 w-4 mr-1" /> PDF
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleExport("jpg")}>
            <Download className="h-4 w-4 mr-1" /> JPG
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div id="engagement-chart" className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={engagementData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="grade" stroke="#6B7280" fontSize={12} />
              <YAxis stroke="#6B7280" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="sessions" fill="var(--chart-1)" name="Avg Sessions" />
              <Bar dataKey="duration" fill="var(--chart-2)" name="Avg Duration (min)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}