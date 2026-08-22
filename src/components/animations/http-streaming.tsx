"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useStepSequence } from "@/hooks/use-step-sequence";

const CHUNKS = ["The", " quick", " brown", " fox", " jumps", " over", " a", " lazy", " dog."];

export function HttpStreaming() {
  const { ref, step, done } = useStepSequence(CHUNKS.length, 320);

  return (
    <div ref={ref} className="grid gap-4 sm:grid-cols-2">
      <div className="rounded-lg border border-zinc-100 p-4 dark:border-zinc-800">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-500">
          Buffered response
        </p>
        <div className="flex min-h-[72px] items-center justify-center rounded bg-zinc-50 p-3 text-sm dark:bg-zinc-950/40">
          {done ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-zinc-700 dark:text-zinc-300"
            >
              {CHUNKS.join("")}
            </motion.p>
          ) : (
            <div className="flex items-center gap-2 text-xs text-zinc-400 dark:text-zinc-600">
              <Loader2 className="h-3.5 w-3.5 animate-spin" /> waiting for the full response…
            </div>
          )}
        </div>
      </div>
      <div className="rounded-lg border border-emerald-100 p-4 dark:border-emerald-500/20">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
          Streamed response
        </p>
        <div className="flex min-h-[72px] items-center rounded bg-emerald-50/40 p-3 text-sm dark:bg-emerald-500/5">
          <p className="text-zinc-700 dark:text-zinc-300">
            {CHUNKS.slice(0, step + 1).join("")}
            {!done && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                className="inline-block w-1.5 translate-y-[1px] bg-emerald-500"
              >
                &nbsp;
              </motion.span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
