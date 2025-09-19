import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Mail } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Student } from "@/hooks/useDashboardData"; // Import the Student type

interface StudentQueriesProps {
  students: Student[];
}

export function StudentQueries({ students }: StudentQueriesProps) {
  const queries = students.flatMap((s) =>
    s.queries.map((q) => ({ ...q, studentName: s.name }))
  );

  const handleExport = async (format: "pdf" | "jpg") => {
    const element = document.getElementById("student-queries");
    if (!element) return;
    if (format === "jpg") {
      const canvas = await html2canvas(element);
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/jpeg");
      link.download = "queries.jpg";
      link.click();
    } else {
      const canvas = await html2canvas(element);
      const pdf = new jsPDF();
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 10, 10, 180, 160);
      pdf.save("queries.pdf");
    }
  };

  const handleEmailReport = () => {
    const summary = { totalQueries: queries.length, openQueries: queries.filter((q) => q.status === "open").length };
    console.log("Sending report:", JSON.stringify(summary, null, 2));
    alert("Report sent! (Simulated)");
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Student Queries</CardTitle>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={() => handleExport("pdf")}>
            <Download className="h-4 w-4 mr-1" /> PDF
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleExport("jpg")}>
            <Download className="h-4 w-4 mr-1" /> JPG
          </Button>
        </div>
      </CardHeader>
      <CardContent id="student-queries">
        <div className="space-y-4">
          {queries.map((query, index) => (
            <div key={index} className="border-b border-border pb-4 last:border-b-0 last:pb-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-medium text-sm">{query.studentName}</h4>
                  <p className="text-xs text-muted-foreground">{query.category}</p>
                </div>
                <Badge
                  variant={query.status === "open" ? "destructive" : "secondary"}
                  className={query.status === "open" ? "bg-accent text-accent-foreground" : ""}
                >
                  {query.status}
                </Badge>
              </div>
              <p className="text-sm text-foreground text-pretty">{query.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 pt-4 border-t border-border">
          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90" onClick={handleEmailReport}>
            <Mail className="h-4 w-4 mr-2" /> Send Email Report
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}