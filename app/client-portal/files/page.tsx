import { FILES } from "@/lib/portal-data";
import { Badge } from "@/components/ui/badge";
import PageHeader from "@/components/portal/PageHeader";
import { FileSpreadsheet, FileImage, FileSignature, Presentation, FileBox, Download } from "lucide-react";

const categoryIcon: Record<string, React.ComponentType<{ className?: string }>> = {
  "Raw Data": FileSpreadsheet,
  Questionnaire: FileImage,
  Report: FileBox,
  Presentation: Presentation,
  Contract: FileSignature,
};

const categoryVariant: Record<string, "info" | "purple" | "warning" | "success" | "slate"> = {
  "Raw Data": "purple",
  Questionnaire: "info",
  Report: "success",
  Presentation: "warning",
  Contract: "slate",
};

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function FilesPage() {
  return (
    <div>
      <PageHeader
        title="Files"
        description="All project files, questionnaires, contracts, and source data in one place."
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {FILES.map((f) => {
          const Icon = categoryIcon[f.category] ?? FileBox;
          return (
            <div key={f.id} className="bg-white border border-slate-200 rounded-xl p-5 card-lift">
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-blue-700" />
                </div>
                <button className="text-slate-400 hover:text-blue-700 transition-colors">
                  <Download className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm font-medium text-slate-900 mb-1 break-words">{f.name}</p>
              <p className="text-xs text-slate-500 mb-3 truncate">{f.project}</p>
              <div className="flex items-center justify-between">
                <Badge variant={categoryVariant[f.category]}>{f.category}</Badge>
                <span className="text-xs text-slate-400">{f.fileSize}</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-3">{formatDate(f.date)}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
