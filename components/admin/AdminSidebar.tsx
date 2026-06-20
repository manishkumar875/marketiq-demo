"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Users,
  FolderKanban,
  Inbox,
  ArrowLeft,
  Menu,
  X,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import { ADMIN_USER } from "@/lib/admin-data";

const navItems = [
  { label: "Lead Management", href: "/admin/leads", icon: Users },
  { label: "Project Management", href: "/admin/projects", icon: FolderKanban },
  { label: "Research Requests", href: "/admin/requests", icon: Inbox },
];

function SidebarContent({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <>
      <Link href="/" onClick={onNavigate} className="flex items-center gap-2 px-2 mb-1">
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
          <BarChart3 className="w-4 h-4 text-white" />
        </div>
        <span className="font-semibold text-white text-sm">MarketIQ</span>
      </Link>
      <div className="flex items-center gap-1.5 px-2 mb-8">
        <ShieldCheck className="w-3 h-3 text-blue-400" />
        <span className="text-[11px] font-medium text-blue-400 uppercase tracking-wider">Admin Console</span>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-white/10 text-white"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 pt-4 mt-4">
        <Link
          href="/"
          onClick={onNavigate}
          className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors mb-3"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to website
        </Link>
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/5">
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white text-xs font-semibold flex items-center justify-center shrink-0">
            {ADMIN_USER.initials}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-white truncate">{ADMIN_USER.name}</p>
            <p className="text-[11px] text-slate-400 truncate">{ADMIN_USER.role}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeItem = navItems.find((i) => pathname === i.href || pathname.startsWith(i.href + "/"));

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 surface-navy px-4 py-6 h-screen sticky top-0">
        <SidebarContent pathname={pathname} />
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden sticky top-0 z-40 flex items-center justify-between surface-navy px-4 h-14">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
            <BarChart3 className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-sm font-semibold text-white">
            {activeItem?.label ?? "Admin Console"}
          </span>
        </div>
        <button
          onClick={() => setMobileOpen(true)}
          className="text-slate-300 p-1.5"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-slate-900/60"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative w-72 max-w-[85vw] surface-navy h-full flex flex-col px-4 py-6 shadow-xl">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
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
