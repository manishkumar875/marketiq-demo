"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  LayoutGrid,
  FileText,
  ClipboardList,
  FolderOpen,
  MessageSquare,
  Receipt,
  ArrowLeft,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { CLIENT_USER } from "@/lib/portal-data";

const navItems = [
  { label: "Active Projects", href: "/client-portal", icon: LayoutGrid },
  { label: "Research Reports", href: "/client-portal/reports", icon: FileText },
  { label: "Survey Responses", href: "/client-portal/responses", icon: ClipboardList },
  { label: "Files", href: "/client-portal/files", icon: FolderOpen },
  { label: "Messages", href: "/client-portal/messages", icon: MessageSquare },
  { label: "Invoices", href: "/client-portal/invoices", icon: Receipt },
];

function SidebarContent({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <>
      <Link href="/" onClick={onNavigate} className="flex items-center gap-2 px-2 mb-8">
        <div className="w-8 h-8 rounded-lg bg-blue-700 flex items-center justify-center shrink-0">
          <BarChart3 className="w-4 h-4 text-white" />
        </div>
        <span className="font-semibold text-slate-900 text-sm">MarketIQ</span>
      </Link>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-200 pt-4 mt-4">
        <Link
          href="/"
          onClick={onNavigate}
          className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-500 hover:text-blue-700 transition-colors mb-3"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to website
        </Link>
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-slate-50">
          <div className="w-8 h-8 rounded-full bg-blue-700 text-white text-xs font-semibold flex items-center justify-center shrink-0">
            {CLIENT_USER.initials}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-slate-900 truncate">{CLIENT_USER.name}</p>
            <p className="text-[11px] text-slate-500 truncate">{CLIENT_USER.company}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default function PortalSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeItem = navItems.find((i) => i.href === pathname);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-slate-200 bg-white px-4 py-6 h-screen sticky top-0">
        <SidebarContent pathname={pathname} />
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden sticky top-0 z-40 flex items-center justify-between bg-white border-b border-slate-200 px-4 h-14">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-700 flex items-center justify-center shrink-0">
            <BarChart3 className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-sm font-semibold text-slate-900">
            {activeItem?.label ?? "Client Portal"}
          </span>
        </div>
        <button
          onClick={() => setMobileOpen(true)}
          className="text-slate-600 p-1.5"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-slate-900/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative w-72 max-w-[85vw] bg-white h-full flex flex-col px-4 py-6 shadow-xl">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
            <SidebarContent pathname={pathname} onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
