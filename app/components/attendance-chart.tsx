"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Download } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Student } from "@/hooks/useDashboardData";

interface AttendanceChartProps {
  students: Student[];
  getAttendanceTrend: () => any[]; // Can be refined later to a specific attendance type
}

export function AttendanceChart({ students, getAttendanceTrend }: AttendanceChartProps) {
  const attendanceTrendData = getAttendanceTrend().map((a) => ({ date: a.date, attendance: a.percentage }));

  const handleExport = async (format: "pdf" | "jpg") => {
    const element = document.getElementById("attendance-chart");
    if (!element) return;
    if (format === "jpg") {
      const canvas = await html2canvas(element);
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/jpeg");
      link.download = "attendance.jpg";
      link.click();
    } else {
      const canvas = await html2canvas(element);
      const pdf = new jsPDF();
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 10, 10, 180, 160);
      pdf.save("attendance.pdf");
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Attendance Trend</CardTitle>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={() => handleExport("pdf")}>
            <Download className="h-4 w-4 mr-1" /> PDF
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleExport("jpg")}>
            <Download className="h-4 w-4 mr-1" /> JPG
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div id="attendance-chart" className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={attendanceTrendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="date" stroke="#6B7280" fontSize={12} />
              <YAxis stroke="#6B7280" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="attendance"
                stroke="var(--chart-3)"
                strokeWidth={2}
                dot={{ fill: "var(--chart-3)", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground">Recent Attendance</h4>
          <div className="space-y-2">
            {students.flatMap((s) => s.attendance).slice(0, 3).map((row, index) => (
              <div key={index} className="flex justify-between items-center text-sm py-1">
                <span className="text-muted-foreground">{row.date}</span>
                <div className="flex space-x-4">
                  <span className="font-medium text-accent">{row.percentage}%</span>
                  <span className="text-muted-foreground">{row.absences} absent</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}