"use client";

import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { useStepSequence } from "@/hooks/use-step-sequence";

export function ClsShiftDemo() {
  const { ref, step } = useStepSequence(2, 1400);
  const loaded = step >= 1;

  return (
    <div ref={ref} className="grid gap-4 sm:grid-cols-2">
      <div className="rounded-lg border border-rose-100 p-3 dark:border-rose-500/20">
        <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-rose-600 dark:text-rose-400">
          <AlertTriangle className="h-3.5 w-3.5" /> No reserved space
        </p>
        <div className="rounded bg-zinc-50 p-3 dark:bg-zinc-950/40">
          <div className="h-3 w-2/3 rounded bg-zinc-300 dark:bg-zinc-700" />
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: loaded ? 48 : 0 }}
            transition={{ duration: 0.4 }}
            className="my-2 overflow-hidden rounded bg-rose-300 dark:bg-rose-500/60"
          />
          <div className="h-2 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="mt-1.5 h-2 w-5/6 rounded bg-zinc-200 dark:bg-zinc-800" />
        </div>
        <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-500">
          {loaded ? "Ad loaded — the text jumped down. CLS: 0.24" : "Ad hasn't loaded yet…"}
        </p>
      </div>

      <div className="rounded-lg border border-emerald-100 p-3 dark:border-emerald-500/20">
        <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="h-3.5 w-3.5" /> Space reserved
        </p>
        <div className="rounded bg-zinc-50 p-3 dark:bg-zinc-950/40">
          <div className="h-3 w-2/3 rounded bg-zinc-300 dark:bg-zinc-700" />
          <div className="my-2 h-12 overflow-hidden rounded bg-zinc-100 dark:bg-zinc-800">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: loaded ? 1 : 0 }}
              transition={{ duration: 0.4 }}
              className="h-full w-full bg-emerald-300 dark:bg-emerald-500/60"
            />
          </div>
          <div className="h-2 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="mt-1.5 h-2 w-5/6 rounded bg-zinc-200 dark:bg-zinc-800" />
        </div>
        <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-500">
          {loaded ? "Ad loaded — nothing moved. CLS: 0" : "Space already reserved…"}
        </p>
      </div>
    </div>
  );
}
