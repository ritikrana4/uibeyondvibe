"use client";

import { motion } from "framer-motion";
import { useStepSequence } from "@/hooks/use-step-sequence";

const MARKERS = [
  { x: 3, label: "Nav start", detail: null, color: "bg-zinc-400 dark:bg-zinc-500" },
  { x: 18, label: "TTFB", detail: "~180ms", color: "bg-sky-500" },
  { x: 34, label: "FCP", detail: "first pixels", color: "bg-violet-500" },
  { x: 58, label: "LCP", detail: "2.1s — good", color: "bg-emerald-500" },
  { x: 78, label: "Interaction → INP", detail: "140ms — good", color: "bg-amber-500" },
  { x: 96, label: "Layout shift → CLS", detail: "0.08 — good", color: "bg-rose-500" },
];

export function WebVitalsTimeline() {
  const { ref, step } = useStepSequence(MARKERS.length, 550);

  return (
    <div ref={ref} className="px-2 pt-10 pb-16">
      <div className="relative h-1 rounded-full bg-zinc-100 dark:bg-zinc-800">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-indigo-400"
          initial={{ width: 0 }}
          animate={{ width: `${MARKERS[Math.max(step, 0)]?.x ?? 0}%` }}
          transition={{ duration: 0.4 }}
        />
        {MARKERS.map((m, i) => {
          const active = step >= i;
          const above = i % 2 === 0;
          const edgeAlign = i === 0 ? "left" : i === MARKERS.length - 1 ? "right" : "center";
          return (
            <div key={m.label} className="absolute top-1/2" style={{ left: `${m.x}%` }}>
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                animate={active ? { scale: 1, opacity: 1 } : {}}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className={`absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full ring-4 ring-white dark:ring-zinc-900 ${m.color}`}
              />
              <motion.div
                initial={{ opacity: 0, y: above ? 6 : -6 }}
                animate={active ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 }}
                className={`absolute text-center ${above ? "-top-11" : "top-4"} ${
                  edgeAlign === "left"
                    ? "left-0 text-left"
                    : edgeAlign === "right"
                      ? "right-0 text-right"
                      : "left-1/2 -translate-x-1/2"
                }`}
                style={{ width: 110 }}
              >
                <p className="text-[11px] font-semibold whitespace-nowrap text-zinc-700 dark:text-zinc-300">
                  {m.label}
                </p>
                {m.detail && (
                  <p className="text-[10px] whitespace-nowrap text-zinc-500 dark:text-zinc-500">
                    {m.detail}
                  </p>
                )}
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
