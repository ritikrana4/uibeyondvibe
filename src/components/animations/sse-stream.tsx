"use client";

import { motion } from "framer-motion";
import { useStepSequence } from "@/hooks/use-step-sequence";

const EVENTS = [
  { event: "score-update", data: '{ "home": 1, "away": 0 }' },
  { event: "score-update", data: '{ "home": 1, "away": 1 }' },
  { event: "commentary", data: '"Great save by the keeper!"' },
  { event: "score-update", data: '{ "home": 2, "away": 1 }' },
];

export function ServerSentEvents() {
  const { ref, step } = useStepSequence(EVENTS.length + 1, 750);

  return (
    <div ref={ref} className="space-y-3">
      <div className="rounded-lg border border-emerald-100 bg-emerald-50/50 p-3 font-mono text-[11px] leading-relaxed text-emerald-800 dark:border-emerald-500/20 dark:bg-emerald-500/5 dark:text-emerald-300">
        GET /events HTTP/1.1
        <br />
        Accept: text/event-stream
      </div>
      <div className="flex items-center gap-2 text-xs font-medium text-emerald-600 dark:text-emerald-400">
        <motion.span
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.4, repeat: Infinity }}
          className="h-2 w-2 rounded-full bg-emerald-500"
        />
        Connection open — one request, held forever
      </div>
      <div className="space-y-2">
        {EVENTS.map((e, i) => {
          const active = step >= i + 1;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={active ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3 }}
              className="rounded-lg border border-zinc-100 p-2.5 font-mono text-[11px] leading-relaxed dark:border-zinc-800"
            >
              <span className="text-violet-500 dark:text-violet-400">event: {e.event}</span>
              <br />
              <span className="text-zinc-600 dark:text-zinc-400">data: {e.data}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
