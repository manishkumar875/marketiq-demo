"use client";

import { useState, useMemo } from "react";
import { ADMIN_PROJECTS, type AdminProject } from "@/lib/admin-data";
import { Badge } from "@/components/ui/badge";
import PageHeader from "@/components/portal/PageHeader";
import AdminToolbar from "@/components/admin/AdminToolbar";
import { AlertTriangle, CheckCircle2, Clock } from "lucide-react";

const statusVariant: Record<AdminProject["status"], "slate" | "info" | "purple" | "warning" | "success"> = {
  Planning: "slate",
  "In Field": "info",
  Analysis: "purple",
  Reporting: "warning",
  Completed: "success",
};

const healthConfig: Record<AdminProject["health"], { variant: "success" | "warning" | "danger"; icon: typeof CheckCircle2 }> = {
  "On Track": { variant: "success", icon: CheckCircle2 },
  "At Risk": { variant: "warning", icon: AlertTriangle },
  Delayed: { variant: "danger", icon: Clock },
};

const statusFilters = [
  { label: "All", value: "all" },
  { label: "Planning", value: "Planning" },
  { label: "In Field", value: "In Field" },
  { label: "Analysis", value: "Analysis" },
  { label: "Reporting", value: "Reporting" },
  { label: "Completed", value: "Completed" },
];

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

export default function ProjectsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = useMemo(() => {
    return ADMIN_PROJECTS.filter((p) => {
      const matchesFilter = filter === "all" || p.status === filter;
      const q = search.toLowerCase();
      const matchesSearch =
        !q || p.name.toLowerCase().includes(q) || p.client.toLowerCase().includes(q) || p.owner.toLowerCase().includes(q);
      return matchesFilter && matchesSearch;
    });
  }, [search, filter]);

  const totalValue = ADMIN_PROJECTS.reduce((sum, p) => sum + p.value, 0);
  const atRiskCount = ADMIN_PROJECTS.filter((p) => p.health !== "On Track").length;

  return (
    <div>
      <PageHeader
        title="Project Management"
        description={`${ADMIN_PROJECTS.length} projects · ${formatCurrency(totalValue)} total contract value · ${atRiskCount} need attention`}
      />

      <AdminToolbar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search projects, client, owner..."
        filters={statusFilters}
        activeFilter={filter}
        onFilterChange={setFilter}
      />

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-3 border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          <span className="col-span-4">Project</span>
          <span className="col-span-2">Status</span>
          <span className="col-span-2">Health</span>
          <span className="col-span-2">Value</span>
          <span className="col-span-1">Owner</span>
          <span className="col-span-1">Due</span>
        </div>
        <div className="divide-y divide-slate-100">
          {filtered.map((p) => {
            const HealthIcon = healthConfig[p.health].icon;
            return (
              <div key={p.id} className="grid grid-cols-2 lg:grid-cols-12 gap-3 lg:gap-4 px-5 sm:px-6 py-4 hover:bg-slate-50 transition-colors items-center">
                <div className="col-span-2 lg:col-span-4">
                  <p className="text-sm font-medium text-slate-900">{p.name}</p>
                  <p className="text-xs text-slate-500">{p.client} · {p.id}</p>
                </div>
                <div className="lg:col-span-2">
                  <Badge variant={statusVariant[p.status]}>{p.status}</Badge>
                </div>
                <div className="lg:col-span-2">
                  <Badge variant={healthConfig[p.health].variant} className="gap-1">
                    <HealthIcon className="w-3 h-3" />
                    {p.health}
                  </Badge>
                </div>
                <div className="lg:col-span-2 text-sm font-medium text-slate-800">{formatCurrency(p.value)}</div>
                <div className="lg:col-span-1 text-xs text-slate-600">{p.owner}</div>
                <div className="lg:col-span-1 text-xs text-slate-400">{formatDate(p.dueDate)}</div>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="px-6 py-12 text-center text-sm text-slate-400">No projects match your search or filter.</div>
          )}
        </div>
      </div>
    </div>
  );
}
