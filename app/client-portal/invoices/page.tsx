import { INVOICES } from "@/lib/portal-data";
import { Badge } from "@/components/ui/badge";
import PageHeader from "@/components/portal/PageHeader";
import { Receipt, Download, DollarSign, AlertCircle } from "lucide-react";

const statusVariant: Record<string, "success" | "warning" | "danger"> = {
  Paid: "success",
  Due: "warning",
  Overdue: "danger",
};

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

export default function InvoicesPage() {
  const totalDue = INVOICES.filter((i) => i.status === "Due" || i.status === "Overdue").reduce((sum, i) => sum + i.amount, 0);
  const totalPaid = INVOICES.filter((i) => i.status === "Paid").reduce((sum, i) => sum + i.amount, 0);
  const overdueCount = INVOICES.filter((i) => i.status === "Overdue").length;

  return (
    <div>
      <PageHeader
        title="Invoices"
        description="View billing history and outstanding balances across all projects."
      />

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-500">Outstanding Balance</span>
            <DollarSign className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900">{formatCurrency(totalDue)}</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-500">Total Paid (YTD)</span>
            <Receipt className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900">{formatCurrency(totalPaid)}</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-500">Overdue Invoices</span>
            <AlertCircle className="w-4 h-4 text-red-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900">{overdueCount}</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          <span className="col-span-4">Project</span>
          <span className="col-span-2">Amount</span>
          <span className="col-span-2">Status</span>
          <span className="col-span-2">Due Date</span>
          <span className="col-span-2 text-right">Action</span>
        </div>
        <div className="divide-y divide-slate-100">
          {INVOICES.map((inv) => (
            <div key={inv.id} className="grid grid-cols-2 md:grid-cols-12 gap-3 md:gap-4 px-5 sm:px-6 py-4 hover:bg-slate-50 transition-colors items-center">
              <div className="col-span-2 md:col-span-4">
                <p className="text-sm font-medium text-slate-900">{inv.project}</p>
                <p className="text-xs text-slate-400 font-mono">{inv.id}</p>
              </div>
              <div className="md:col-span-2 text-sm font-medium text-slate-800">{formatCurrency(inv.amount)}</div>
              <div className="md:col-span-2">
                <Badge variant={statusVariant[inv.status]}>{inv.status}</Badge>
              </div>
              <div className="md:col-span-2 text-xs text-slate-500">{formatDate(inv.dueDate)}</div>
              <div className="md:col-span-2 md:text-right">
                <button className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-700 hover:text-blue-800">
                  <Download className="w-3.5 h-3.5" />
                  Invoice
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
