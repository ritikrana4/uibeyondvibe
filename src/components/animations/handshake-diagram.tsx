"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useStepSequence } from "@/hooks/use-step-sequence";

export interface HandshakeFrame {
  dir: "right" | "left";
  label: string;
  detail: string;
}

type Accent = "sky" | "emerald" | "violet" | "amber" | "rose";

const ACCENTS: Record<Accent, { line: string; chip: string; label: string }> = {
  sky: {
    line: "bg-sky-400 dark:bg-sky-500",
    chip: "border-sky-300 bg-sky-50 text-sky-700 dark:border-sky-500/30 dark:bg-sky-500/10 dark:text-sky-400",
    label: "text-sky-600 dark:text-sky-400",
  },
  emerald: {
    line: "bg-emerald-400 dark:bg-emerald-500",
    chip: "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-400",
    label: "text-emerald-600 dark:text-emerald-400",
  },
  violet: {
    line: "bg-violet-400 dark:bg-violet-500",
    chip: "border-violet-300 bg-violet-50 text-violet-700 dark:border-violet-500/30 dark:bg-violet-500/10 dark:text-violet-400",
    label: "text-violet-600 dark:text-violet-400",
  },
  amber: {
    line: "bg-amber-400 dark:bg-amber-500",
    chip: "border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-400",
    label: "text-amber-600 dark:text-amber-400",
  },
  rose: {
    line: "bg-rose-400 dark:bg-rose-500",
    chip: "border-rose-300 bg-rose-50 text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-400",
    label: "text-rose-600 dark:text-rose-400",
  },
};

export function HandshakeDiagram({
  frames,
  leftLabel = "Client",
  rightLabel = "Server",
  accent = "sky",
  stepDelay = 750,
  footer,
}: {
  frames: HandshakeFrame[];
  leftLabel?: string;
  rightLabel?: string;
  accent?: Accent;
  stepDelay?: number;
  footer?: React.ReactNode;
}) {
  const { ref, step } = useStepSequence(frames.length, stepDelay);

  const { line, chip, label } = ACCENTS[accent];

  return (
    <div ref={ref}>
      <div className="flex justify-between text-sm font-semibold text-zinc-700 dark:text-zinc-300">
        <span>{leftLabel}</span>
        <span>{rightLabel}</span>
      </div>
      <div className="relative mt-1 flex">
        <div className="absolute left-[5px] top-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-700" />
        <div className="absolute right-[5px] top-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-700" />
        <div className="flex-1 space-y-7 py-5">
          {frames.map((f, i) => {
            const active = step >= i;
            return (
              <motion.div
                key={f.label}
                initial={{ opacity: 0 }}
                animate={active ? { opacity: 1 } : {}}
                className={`flex items-center gap-3 ${f.dir === "left" ? "flex-row-reverse" : ""}`}
              >
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={active ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  style={{ transformOrigin: f.dir === "left" ? "right" : "left" }}
                  className={`h-px flex-1 ${line}`}
                />
                <div
                  className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
                    active ? chip : "border-zinc-100 text-zinc-300 dark:border-zinc-800 dark:text-zinc-700"
                  }`}
                >
                  {f.dir === "left" ? <ArrowLeft className="h-3 w-3" /> : <ArrowRight className="h-3 w-3" />}
                  {f.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      <div className="mt-1 space-y-1.5">
        {frames.map((f, i) => (
          <motion.p
            key={f.label}
            initial={{ opacity: 0 }}
            animate={step >= i ? { opacity: 1 } : {}}
            className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-500"
          >
            <span className={`font-mono font-semibold ${label}`}>{f.label}:</span> {f.detail}
          </motion.p>
        ))}
      </div>
      {footer && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={step >= frames.length - 1 ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="mt-4"
        >
          {footer}
        </motion.div>
      )}
    </div>
  );
}
