"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Globe2, Database, BrainCircuit, ShieldCheck } from "lucide-react";

const pillars = [
  {
    icon: Globe2,
    title: "Global Respondent Panels",
    text: "Proprietary panels spanning 50+ countries, recruited and quality-screened to ensure representative, fraud-free samples for every study.",
  },
  {
    icon: BrainCircuit,
    title: "AI-Powered Insight Generation",
    text: "Machine learning models accelerate survey design, open-end coding, and cross-tabulation — turning raw data into narrative insight in hours.",
  },
  {
    icon: Database,
    title: "Rigorous Data Analytics",
    text: "Statistically validated methodologies, from MaxDiff to conjoint analysis, applied by a research team with decades of combined experience.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Methodology",
    text: "ESOMAR-aligned research standards and ISO-certified data handling give your stakeholders confidence in every number we report.",
  },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" ref={ref} className="py-24 sm:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left: narrative copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <p className="text-xs font-semibold tracking-widest uppercase text-blue-700 mb-4">About MarketIQ</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gradient mb-6 leading-tight">
              Three decades of research discipline, accelerated by AI
            </h2>

            <div className="space-y-5 text-slate-600 text-base leading-relaxed">
              <p>
                MarketIQ is a global market research and consumer intelligence firm helping
                organizations make confident, evidence-based decisions. We combine deep
                methodological expertise with modern AI infrastructure to deliver insight at a
                speed and scale that traditional research firms cannot match.
              </p>
              <p>
                Our work spans the full spectrum of research disciplines — quantitative and
                qualitative studies, customer experience measurement, brand health tracking,
                product testing, market segmentation, and competitive intelligence. Each
                engagement is grounded in statistically sound sampling, validated questionnaire
                design, and analyst-reviewed reporting.
              </p>
              <p>
                What sets us apart is the integration of artificial intelligence across the
                research lifecycle: AI-assisted survey construction reduces design time from
                weeks to minutes; natural language processing accelerates open-ended response
                coding across millions of verbatims; and predictive modeling surfaces patterns
                that inform not just what consumers think today, but what they are likely to do
                next.
              </p>
              <p>
                Behind every dashboard is a global respondent panel of more than 10 million
                profiled consumers across 50+ countries, continuously verified for quality and
                engagement. This panel infrastructure — combined with a research team that has
                delivered over 1,000 projects for clients ranging from emerging challenger
                brands to Fortune 500 enterprises — is why 98% of our clients return for their
                next study.
              </p>
              <p>
                Whether you need a single concept test or an always-on brand tracking program,
                MarketIQ provides the rigor of traditional market research with the speed and
                intelligence of a modern data company.
              </p>
            </div>
          </motion.div>

          {/* Right: pillar cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 grid sm:grid-cols-2 lg:grid-cols-1 gap-4"
          >
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="card-lift bg-slate-50 border border-slate-200 rounded-2xl p-6"
                >
                  <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-blue-700" />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-900 mb-2">{pillar.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{pillar.text}</p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
