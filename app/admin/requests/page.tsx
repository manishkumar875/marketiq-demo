"use client";

import { useState, useMemo } from "react";
import { RESEARCH_REQUESTS, type ResearchRequest } from "@/lib/admin-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import PageHeader from "@/components/portal/PageHeader";
import AdminToolbar from "@/components/admin/AdminToolbar";
import { X, Mail, Building2, Globe2, Users, DollarSign, Clock, Send } from "lucide-react";

const statusVariant: Record<ResearchRequest["status"], "slate" | "info" | "warning" | "success" | "danger"> = {
  Unreviewed: "slate",
  "In Review": "info",
  "Proposal Sent": "warning",
  Converted: "success",
  Declined: "danger",
};

const statusFilters = [
  { label: "All", value: "all" },
  { label: "Unreviewed", value: "Unreviewed" },
  { label: "In Review", value: "In Review" },
  { label: "Proposal Sent", value: "Proposal Sent" },
  { label: "Converted", value: "Converted" },
  { label: "Declined", value: "Declined" },
];

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function RequestsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<ResearchRequest | null>(null);
  const [draftNote, setDraftNote] = useState("");
  const [localNotes, setLocalNotes] = useState<Record<string, { id: string; author: string; date: string; text: string }[]>>({});

  const filtered = useMemo(() => {
    return RESEARCH_REQUESTS.filter((r) => {
      const matchesFilter = filter === "all" || r.status === filter;
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        r.contactName.toLowerCase().includes(q) ||
        r.company.toLowerCase().includes(q) ||
        r.researchType.toLowerCase().includes(q);
      return matchesFilter && matchesSearch;
    });
  }, [search, filter]);

  const unreviewedCount = RESEARCH_REQUESTS.filter((r) => r.status === "Unreviewed").length;

  const getNotes = (req: ResearchRequest) => [...req.notes, ...(localNotes[req.id] ?? [])];

  const handleAddNote = () => {
    if (!selected || !draftNote.trim()) return;
    const note = { id: `local-${Date.now()}`, author: "Alex Rivera", date: new Date().toISOString().slice(0, 10), text: draftNote.trim() };
    setLocalNotes((prev) => ({ ...prev, [selected.id]: [...(prev[selected.id] ?? []), note] }));
    setDraftNote("");
  };

  return (
    <div>
      <PageHeader
        title="Research Requests"
        description={`${RESEARCH_REQUESTS.length} requests submitted · ${unreviewedCount} awaiting first review`}
      />

      <AdminToolbar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search requests, company, type..."
        filters={statusFilters}
        activeFilter={filter}
        onFilterChange={setFilter}
      />

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-3 border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          <span className="col-span-3">Contact</span>
          <span className="col-span-3">Research Type</span>
          <span className="col-span-2">Status</span>
          <span className="col-span-2">Budget</span>
          <span className="col-span-2">Submitted</span>
        </div>
        <div className="divide-y divide-slate-100">
          {filtered.map((r) => (
            <button
              key={r.id}
              onClick={() => setSelected(r)}
              className="w-full text-left grid grid-cols-2 lg:grid-cols-12 gap-3 lg:gap-4 px-5 sm:px-6 py-4 hover:bg-slate-50 transition-colors items-center"
            >
              <div className="col-span-2 lg:col-span-3">
                <p className="text-sm font-medium text-slate-900">{r.contactName}</p>
                <p className="text-xs text-slate-500">{r.company}</p>
              </div>
              <div className="lg:col-span-3 text-xs text-slate-600">{r.researchType}</div>
              <div className="lg:col-span-2">
                <Badge variant={statusVariant[r.status]}>{r.status}</Badge>
              </div>
              <div className="lg:col-span-2 text-xs text-slate-600">{r.budget}</div>
              <div className="lg:col-span-2 text-xs text-slate-400">{formatDate(r.submittedDate)}</div>
            </button>
          ))}
          {filtered.length === 0 && (
            <div className="px-6 py-12 text-center text-sm text-slate-400">No requests match your search or filter.</div>
          )}
        </div>
      </div>

      {/* Detail drawer */}
      {selected && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-slate-900/40" onClick={() => setSelected(null)} />
          <div className="relative w-full sm:w-[440px] max-w-full bg-white h-full shadow-xl flex flex-col">
            <div className="flex items-start justify-between px-6 py-5 border-b border-slate-200">
              <div>
                <p className="text-xs font-mono text-slate-400 mb-1">{selected.id}</p>
                <h2 className="text-lg font-semibold text-slate-900">{selected.contactName}</h2>
                <p className="text-sm text-slate-500">{selected.company}</p>
              </div>
              <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
              <div>
                <Badge variant={statusVariant[selected.status]}>{selected.status}</Badge>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2.5 text-slate-600">
                  <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="truncate">{selected.email}</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-600">
                  <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                  {selected.industry}
                </div>
                <div className="flex items-center gap-2.5 text-slate-600">
                  <Globe2 className="w-4 h-4 text-slate-400 shrink-0" />
                  {selected.countries}
                </div>
                <div className="flex items-center gap-2.5 text-slate-600">
                  <Users className="w-4 h-4 text-slate-400 shrink-0" />
                  {selected.sampleSize} respondents
                </div>
                <div className="flex items-center gap-2.5 text-slate-600">
                  <DollarSign className="w-4 h-4 text-slate-400 shrink-0" />
                  {selected.budget}
                </div>
                <div className="flex items-center gap-2.5 text-slate-600">
                  <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                  {selected.timeline}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Research Type</h3>
                <p className="text-sm text-slate-700">{selected.researchType}</p>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Objectives</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{selected.objectives}</p>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Notes</h3>
                <div className="space-y-3">
                  {getNotes(selected).length === 0 && (
                    <p className="text-xs text-slate-400">No notes yet.</p>
                  )}
                  {getNotes(selected).map((n) => (
                    <div key={n.id} className="bg-slate-50 border border-slate-100 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-slate-700">{n.author}</span>
                        <span className="text-[11px] text-slate-400">{formatDate(n.date)}</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{n.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200 px-6 py-4">
              <div className="flex gap-2">
                <Textarea
                  value={draftNote}
                  onChange={(e) => setDraftNote(e.target.value)}
                  placeholder="Add a note..."
                  rows={2}
                  className="flex-1"
                />
                <Button size="icon" onClick={handleAddNote} disabled={!draftNote.trim()} className="shrink-0 self-end h-10 w-10">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
