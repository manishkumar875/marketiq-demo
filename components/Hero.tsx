"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Globe2, Users, FolderCheck, ThumbsUp } from "lucide-react";

const trustIndicators = [
  { icon: Users, value: "10M+", label: "Respondents" },
  { icon: Globe2, value: "50+", label: "Countries" },
  { icon: FolderCheck, value: "1,000+", label: "Research Projects" },
  { icon: ThumbsUp, value: "98%", label: "Client Satisfaction" },
];

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden mesh-bg grid-pattern">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 border border-blue-200 bg-blue-50 rounded-full px-4 py-1.5 text-xs text-blue-800 font-semibold mb-8"
        >
          Global Market Research &amp; Consumer Insights
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gradient mb-6 leading-[1.12] max-w-4xl mx-auto"
        >
          Turning Consumer Data Into Business Growth
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Delivering actionable consumer insights, market intelligence, brand tracking, customer
          experience measurement, and strategic research solutions for businesses worldwide.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16"
        >
          <Button size="xl" className="group w-full sm:w-auto text-base font-semibold">
            Request Research Proposal
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button size="xl" variant="outline" className="w-full sm:w-auto text-base font-semibold">
            <FileText className="w-4 h-4" />
            Explore Solutions
          </Button>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-slate-200 rounded-2xl overflow-hidden max-w-4xl mx-auto border border-slate-200"
        >
          {trustIndicators.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="bg-white px-4 py-6 sm:py-7 flex flex-col items-center gap-2">
                <Icon className="w-5 h-5 text-blue-700" />
                <span className="text-xl sm:text-2xl font-bold text-slate-900">{item.value}</span>
                <span className="text-xs text-slate-500 text-center leading-tight">{item.label}</span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
