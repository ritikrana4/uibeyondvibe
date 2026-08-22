"use client";

import { motion } from "framer-motion";
import { useStepSequence } from "@/hooks/use-step-sequence";

const STEPS = [
  { label: "Unoptimized bundle", kb: 850, note: "Everything in one file, shipped as-is." },
  { label: "+ Code splitting", kb: 480, note: "Only the current route's code loads upfront." },
  { label: "+ Tree shaking", kb: 410, note: "Unused exports removed at build time." },
  { label: "+ Minification", kb: 260, note: "Whitespace, comments, and long names stripped." },
  { label: "+ Brotli compression", kb: 142, note: "Compressed in transit — this is what actually ships over the wire." },
];

export function BundleOptimization() {
  const { ref, step } = useStepSequence(STEPS.length, 700);
  const max = STEPS[0].kb;

  return (
    <div ref={ref} className="space-y-4">
      {STEPS.map((s, i) => {
        const active = step >= i;
        const widthPct = (s.kb / max) * 100;
        return (
          <div key={s.label}>
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className={active ? "font-medium text-zinc-700 dark:text-zinc-300" : "text-zinc-400 dark:text-zinc-600"}>
                {s.label}
              </span>
              <span
                className={`font-mono font-semibold ${active ? "text-indigo-600 dark:text-indigo-400" : "text-zinc-400 dark:text-zinc-600"}`}
              >
                {active ? `${s.kb} KB` : ""}
              </span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: active ? `${widthPct}%` : 0 }}
                transition={{ duration: 0.5 }}
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-indigo-400"
              />
            </div>
            {active && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-1 text-[11px] text-zinc-500 dark:text-zinc-500"
              >
                {s.note}
              </motion.p>
            )}
          </div>
        );
      })}
    </div>
  );
}
