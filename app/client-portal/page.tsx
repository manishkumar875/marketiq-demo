import { PROJECTS } from "@/lib/portal-data";
import { Badge } from "@/components/ui/badge";
import PageHeader from "@/components/portal/PageHeader";
import { Button } from "@/components/ui/button";
import { Calendar, Globe2, User, FolderKanban, Clock, CheckCircle2 } from "lucide-react";

const statusVariant: Record<string, "info" | "purple" | "warning" | "success" | "slate"> = {
  "In Field": "info",
  Analysis: "purple",
  Reporting: "warning",
  Completed: "success",
  Planning: "slate",
};

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function ActiveProjectsPage() {
  const inFieldCount = PROJECTS.filter((p) => p.status === "In Field").length;
  const completedCount = PROJECTS.filter((p) => p.status === "Completed").length;
  const totalSample = PROJECTS.reduce((sum, p) => sum + p.sampleCollected, 0);

  const summary = [
    { label: "Total Projects", value: PROJECTS.length, icon: FolderKanban },
    { label: "In Field", value: inFieldCount, icon: Clock },
    { label: "Completed", value: completedCount, icon: CheckCircle2 },
    { label: "Responses Collected", value: totalSample.toLocaleString(), icon: Globe2 },
  ];

  return (
    <div>
      <PageHeader
        title="Active Projects"
        description="Track progress across every research engagement with MarketIQ."
        action={<Button size="sm">Request New Project</Button>}
      />

      {/* Summary stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {summary.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-white border border-slate-200 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-slate-500">{s.label}</span>
                <Icon className="w-4 h-4 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-slate-900">{s.value}</p>
            </div>
          );
        })}
      </div>

      {/* Project cards */}
      <div className="space-y-4">
        {PROJECTS.map((p) => (
          <div key={p.id} className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 card-lift">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className="text-xs font-mono text-slate-400">{p.id}</span>
                  <Badge variant={statusVariant[p.status]}>{p.status}</Badge>
                </div>
                <h3 className="text-base font-semibold text-slate-900">{p.name}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{p.type}</p>
              </div>
              <div className="text-left sm:text-right shrink-0">
                <p className="text-xs text-slate-500">Lead Consultant</p>
                <p className="text-sm font-medium text-slate-800 flex items-center gap-1 sm:justify-end">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  {p.consultant}
                </p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                <span>Sample collected: {p.sampleCollected.toLocaleString()} / {p.sampleTarget.toLocaleString()}</span>
                <span className="font-medium text-slate-700">{p.progress}%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-blue-600 transition-all"
                  style={{ width: `${p.progress}%` }}
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(p.startDate)} – {formatDate(p.dueDate)}
              </span>
              <span className="flex items-center gap-1.5">
                <Globe2 className="w-3.5 h-3.5" />
                {p.countries.join(", ")}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
