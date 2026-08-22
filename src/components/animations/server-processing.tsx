"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useStepSequence } from "@/hooks/use-step-sequence";

const NODES = [
  { label: "Load balancer", detail: "Picks a healthy instance — round robin, least-connections, or by geography." },
  { label: "App server", detail: "Runs your route handler: auth, business logic, maybe renders HTML (SSR)." },
  { label: "Cache / database", detail: "A cache hit skips the database read entirely — often the biggest latency win." },
  { label: "Response assembled", detail: "Status code, headers, and a body get serialized and handed back." },
];

export function ServerProcessing() {
  const { ref, step } = useStepSequence(NODES.length, 700);

  return (
    <div ref={ref}>
      <div className="flex items-start">
        {NODES.map((n, i) => {
          const active = step >= i;
          return (
            <div key={n.label} className="flex flex-1 items-start last:flex-none">
              <motion.div
                initial={{ opacity: 0.3, y: 6 }}
                animate={active ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3 }}
                className="flex w-24 shrink-0 flex-col items-center gap-1.5 text-center sm:w-28"
              >
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-full border text-xs font-semibold transition-colors ${
                    active
                      ? "border-violet-300 bg-violet-50 text-violet-600 dark:border-violet-500/30 dark:bg-violet-500/10 dark:text-violet-400"
                      : "border-zinc-200 text-zinc-400 dark:border-zinc-700 dark:text-zinc-600"
                  }`}
                >
                  {active ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
                </span>
                <span className="text-[11px] font-medium leading-tight text-zinc-600 dark:text-zinc-400">
                  {n.label}
                </span>
              </motion.div>
              {i < NODES.length - 1 && (
                <div className="relative mt-4 h-px flex-1 overflow-hidden bg-zinc-200 dark:bg-zinc-700">
                  <motion.div
                    className="absolute inset-0 bg-violet-400"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: step > i ? 1 : 0 }}
                    style={{ transformOrigin: "left" }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-4 space-y-1">
        {NODES.map((n, i) => (
          <motion.p
            key={n.label}
            initial={{ opacity: 0 }}
            animate={step >= i ? { opacity: 1 } : {}}
            className="text-xs text-zinc-500 dark:text-zinc-500"
          >
            <span className="font-semibold text-violet-600 dark:text-violet-400">{n.label}:</span>{" "}
            {n.detail}
          </motion.p>
        ))}
      </div>
    </div>
  );
}
