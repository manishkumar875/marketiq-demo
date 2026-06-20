"use client";

import { SURVEY_RESPONSES } from "@/lib/portal-data";
import PageHeader from "@/components/portal/PageHeader";
import { ClipboardList, Timer, TrendingUp } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

const chartData = SURVEY_RESPONSES.map((s) => ({
  name: s.project.length > 18 ? s.project.slice(0, 18) + "…" : s.project,
  fullName: s.project,
  completes: s.completes,
  target: s.target,
}));

export default function ResponsesPage() {
  const totalCompletes = SURVEY_RESPONSES.reduce((sum, s) => sum + s.completes, 0);
  const avgCompletionRate = Math.round(
    SURVEY_RESPONSES.reduce((sum, s) => sum + s.completionRate, 0) / SURVEY_RESPONSES.length
  );

  return (
    <div>
      <PageHeader
        title="Survey Responses"
        description="Live response counts and completion metrics across active and recent surveys."
      />

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-500">Total Completes</span>
            <ClipboardList className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900">{totalCompletes.toLocaleString()}</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-500">Avg. Completion Rate</span>
            <TrendingUp className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900">{avgCompletionRate}%</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-500">Surveys Tracked</span>
            <Timer className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900">{SURVEY_RESPONSES.length}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 mb-8">
        <h3 className="text-sm font-semibold text-slate-900 mb-1">Completes vs. Target</h3>
        <p className="text-xs text-slate-500 mb-5">Collected responses against sample targets, by project</p>
        <div className="w-full h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 8, right: 8, left: -16, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 11, fill: "#64748b" }}
                axisLine={{ stroke: "#e2e8f0" }}
                tickLine={false}
                interval={0}
                angle={-20}
                textAnchor="end"
                height={60}
              />
              <YAxis tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
              <Tooltip
                cursor={{ fill: "#f1f5f9" }}
                contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 12 }}
                labelFormatter={(_, payload) => payload?.[0]?.payload?.fullName ?? ""}
              />
              <Bar dataKey="target" fill="#dbeafe" radius={[4, 4, 0, 0]} name="Target" />
              <Bar dataKey="completes" fill="#1d4ed8" radius={[4, 4, 0, 0]} name="Completes" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          <span className="col-span-4">Project</span>
          <span className="col-span-2">Completes</span>
          <span className="col-span-2">Avg. Duration</span>
          <span className="col-span-2">Completion Rate</span>
          <span className="col-span-2">Last Updated</span>
        </div>
        <div className="divide-y divide-slate-100">
          {SURVEY_RESPONSES.map((s) => (
            <div key={s.id} className="grid grid-cols-2 md:grid-cols-12 gap-3 md:gap-4 px-5 sm:px-6 py-4 hover:bg-slate-50 transition-colors">
              <div className="col-span-2 md:col-span-4">
                <p className="text-sm font-medium text-slate-900">{s.project}</p>
                <p className="text-xs text-slate-400 font-mono">{s.id}</p>
              </div>
              <div className="md:col-span-2 text-sm text-slate-700">{s.completes.toLocaleString()} / {s.target.toLocaleString()}</div>
              <div className="md:col-span-2 text-sm text-slate-700">{s.avgDuration}</div>
              <div className="md:col-span-2">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-16 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: `${s.completionRate}%` }} />
                  </div>
                  <span className="text-xs text-slate-600">{s.completionRate}%</span>
                </div>
              </div>
              <div className="md:col-span-2 text-xs text-slate-500">{formatDate(s.lastUpdated)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
