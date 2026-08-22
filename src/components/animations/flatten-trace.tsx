"use client";

import { motion } from "framer-motion";
import { ArrowDownRight, Plus } from "lucide-react";
import { useStepSequence } from "@/hooks/use-step-sequence";

const STEPS = [
  { item: "1", depth: 0, action: "push", output: "[1]" },
  { item: "[2, 3, [4, 5]]", depth: 0, action: "descend", output: null },
  { item: "2", depth: 1, action: "push", output: "[1, 2]" },
  { item: "3", depth: 1, action: "push", output: "[1, 2, 3]" },
  { item: "[4, 5]", depth: 1, action: "descend", output: null },
  { item: "4", depth: 2, action: "push", output: "[1, 2, 3, 4]" },
  { item: "5", depth: 2, action: "push", output: "[1, 2, 3, 4, 5]" },
  { item: "6", depth: 0, action: "push", output: "[1, 2, 3, 4, 5, 6]" },
] as const;

export function FlattenTrace() {
  const { ref, step } = useStepSequence(STEPS.length, 600);

  let currentOutput = "[]";
  for (let i = 0; i <= step; i++) {
    const s = STEPS[i];
    if (s?.output) currentOutput = s.output;
  }

  return (
    <div ref={ref} className="space-y-3">
      <div className="rounded-lg bg-zinc-50 p-3 font-mono text-xs dark:bg-zinc-950/40">
        <span className="text-zinc-400 dark:text-zinc-600">input: </span>
        <span className="text-zinc-700 dark:text-zinc-300">[1, [2, 3, [4, 5]], 6]</span>
      </div>

      <div className="space-y-1.5">
        {STEPS.map((s, i) => {
          const active = step >= i;
          const isPush = s.action === "push";
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={active ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.25 }}
              style={{ paddingLeft: s.depth * 20 }}
              className="flex flex-wrap items-center gap-x-2 gap-y-0.5 font-mono text-xs"
            >
              {isPush ? (
                <Plus className="h-3 w-3 shrink-0 text-emerald-500" />
              ) : (
                <ArrowDownRight className="h-3 w-3 shrink-0 text-amber-500" />
              )}
              <span
                className={
                  isPush
                    ? "font-semibold text-emerald-700 dark:text-emerald-400"
                    : "font-semibold text-amber-700 dark:text-amber-400"
                }
              >
                {s.item}
              </span>
              <span className="text-[11px] text-zinc-400 dark:text-zinc-600">
                {isPush ? "→ push to output" : "→ it's an array, flatten it too"}
              </span>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        animate={{ opacity: step >= 0 ? 1 : 0 }}
        className="flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 font-mono text-sm font-semibold text-indigo-700 dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-400"
      >
        output: {currentOutput}
      </motion.div>
    </div>
  );
}
