import { BarChart3 } from "lucide-react";

const columns = [
  {
    title: "Company",
    links: ["About", "Careers", "Newsroom", "Contact"],
  },
  {
    title: "Services",
    links: [
      "Quantitative Research",
      "Qualitative Research",
      "Brand Health Tracking",
      "Product Testing",
    ],
  },
  {
    title: "Industries",
    links: ["FMCG", "Retail", "Healthcare", "Technology", "Financial Services"],
  },
  {
    title: "Resources",
    links: ["Case Studies", "Research Reports", "Methodology", "Help Center"],
  },
  {
    title: "Legal",
    links: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
  },
];

export default function Footer() {
  return (
    <footer className="surface-navy pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 pb-12 border-b border-white/10">
          {/* Brand column */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-white text-sm">MarketIQ</span>
            </a>
            <p className="text-xs text-slate-400 leading-relaxed max-w-[200px]">
              Global market research and consumer intelligence, accelerated by AI.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-xs text-slate-400 hover:text-blue-300 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8">
          <p className="text-xs text-slate-500">© 2026 MarketIQ Research, Inc. All rights reserved.</p>
          <p className="text-xs text-slate-500">ESOMAR-aligned · ISO 20252 certified</p>
        </div>
      </div>
    </footer>
  );
}
