"use client";

import { useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, ChevronRight, CheckCircle2, Loader2 } from "lucide-react";

const SURVEY_TEMPLATES: Record<string, { title: string; questions: string[] }> = {
  default: {
    title: "Brand Perception Survey",
    questions: [
      "How familiar are you with [Brand] on a scale of 1–10?",
      "Which 3 words best describe your impression of [Brand]?",
      "How likely are you to recommend [Brand] to a friend or colleague? (NPS)",
      "What is the primary reason you would / wouldn't choose [Brand] over competitors?",
      "How has your perception of [Brand] changed in the last 12 months?",
    ],
  },
  customer: {
    title: "Customer Satisfaction (CSAT) Study",
    questions: [
      "How satisfied are you with your most recent purchase? (1–5 stars)",
      "How easy was it to find what you were looking for on our website?",
      "Did our support team resolve your issue within an acceptable time?",
      "What one thing would you change about your experience with us?",
      "How likely are you to purchase from us again in the next 6 months?",
    ],
  },
  product: {
    title: "New Feature Validation Survey",
    questions: [
      "How often do you currently encounter the problem this feature solves?",
      "Rate the importance of each proposed feature (Max-Diff ranking)",
      "Which pricing model feels most fair for this capability?",
      "What would prevent you from using this feature immediately after launch?",
      "Would you pay for early access? If so, what is your acceptable price range?",
    ],
  },
  market: {
    title: "Market Sizing & Opportunity Survey",
    questions: [
      "Which solutions do you currently use to address [problem]?",
      "How much do you spend annually on [category] tools or services?",
      "What is your single biggest frustration with existing solutions?",
      "If an ideal solution existed, how quickly would your company adopt it?",
      "Who is the primary decision-maker for purchasing [category] in your company?",
    ],
  },
};

const PROMPT_HINTS = [
  "brand perception study for a fintech startup",
  "customer satisfaction survey for an e-commerce brand",
  "product validation for a new SaaS feature",
  "market sizing for an enterprise software category",
];

function matchTemplate(prompt: string): keyof typeof SURVEY_TEMPLATES {
  const lower = prompt.toLowerCase();
  if (lower.includes("satisfaction") || lower.includes("csat") || lower.includes("customer")) return "customer";
  if (lower.includes("product") || lower.includes("feature") || lower.includes("validation")) return "product";
  if (lower.includes("market") || lower.includes("sizing") || lower.includes("opportunity")) return "market";
  return "default";
}

export default function SurveyBuilder() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [survey, setSurvey] = useState<{ title: string; questions: string[] } | null>(null);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setSurvey(null);
    setTimeout(() => {
      const key = matchTemplate(prompt);
      setSurvey(SURVEY_TEMPLATES[key]);
      setLoading(false);
    }, 1600);
  };

  return (
    <section id="demo" ref={ref} className="py-24 sm:py-32 relative bg-slate-50">
      {/* Ambient glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-blue-700 mb-4">AI Insight Generation</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gradient mb-5">
            Describe your objective. Get a research-ready survey.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto">
            Tell our AI what you want to learn. It drafts a methodologically sound survey instantly.
          </p>
        </motion.div>

        {/* Builder card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="border border-slate-200 rounded-2xl bg-white overflow-hidden shadow-sm"
        >
          {/* Input area */}
          <div className="p-6 border-b border-slate-100">
            <label className="block text-xs font-medium text-slate-500 mb-3 uppercase tracking-wider">
              Research objective
            </label>
            <div className="flex gap-3">
              <input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
                placeholder="e.g. brand perception study for a fintech startup..."
                className="flex-1 h-11 px-4 rounded-lg border border-slate-200 bg-white text-sm text-foreground placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all"
              />
              <Button
                onClick={handleGenerate}
                disabled={loading || !prompt.trim()}
                className="shrink-0 h-11 px-5 font-semibold"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Generate
                  </>
                )}
              </Button>
            </div>

            {/* Hint chips */}
            <div className="flex flex-wrap gap-2 mt-3">
              {PROMPT_HINTS.map((hint) => (
                <button
                  key={hint}
                  onClick={() => setPrompt(hint)}
                  className="text-[11px] text-slate-500 border border-slate-200 rounded-full px-3 py-1 hover:text-blue-700 hover:border-blue-300 transition-colors bg-slate-50"
                >
                  {hint}
                </button>
              ))}
            </div>
          </div>

          {/* Output */}
          <div className="p-6 min-h-[240px]">
            <AnimatePresence mode="wait">
              {!survey && !loading && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex flex-col items-center justify-center text-center py-10"
                >
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center mb-4">
                    <Sparkles className="w-5 h-5 text-slate-400" />
                  </div>
                  <p className="text-slate-500 text-sm">Your AI-generated survey will appear here</p>
                </motion.div>
              )}

              {loading && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-10 gap-4"
                >
                  <div className="flex gap-2">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 rounded-full bg-blue-600"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-slate-500">AI is generating your survey…</p>
                </motion.div>
              )}

              {survey && !loading && (
                <motion.div
                  key="survey"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h3 className="font-semibold text-slate-900">{survey.title}</h3>
                      <p className="text-xs text-slate-500 mt-0.5">{survey.questions.length} questions · Est. 3 min completion</p>
                    </div>
                    <span className="text-xs font-medium text-emerald-700 border border-emerald-200 bg-emerald-50 rounded-full px-3 py-1">
                      Ready to deploy
                    </span>
                  </div>

                  <div className="space-y-3">
                    {survey.questions.map((q, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.08 }}
                        className="flex items-start gap-3 bg-slate-50 border border-slate-100 rounded-xl p-4"
                      >
                        <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                        <div>
                          <span className="text-xs font-medium text-slate-400 mr-2">Q{i + 1}</span>
                          <span className="text-sm text-slate-800">{q}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex gap-3 mt-6">
                    <Button className="flex-1" size="sm">
                      Deploy survey
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">Edit questions</Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
