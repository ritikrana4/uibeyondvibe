"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useStepSequence } from "@/hooks/use-step-sequence";
import { ThresholdBar, type ThresholdSegment, type ThresholdZone } from "@/components/ui/threshold-bar";

const SCALE_MAX = 5; // seconds

const ZONES: ThresholdZone[] = [
  { end: 2.5, className: "bg-emerald-50 dark:bg-emerald-500/10" },
  { end: 4, className: "bg-amber-50 dark:bg-amber-500/10" },
  { end: 5, className: "bg-rose-50 dark:bg-rose-500/10" },
];

const PARTS: (ThresholdSegment & { detail: string })[] = [
  {
    label: "TTFB",
    value: 0.5,
    className: "bg-sky-400 dark:bg-sky-500",
    detail: "Server response time — DNS, TCP, TLS, and server processing.",
  },
  {
    label: "Resource load delay",
    value: 0.3,
    className: "bg-amber-400 dark:bg-amber-500",
    detail: "Time before the browser even starts fetching the LCP resource — often blocked by other render-blocking assets.",
  },
  {
    label: "Resource load time",
    value: 0.9,
    className: "bg-violet-400 dark:bg-violet-500",
    detail: "How long the LCP resource itself (usually an image) takes to download.",
  },
  {
    label: "Render delay",
    value: 0.4,
    className: "bg-rose-400 dark:bg-rose-500",
    detail: "Time between the resource arriving and it actually being painted — often blocked by long tasks.",
  },
];

const TOTAL = PARTS.reduce((sum, p) => sum + p.value, 0);

export function LcpBreakdown() {
  const { ref, step } = useStepSequence(PARTS.length + 1, 600);

  return (
    <div ref={ref}>
      <ThresholdBar zones={ZONES} segments={PARTS} scaleMax={SCALE_MAX} step={step} />
      <div className="flex justify-between px-0.5 text-[10px] text-zinc-400 dark:text-zinc-600">
        <span>0s</span>
        <span className="relative -left-[6%]">2.5s good</span>
        <span className="relative -left-[2%]">4s poor</span>
        <span>5s</span>
      </div>

      <div className="mt-5 space-y-2.5">
        {PARTS.map((p, i) => (
          <motion.div
            key={p.label}
            initial={{ opacity: 0, x: -8 }}
            animate={step >= i ? { opacity: 1, x: 0 } : {}}
            className="flex items-start gap-2.5"
          >
            <span className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-sm ${p.className}`} />
            <div>
              <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                {p.label} <span className="font-mono font-normal text-zinc-500 dark:text-zinc-500">· {p.value}s</span>
              </p>
              <p className="text-[11px] leading-relaxed text-zinc-500 dark:text-zinc-500">{p.detail}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={step >= PARTS.length ? { opacity: 1 } : {}}
        className="mt-4 flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-400"
      >
        <CheckCircle2 className="h-4 w-4" />
        Total LCP: {TOTAL.toFixed(1)}s — good
      </motion.div>
    </div>
  );
}
