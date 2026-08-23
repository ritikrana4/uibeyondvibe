"use client";

import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";
import { useStepSequence } from "@/hooks/use-step-sequence";

const RESOLVE_STEPS = [
  { label: "p1", detail: 'resolves → "A"' },
  { label: "p3", detail: 'resolves → "C" — finishes before p2' },
  { label: "p2", detail: 'resolves → "B" — last one in, but not last in the output' },
] as const;

const REJECT_STEPS = [
  { label: "p1", detail: 'resolves → "A"' },
  { label: "p2", detail: 'rejects → "Oops"' },
] as const;

function ResolveScenario() {
  const { ref, step, done } = useStepSequence(RESOLVE_STEPS.length, 600);
  return (
    <div ref={ref} className="rounded-lg border border-zinc-100 p-3 dark:border-zinc-800">
      <p className="mb-2 text-xs font-semibold text-zinc-500 uppercase dark:text-zinc-500">
        Scenario: every promise resolves
      </p>
      <div className="space-y-1.5">
        {RESOLVE_STEPS.map((s, i) => {
          const active = step >= i;
          return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, x: -8 }}
              animate={active ? { opacity: 1, x: 0 } : {}}
              className="flex items-center gap-2 font-mono text-xs"
            >
              <CheckCircle2 className={`h-3.5 w-3.5 shrink-0 ${active ? "text-emerald-500" : "text-zinc-200 dark:text-zinc-700"}`} />
              <span className={active ? "font-semibold text-emerald-700 dark:text-emerald-400" : "text-zinc-300 dark:text-zinc-700"}>
                {s.label}
              </span>
              <span className="text-[11px] text-zinc-500 dark:text-zinc-500">{s.detail}</span>
            </motion.div>
          );
        })}
      </div>
      <motion.div
        animate={{ opacity: done ? 1 : 0 }}
        className="mt-2.5 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1.5 font-mono text-xs font-semibold text-indigo-700 dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-400"
      >
        promiseAll resolves: [&quot;A&quot;, &quot;B&quot;, &quot;C&quot;]
      </motion.div>
    </div>
  );
}

function RejectScenario() {
  const { ref, step, done } = useStepSequence(REJECT_STEPS.length, 600);
  return (
    <div ref={ref} className="rounded-lg border border-zinc-100 p-3 dark:border-zinc-800">
      <p className="mb-2 text-xs font-semibold text-zinc-500 uppercase dark:text-zinc-500">
        Scenario: one rejects
      </p>
      <div className="space-y-1.5">
        {REJECT_STEPS.map((s, i) => {
          const active = step >= i;
          const isReject = i === REJECT_STEPS.length - 1;
          return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, x: -8 }}
              animate={active ? { opacity: 1, x: 0 } : {}}
              className="flex items-center gap-2 font-mono text-xs"
            >
              {isReject ? (
                <XCircle className={`h-3.5 w-3.5 shrink-0 ${active ? "text-rose-500" : "text-zinc-200 dark:text-zinc-700"}`} />
              ) : (
                <CheckCircle2 className={`h-3.5 w-3.5 shrink-0 ${active ? "text-emerald-500" : "text-zinc-200 dark:text-zinc-700"}`} />
              )}
              <span
                className={
                  !active
                    ? "text-zinc-300 dark:text-zinc-700"
                    : isReject
                      ? "font-semibold text-rose-700 dark:text-rose-400"
                      : "font-semibold text-emerald-700 dark:text-emerald-400"
                }
              >
                {s.label}
              </span>
              <span className="text-[11px] text-zinc-500 dark:text-zinc-500">{s.detail}</span>
            </motion.div>
          );
        })}
      </div>
      <motion.div
        animate={{ opacity: done ? 1 : 0 }}
        className="mt-2.5 rounded-full border border-rose-200 bg-rose-50 px-3 py-1.5 font-mono text-xs font-semibold text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-400"
      >
        promiseAll rejects immediately: &quot;Oops&quot;
      </motion.div>
      <motion.p
        animate={{ opacity: done ? 1 : 0 }}
        className="mt-1.5 text-[11px] text-zinc-500 dark:text-zinc-500"
      >
        p3 is still pending — promiseAll doesn&apos;t wait for it.
      </motion.p>
    </div>
  );
}

export function PromiseAllTrace() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <ResolveScenario />
      <RejectScenario />
    </div>
  );
}
