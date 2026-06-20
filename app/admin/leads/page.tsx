"use client";

import { useState, useMemo } from "react";
import { LEADS, type Lead } from "@/lib/admin-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import PageHeader from "@/components/portal/PageHeader";
import AdminToolbar from "@/components/admin/AdminToolbar";
import { X, Mail, Phone, Building2, DollarSign, User, Send } from "lucide-react";

const statusVariant: Record<Lead["status"], "slate" | "info" | "purple" | "warning" | "success" | "danger"> = {
  New: "slate",
  Contacted: "info",
  Qualified: "purple",
  "Proposal Sent": "warning",
  Won: "success",
  Lost: "danger",
};

const statusFilters = [
  { label: "All", value: "all" },
  { label: "New", value: "New" },
  { label: "Contacted", value: "Contacted" },
  { label: "Qualified", value: "Qualified" },
  { label: "Proposal Sent", value: "Proposal Sent" },
  { label: "Won", value: "Won" },
  { label: "Lost", value: "Lost" },
];

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

export default function LeadsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<Lead | null>(null);
  const [draftNote, setDraftNote] = useState("");
  const [localNotes, setLocalNotes] = useState<Record<string, { id: string; author: string; date: string; text: string }[]>>({});

  const filtered = useMemo(() => {
    return LEADS.filter((l) => {
      const matchesFilter = filter === "all" || l.status === filter;
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        l.name.toLowerCase().includes(q) ||
        l.company.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        l.industry.toLowerCase().includes(q);
      return matchesFilter && matchesSearch;
    });
  }, [search, filter]);

  const totalPipelineValue = LEADS.filter((l) => !["Won", "Lost"].includes(l.status)).reduce((sum, l) => sum + l.estValue, 0);

  const getNotes = (lead: Lead) => [...lead.notes, ...(localNotes[lead.id] ?? [])];

  const handleAddNote = () => {
    if (!selected || !draftNote.trim()) return;
    const note = { id: `local-${Date.now()}`, author: "Alex Rivera", date: new Date().toISOString().slice(0, 10), text: draftNote.trim() };
    setLocalNotes((prev) => ({ ...prev, [selected.id]: [...(prev[selected.id] ?? []), note] }));
    setDraftNote("");
  };

  return (
    <div>
      <PageHeader
        title="Lead Management"
        description={`${LEADS.length} leads · ${formatCurrency(totalPipelineValue)} active pipeline value`}
      />

      <AdminToolbar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search leads, company, email..."
        filters={statusFilters}
        activeFilter={filter}
        onFilterChange={setFilter}
      />

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-3 border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          <span className="col-span-3">Contact</span>
          <span className="col-span-2">Industry</span>
          <span className="col-span-2">Status</span>
          <span className="col-span-2">Est. Value</span>
          <span className="col-span-2">Owner</span>
          <span className="col-span-1">Created</span>
        </div>
        <div className="divide-y divide-slate-100">
          {filtered.map((l) => (
            <button
              key={l.id}
              onClick={() => setSelected(l)}
              className="w-full text-left grid grid-cols-2 lg:grid-cols-12 gap-3 lg:gap-4 px-5 sm:px-6 py-4 hover:bg-slate-50 transition-colors items-center"
            >
              <div className="col-span-2 lg:col-span-3">
                <p className="text-sm font-medium text-slate-900">{l.name}</p>
                <p className="text-xs text-slate-500">{l.company}</p>
              </div>
              <div className="lg:col-span-2 text-xs text-slate-600">{l.industry}</div>
              <div className="lg:col-span-2">
                <Badge variant={statusVariant[l.status]}>{l.status}</Badge>
              </div>
              <div className="lg:col-span-2 text-sm font-medium text-slate-800">{formatCurrency(l.estValue)}</div>
              <div className="lg:col-span-2 text-xs text-slate-600">{l.owner}</div>
              <div className="lg:col-span-1 text-xs text-slate-400">{formatDate(l.createdDate)}</div>
            </button>
          ))}
          {filtered.length === 0 && (
            <div className="px-6 py-12 text-center text-sm text-slate-400">No leads match your search or filter.</div>
          )}
        </div>
      </div>

      {/* Detail drawer */}
      {selected && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-slate-900/40" onClick={() => setSelected(null)} />
          <div className="relative w-full sm:w-[420px] max-w-full bg-white h-full shadow-xl flex flex-col">
            <div className="flex items-start justify-between px-6 py-5 border-b border-slate-200">
              <div>
                <p className="text-xs font-mono text-slate-400 mb-1">{selected.id}</p>
                <h2 className="text-lg font-semibold text-slate-900">{selected.name}</h2>
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
                  <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                  {selected.phone}
                </div>
                <div className="flex items-center gap-2.5 text-slate-600">
                  <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                  {selected.industry}
                </div>
                <div className="flex items-center gap-2.5 text-slate-600">
                  <DollarSign className="w-4 h-4 text-slate-400 shrink-0" />
                  {formatCurrency(selected.estValue)} estimated value
                </div>
                <div className="flex items-center gap-2.5 text-slate-600">
                  <User className="w-4 h-4 text-slate-400 shrink-0" />
                  Owned by {selected.owner}
                </div>
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
