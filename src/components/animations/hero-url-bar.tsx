"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Search } from "lucide-react";

const URL = "https://www.example.com/search?q=frontend+interview";

const STAGES = [
  { label: "DNS", color: "bg-amber-500" },
  { label: "TCP", color: "bg-sky-500" },
  { label: "TLS", color: "bg-emerald-500" },
  { label: "HTTP", color: "bg-violet-500" },
  { label: "Render", color: "bg-fuchsia-500" },
] as const;

export function HeroUrlBar() {
  const [typed, setTyped] = useState(0);
  const [phase, setPhase] = useState<"typing" | "loading" | "done">("typing");
  const [activeStage, setActiveStage] = useState(-1);

  useEffect(() => {
    if (phase !== "typing") return;
    if (typed >= URL.length) {
      const t = setTimeout(() => setPhase("loading"), 350);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setTyped((n) => n + 1), 35);
    return () => clearTimeout(t);
  }, [typed, phase]);

  useEffect(() => {
    if (phase !== "loading") return;
    if (activeStage >= STAGES.length - 1) {
      const t = setTimeout(() => setPhase("done"), 500);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setActiveStage((n) => n + 1), 420);
    return () => clearTimeout(t);
  }, [activeStage, phase]);

  useEffect(() => {
    if (phase !== "done") return;
    const t = setTimeout(() => {
      setTyped(0);
      setActiveStage(-1);
      setPhase("typing");
    }, 1800);
    return () => clearTimeout(t);
  }, [phase]);

  return (
    <div className="w-full max-w-lg overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-xl shadow-zinc-900/5 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center gap-1.5 border-b border-zinc-200 px-3 py-2.5 dark:border-zinc-800">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        <div className="ml-3 flex flex-1 items-center gap-2 rounded-md bg-zinc-100 px-3 py-1.5 dark:bg-zinc-800">
          <Lock className="h-3 w-3 shrink-0 text-emerald-600 dark:text-emerald-400" />
          <span className="truncate font-mono text-xs text-zinc-600 dark:text-zinc-300">
            {URL.slice(0, typed)}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
              className="inline-block w-[1px] translate-y-[1px] bg-zinc-500"
            >
              &nbsp;
            </motion.span>
          </span>
          <Search className="ml-auto h-3 w-3 shrink-0 text-zinc-400" />
        </div>
      </div>

      <div className="flex h-24 items-center justify-center gap-3 px-4">
        <AnimatePresence mode="wait">
          {phase === "typing" && (
            <motion.p
              key="prompt"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-sm text-zinc-400 dark:text-zinc-500"
            >
              waiting for Enter&hellip;
            </motion.p>
          )}
          {phase !== "typing" && (
            <motion.div
              key="stages"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2.5"
            >
              {STAGES.map((s, i) => (
                <div key={s.label} className="flex flex-col items-center gap-1.5">
                  <motion.span
                    className={`h-2.5 w-2.5 rounded-full ${
                      i <= activeStage || phase === "done" ? s.color : "bg-zinc-200 dark:bg-zinc-700"
                    }`}
                    animate={
                      i === activeStage && phase === "loading"
                        ? { scale: [1, 1.6, 1] }
                        : { scale: 1 }
                    }
                    transition={{ duration: 0.4 }}
                  />
                  <span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400">
                    {s.label}
                  </span>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
