"use client";

import { motion } from "framer-motion";
import { Loader2, Zap } from "lucide-react";
import { useStepSequence } from "@/hooks/use-step-sequence";

const CALLS = [
  { call: "fib(10)", status: "miss", result: "55" },
  { call: "fib(10)", status: "hit", result: "55" },
  { call: "fib(7)", status: "miss", result: "13" },
  { call: "fib(10)", status: "hit", result: "55" },
  { call: "fib(7)", status: "hit", result: "13" },
] as const;

export function MemoizeCallLog() {
  const { ref, step } = useStepSequence(CALLS.length, 750);
  const cachedSoFar = new Set(
    CALLS.slice(0, step + 1)
      .filter((c) => c.status === "miss")
      .map((c) => c.call),
  ).size;

  return (
    <div ref={ref} className="space-y-3">
      <div className="space-y-2">
        {CALLS.map((c, i) => {
          const active = step >= i;
          const isMiss = c.status === "miss";
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={active ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3 }}
              className={`flex flex-wrap items-center gap-x-3 gap-y-1 rounded-lg border p-2.5 font-mono text-xs ${
                !active
                  ? "border-zinc-100 dark:border-zinc-800"
                  : isMiss
                    ? "border-amber-200 bg-amber-50/50 dark:border-amber-500/20 dark:bg-amber-500/5"
                    : "border-emerald-200 bg-emerald-50/50 dark:border-emerald-500/20 dark:bg-emerald-500/5"
              }`}
            >
              <span className="font-semibold text-zinc-700 dark:text-zinc-300">{c.call}</span>
              {active &&
                (isMiss ? (
                  <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
                    <Loader2 className="h-3 w-3" /> cache miss — computing…
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                    <Zap className="h-3 w-3" /> cache hit — instant
                  </span>
                ))}
              {active && (
                <span className="ml-auto text-zinc-500 dark:text-zinc-500">→ {c.result}</span>
              )}
            </motion.div>
          );
        })}
      </div>
      <p className="text-[11px] text-zinc-500 dark:text-zinc-500">
        Cache after {step >= 0 ? step + 1 : 0} call{step === 0 ? "" : "s"}:{" "}
        <span className="font-mono font-semibold text-zinc-700 dark:text-zinc-300">
          {cachedSoFar} unique argument{cachedSoFar === 1 ? "" : "s"} stored
        </span>
      </p>
    </div>
  );
}
