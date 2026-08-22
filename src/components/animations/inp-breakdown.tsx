"use client";

import { motion } from "framer-motion";
import { CheckCircle2, MousePointerClick } from "lucide-react";
import { useStepSequence } from "@/hooks/use-step-sequence";
import { ThresholdBar, type ThresholdSegment, type ThresholdZone } from "@/components/ui/threshold-bar";

const SCALE_MAX = 600; // ms

const ZONES: ThresholdZone[] = [
  { end: 200, className: "bg-emerald-50 dark:bg-emerald-500/10" },
  { end: 500, className: "bg-amber-50 dark:bg-amber-500/10" },
  { end: 600, className: "bg-rose-50 dark:bg-rose-500/10" },
];

const PARTS: (ThresholdSegment & { detail: string })[] = [
  {
    label: "Input delay",
    value: 40,
    className: "bg-zinc-400 dark:bg-zinc-500",
    detail: "Time before the browser can even start handling the click — this is all the old FID metric measured.",
  },
  {
    label: "Processing time",
    value: 110,
    className: "bg-amber-400 dark:bg-amber-500",
    detail: "Your event handlers and any resulting work actually running.",
  },
  {
    label: "Presentation delay",
    value: 40,
    className: "bg-violet-400 dark:bg-violet-500",
    detail: "Time between the work finishing and the browser painting the visible result.",
  },
];

const TOTAL = PARTS.reduce((sum, p) => sum + p.value, 0);

export function InpBreakdown() {
  const { ref, step } = useStepSequence(PARTS.length + 1, 600);

  return (
    <div ref={ref}>
      <div className="mb-2 flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-500">
        <MousePointerClick className="h-3.5 w-3.5" /> User clicks a button…
      </div>
      <ThresholdBar zones={ZONES} segments={PARTS} scaleMax={SCALE_MAX} step={step} />
      <div className="flex justify-between px-0.5 text-[10px] text-zinc-400 dark:text-zinc-600">
        <span>0ms</span>
        <span className="relative -left-[4%]">200ms good</span>
        <span className="relative -left-[2%]">500ms poor</span>
        <span>600ms</span>
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
                {p.label} <span className="font-mono font-normal text-zinc-500 dark:text-zinc-500">· {p.value}ms</span>
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
        INP: {TOTAL}ms — good
      </motion.div>
    </div>
  );
}
