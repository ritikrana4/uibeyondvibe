"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Circle, Search } from "lucide-react";
import { useStepSequence } from "@/hooks/use-step-sequence";

const NODES = [
  { id: "root", label: "#root", depth: 0, isTarget: false },
  { id: "a", label: "<div>", depth: 1, isTarget: false },
  { id: "a0", label: "<span>", depth: 2, isTarget: false },
  { id: "a1", label: "<p> — target", depth: 2, isTarget: true },
  { id: "b", label: "<section>", depth: 1, isTarget: false },
  { id: "b0", label: "<ul>", depth: 2, isTarget: false },
  { id: "c", label: "<footer>", depth: 1, isTarget: false },
] as const;

// Depth-first, in child-index order. b/b0/c are never reached because the
// match under `a` is found first and the search returns immediately.
const VISIT_ORDER = ["root", "a", "a0", "a1"];

export function DomFinderTrace() {
  const { ref, step } = useStepSequence(VISIT_ORDER.length, 750);
  const currentId = VISIT_ORDER[Math.max(step, 0)];
  const found = step === VISIT_ORDER.length - 1;

  return (
    <div ref={ref} className="space-y-4">
      <div className="space-y-1 rounded-lg bg-zinc-50 p-3 font-mono text-[13px] dark:bg-zinc-950/40">
        {NODES.map((n) => {
          const visitIndex = VISIT_ORDER.indexOf(n.id);
          const visited = visitIndex !== -1 && visitIndex <= step;
          const isCurrent = n.id === currentId;
          const isMatch = n.isTarget && found;
          return (
            <motion.div
              key={n.id}
              animate={{ opacity: visitIndex === -1 ? 0.35 : 1 }}
              style={{ paddingLeft: n.depth * 20 }}
              className={`flex items-center gap-2 rounded px-1.5 py-1 transition-colors ${
                isMatch
                  ? "bg-emerald-100 dark:bg-emerald-500/15"
                  : isCurrent
                    ? "bg-amber-100 dark:bg-amber-500/15"
                    : ""
              }`}
            >
              {isMatch ? (
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
              ) : isCurrent ? (
                <Search className="h-3.5 w-3.5 shrink-0 text-amber-500" />
              ) : (
                <Circle
                  className={`h-3.5 w-3.5 shrink-0 ${visited ? "text-zinc-400 dark:text-zinc-600" : "text-zinc-200 dark:text-zinc-800"}`}
                />
              )}
              <span
                className={
                  isMatch
                    ? "font-semibold text-emerald-700 dark:text-emerald-300"
                    : visited
                      ? "text-zinc-700 dark:text-zinc-300"
                      : "text-zinc-400 dark:text-zinc-600"
                }
              >
                {n.label}
              </span>
            </motion.div>
          );
        })}
      </div>
      <motion.div
        animate={{ opacity: found ? 1 : 0 }}
        className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-400"
      >
        <CheckCircle2 className="h-4 w-4 shrink-0" />
        Found — path: [0, 1]. &lt;section&gt;, &lt;ul&gt;, and &lt;footer&gt; were
        never even checked.
      </motion.div>
    </div>
  );
}
