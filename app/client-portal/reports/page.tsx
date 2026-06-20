import { REPORTS } from "@/lib/portal-data";
import { Badge } from "@/components/ui/badge";
import PageHeader from "@/components/portal/PageHeader";
import { FileText, Download } from "lucide-react";

const typeVariant: Record<string, "info" | "purple" | "warning" | "success"> = {
  "Executive Summary": "info",
  "Full Data Tables": "purple",
  "Topline Report": "warning",
  "Presentation Deck": "success",
};

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function ReportsPage() {
  return (
    <div>
      <PageHeader
        title="Research Reports"
        description="Download topline reports, executive summaries, and full data tables for your projects."
      />

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        {/* Desktop table header */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          <span className="col-span-5">Report</span>
          <span className="col-span-3">Type</span>
          <span className="col-span-2">Date</span>
          <span className="col-span-1">Size</span>
          <span className="col-span-1 text-right">Action</span>
        </div>

        <div className="divide-y divide-slate-100">
          {REPORTS.map((r) => (
            <div key={r.id} className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 px-5 sm:px-6 py-4 hover:bg-slate-50 transition-colors items-center">
              <div className="md:col-span-5 flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4 text-blue-700" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-900">{r.title}</p>
                  <p className="text-xs text-slate-500 truncate">{r.project}</p>
                </div>
              </div>
              <div className="md:col-span-3">
                <Badge variant={typeVariant[r.type]}>{r.type}</Badge>
              </div>
              <div className="md:col-span-2 text-xs text-slate-500">{formatDate(r.date)}</div>
              <div className="md:col-span-1 text-xs text-slate-500">{r.fileSize}</div>
              <div className="md:col-span-1 md:text-right">
                <button className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-700 hover:text-blue-800">
                  <Download className="w-3.5 h-3.5" />
                  <span className="md:hidden">Download</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
