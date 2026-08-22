"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import { useStepSequence } from "@/hooks/use-step-sequence";

const LOCAL_CACHES = ["Browser cache", "OS cache", "Router cache"];

const HIERARCHY = [
  { name: "Root nameserver", note: "“I don’t know, but here’s who runs .com”" },
  { name: "TLD nameserver (.com)", note: "“I don’t know exactly, ask example.com’s server”" },
  { name: "Authoritative nameserver", note: "“It’s 93.184.216.34”" },
];

export function DnsResolution() {
  // 0: local caches miss · 1: resolver takes over
  // 2,3,4: root → tld → authoritative · 5: resolved + cached
  const { ref, step } = useStepSequence(6, 850);

  return (
    <div ref={ref} className="space-y-5">
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {LOCAL_CACHES.map((label) => (
          <motion.div
            key={label}
            initial={{ opacity: 0.35 }}
            animate={step >= 0 ? { opacity: 1 } : {}}
            className="flex flex-col items-center gap-1.5 rounded-lg border border-zinc-100 p-3 text-center dark:border-zinc-800"
          >
            {step >= 0 ? (
              <XCircle className="h-4 w-4 text-rose-400" />
            ) : (
              <div className="h-4 w-4" />
            )}
            <span className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">
              {label}
            </span>
            <span className="text-[10px] text-zinc-400 dark:text-zinc-600">
              no record
            </span>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center">
        <motion.div
          initial={{ scaleY: 0 }}
          animate={step >= 1 ? { scaleY: 1 } : {}}
          style={{ transformOrigin: "top" }}
          className="h-5 w-px bg-zinc-300 dark:bg-zinc-600"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={step >= 1 ? { opacity: 1, scale: 1 } : {}}
        className="mx-auto flex w-fit items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-400"
      >
        <Loader2 className={`h-4 w-4 ${step === 1 ? "animate-spin" : ""}`} />
        Recursive resolver (your ISP or 1.1.1.1 / 8.8.8.8)
      </motion.div>

      <div className="grid gap-3 sm:grid-cols-3">
        {HIERARCHY.map((h, i) => {
          const idx = i + 2;
          const active = step >= idx;
          const isLast = i === HIERARCHY.length - 1;
          const resolved = isLast && step >= 4;
          return (
            <motion.div
              key={h.name}
              initial={{ opacity: 0, y: 10 }}
              animate={active ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3 }}
              className={`rounded-lg border p-3 text-center transition-colors ${
                resolved
                  ? "border-emerald-300 bg-emerald-50 dark:border-emerald-500/30 dark:bg-emerald-500/10"
                  : active
                    ? "border-amber-200 bg-amber-50/60 dark:border-amber-500/20 dark:bg-amber-500/5"
                    : "border-zinc-100 dark:border-zinc-800"
              }`}
            >
              <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                {h.name}
              </p>
              {active && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-1 text-[11px] text-zinc-500 dark:text-zinc-500"
                >
                  {h.note}
                </motion.p>
              )}
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={step >= 5 ? { opacity: 1 } : {}}
        className="mx-auto flex w-fit items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-400"
      >
        <CheckCircle2 className="h-4 w-4" />
        Resolved: 93.184.216.34 — cached by the resolver for the record’s TTL
      </motion.div>
    </div>
  );
}
