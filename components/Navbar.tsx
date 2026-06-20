"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BarChart3, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Solutions", href: "#solutions" },
  { label: "Insights Demo", href: "#demo" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-xl transition-colors duration-200 ${
        scrolled ? "bg-white/90 border-slate-200" : "bg-white/60 border-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <div className="w-8 h-8 rounded-lg bg-blue-700 flex items-center justify-center shadow-md shadow-blue-900/20 group-hover:bg-blue-800 transition-colors">
            <BarChart3 className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-slate-900 text-sm tracking-tight">MarketIQ</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-3 py-1.5 text-sm text-slate-600 hover:text-blue-700 transition-colors rounded-md hover:bg-blue-50"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/signup">Join Panel</Link>
          </Button>
          <Button size="sm">Request Proposal</Button>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="lg:hidden text-slate-600 hover:text-blue-700 p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 flex flex-col gap-1"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2.5 text-sm text-slate-600 hover:text-blue-700 transition-colors rounded-md hover:bg-blue-50"
            >
              {link.label}
            </a>
          ))}
          <div className="flex gap-2 mt-3">
            <Button variant="outline" size="sm" className="flex-1" asChild>
              <Link href="/signup" onClick={() => setMenuOpen(false)}>Join Panel</Link>
            </Button>
            <Button size="sm" className="flex-1">Request Proposal</Button>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
