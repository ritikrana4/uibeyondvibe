"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useStepSequence } from "@/hooks/use-step-sequence";

const CODE_LINES = [
  "new PerformanceObserver((list) => {",
  "  for (const entry of list.getEntries()) {",
  "    console.log(entry.name, entry.startTime);",
  "  }",
  "}).observe({ type: 'largest-contentful-paint', buffered: true });",
];

export function PerformanceObserverDemo() {
  const { ref, step } = useStepSequence(CODE_LINES.length + 1, 350);

  return (
    <div ref={ref} className="space-y-3">
      <div className="space-y-1 rounded-lg bg-zinc-50 p-3 font-mono text-[11px] leading-relaxed dark:bg-zinc-950/40">
        {CODE_LINES.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -6 }}
            animate={step >= i ? { opacity: 1, x: 0 } : {}}
            className="text-zinc-700 dark:text-zinc-300"
          >
            {line}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={step >= CODE_LINES.length ? { opacity: 1, y: 0 } : {}}
        className="rounded-lg border border-emerald-100 bg-emerald-50/50 p-3 font-mono text-[11px] leading-relaxed text-emerald-800 dark:border-emerald-500/20 dark:bg-emerald-500/5 dark:text-emerald-300"
      >
        <div className="flex items-center gap-1.5 font-sans text-[11px] font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="h-3.5 w-3.5" /> Entry reported
        </div>
        <div className="mt-1.5">name: &quot;largest-contentful-paint&quot;</div>
        <div>startTime: 2104.3</div>
        <div>element: &quot;img.hero&quot;</div>
      </motion.div>
    </div>
  );
}
