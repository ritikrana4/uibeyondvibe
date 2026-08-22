"use client";

import { motion } from "framer-motion";
import { useStepSequence } from "@/hooks/use-step-sequence";

const COUNT = 8;

export function MemoryLeakDemo() {
  const { ref, step } = useStepSequence(COUNT, 450);

  return (
    <div ref={ref} className="grid gap-4 sm:grid-cols-2">
      <div className="rounded-lg border border-rose-100 p-3 dark:border-rose-500/20">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-rose-600 dark:text-rose-400">
          Listener never removed
        </p>
        <div className="flex flex-wrap gap-1.5">
          {Array.from({ length: COUNT }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={step >= i ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.3 }}
              className="h-6 w-6 rounded bg-rose-400 dark:bg-rose-500"
            />
          ))}
        </div>
        <p className="mt-2 text-xs leading-relaxed text-zinc-500 dark:text-zinc-500">
          Every mount adds a listener; nothing ever calls removeEventListener. The heap only grows.
        </p>
      </div>

      <div className="rounded-lg border border-emerald-100 p-3 dark:border-emerald-500/20">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
          Listener cleaned up
        </p>
        <div className="flex flex-wrap gap-1.5">
          {Array.from({ length: COUNT }).map((_, i) => {
            const filled = step >= i && step <= i + 1;
            return (
              <motion.div
                key={i}
                animate={{ scale: filled ? 1 : 0.5, opacity: filled ? 1 : 0.15 }}
                transition={{ duration: 0.3 }}
                className="h-6 w-6 rounded bg-emerald-400 dark:bg-emerald-500"
              />
            );
          })}
        </div>
        <p className="mt-2 text-xs leading-relaxed text-zinc-500 dark:text-zinc-500">
          Each cleanup function runs on unmount — the heap stays flat instead of climbing.
        </p>
      </div>
    </div>
  );
}
