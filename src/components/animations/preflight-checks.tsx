"use client";

import { motion } from "framer-motion";
import { CheckCircle2, CircleDashed } from "lucide-react";
import { useStepSequence } from "@/hooks/use-step-sequence";

const CHECKS = [
  {
    title: "Is this even a URL?",
    detail:
      "No spaces, and it looks like domain.tld → treated as a URL. Otherwise, most browsers hand it to the default search engine instead.",
  },
  {
    title: "Is the domain on the HSTS preload list?",
    detail:
      "If so, Chromium/Firefox rewrite http:// to https:// before a single packet is sent — no redirect round trip needed.",
  },
  {
    title: "Do we have a fresh, cached response?",
    detail:
      "The HTTP cache (and bfcache for full page state) is checked for a usable match before touching the network.",
  },
  {
    title: "Is a service worker controlling this origin?",
    detail:
      "If one is registered, its fetch handler can intercept the request and answer from a cache — fully offline if it wants to.",
  },
];

export function PreflightChecks() {
  const { ref, step } = useStepSequence(CHECKS.length, 550);

  return (
    <div ref={ref} className="space-y-3">
      {CHECKS.map((c, i) => {
        const active = step >= i;
        return (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, x: -12 }}
            animate={active ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.35 }}
            className={`flex items-start gap-3 rounded-lg border p-3 transition-colors ${
              active
                ? "border-emerald-100 bg-emerald-50/40 dark:border-emerald-500/20 dark:bg-emerald-500/[0.06]"
                : "border-zinc-100 dark:border-zinc-800"
            }`}
          >
            {active ? (
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
            ) : (
              <CircleDashed className="mt-0.5 h-4 w-4 shrink-0 text-zinc-300 dark:text-zinc-700" />
            )}
            <div>
              <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                {c.title}
              </p>
              <p className="mt-0.5 text-xs leading-relaxed text-zinc-500 dark:text-zinc-500">
                {c.detail}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
