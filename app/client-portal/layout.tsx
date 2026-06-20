import type { Metadata } from "next";
import PortalSidebar from "@/components/portal/PortalSidebar";

export const metadata: Metadata = {
  title: "Client Portal — MarketIQ",
  description: "View your active research projects, reports, survey responses, files, messages, and invoices.",
};

export default function ClientPortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 lg:flex overflow-x-hidden">
      <PortalSidebar />
      <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 py-6 lg:py-10">{children}</main>
    </div>
  );
}
