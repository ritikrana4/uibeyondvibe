"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ImageIcon } from "lucide-react";
import { useStepSequence } from "@/hooks/use-step-sequence";

const HINTS = [
  { name: "dns-prefetch", detail: "Resolve DNS only", cost: "cheapest" },
  { name: "preconnect", detail: "DNS + TCP + TLS", cost: "use sparingly" },
  { name: "preload", detail: "Fetch this page's own resource now, high priority", cost: "for this page" },
  { name: "prefetch", detail: "Fetch for a likely next navigation, low priority", cost: "for next page" },
];

function ResourceHints() {
  const { ref, step } = useStepSequence(HINTS.length, 500);
  return (
    <div ref={ref} className="space-y-2">
      {HINTS.map((h, i) => {
        const active = step >= i;
        return (
          <motion.div
            key={h.name}
            initial={{ opacity: 0, x: -10 }}
            animate={active ? { opacity: 1, x: 0 } : {}}
            className={`flex items-center gap-3 rounded-lg border p-2.5 transition-colors ${
              active
                ? "border-sky-100 bg-sky-50/40 dark:border-sky-500/20 dark:bg-sky-500/[0.06]"
                : "border-zinc-100 dark:border-zinc-800"
            }`}
          >
            <CheckCircle2
              className={`h-4 w-4 shrink-0 ${active ? "text-sky-500" : "text-zinc-300 dark:text-zinc-700"}`}
            />
            <code className="shrink-0 font-mono text-xs font-semibold text-zinc-800 dark:text-zinc-200">
              {h.name}
            </code>
            <span className="text-xs text-zinc-500 dark:text-zinc-500">{h.detail}</span>
            <span className="ml-auto shrink-0 rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
              {h.cost}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}

function LazyImageDemo() {
  const { ref, step } = useStepSequence(3, 800);
  const rows = [
    { name: "Hero image", note: "above the fold — loads immediately" },
    { name: "Image 2", note: "above the fold — loads immediately" },
    { name: "Image 3", note: "below the fold — loads only once scrolled near" },
  ];
  return (
    <div ref={ref} className="space-y-2">
      {rows.map((r, i) => {
        const loaded = step >= i;
        return (
          <div key={r.name} className="flex items-center gap-3 rounded-lg border border-zinc-100 p-2.5 dark:border-zinc-800">
            <div
              className={`flex h-10 w-14 shrink-0 items-center justify-center overflow-hidden rounded transition-colors ${
                loaded ? "bg-emerald-200 dark:bg-emerald-500/40" : "bg-zinc-100 dark:bg-zinc-800"
              }`}
            >
              {loaded ? (
                <ImageIcon className="h-4 w-4 text-emerald-700 dark:text-emerald-200" />
              ) : (
                <motion.div
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                  className="h-full w-full bg-zinc-200 dark:bg-zinc-700"
                />
              )}
            </div>
            <div>
              <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300">{r.name}</p>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-500">
                {i === 2 && !loaded ? "waiting to scroll into view…" : r.note}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function LoadingOptimizations() {
  return (
    <div className="space-y-5">
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-500">
          Resource hints
        </p>
        <ResourceHints />
      </div>
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-500">
          loading=&quot;lazy&quot; in action
        </p>
        <LazyImageDemo />
      </div>
    </div>
  );
}
