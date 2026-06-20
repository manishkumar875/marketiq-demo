import { MESSAGES } from "@/lib/portal-data";
import PageHeader from "@/components/portal/PageHeader";

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function MessagesPage() {
  const unreadCount = MESSAGES.filter((m) => m.unread).length;

  return (
    <div>
      <PageHeader
        title="Messages"
        description={`Conversations with your research team. ${unreadCount > 0 ? `${unreadCount} unread.` : "All caught up."}`}
      />

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100">
        {MESSAGES.map((m) => (
          <div
            key={m.id}
            className={`flex items-start gap-4 px-5 sm:px-6 py-4 hover:bg-slate-50 transition-colors cursor-pointer ${
              m.unread ? "bg-blue-50/40" : ""
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-blue-700 text-white text-xs font-semibold flex items-center justify-center shrink-0">
              {m.avatarInitials}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-3 mb-0.5">
                <div className="flex items-center gap-2 min-w-0">
                  <span className={`text-sm truncate ${m.unread ? "font-semibold text-slate-900" : "font-medium text-slate-700"}`}>
                    {m.from}
                  </span>
                  <span className="text-xs text-slate-400 hidden sm:inline shrink-0">· {m.role}</span>
                </div>
                <span className="text-xs text-slate-400 shrink-0">{formatDate(m.date)}</span>
              </div>
              <p className="text-xs text-slate-500 mb-1 truncate">{m.project}</p>
              <p className={`text-sm truncate ${m.unread ? "text-slate-800" : "text-slate-500"}`}>{m.preview}</p>
            </div>
            {m.unread && <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 shrink-0" />}
          </div>
        ))}
      </div>
    </div>
  );
}
