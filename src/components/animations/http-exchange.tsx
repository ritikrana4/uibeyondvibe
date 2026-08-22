"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useStepSequence } from "@/hooks/use-step-sequence";

const REQUEST_LINES = [
  "GET /blog/post?id=42 HTTP/1.1",
  "Host: www.example.com",
  "User-Agent: Mozilla/5.0 (...)",
  "Accept: text/html,application/xhtml+xml",
  "Accept-Encoding: gzip, br",
  "Cookie: session=abc123",
  "Connection: keep-alive",
];

const RESPONSE_LINES = [
  "HTTP/1.1 200 OK",
  "Content-Type: text/html; charset=utf-8",
  "Cache-Control: max-age=600",
  "Content-Encoding: br",
  "Content-Length: 18823",
  "Set-Cookie: theme=dark; SameSite=Lax",
  "",
  "<!doctype html>...",
];

export function HttpExchange() {
  const { ref, step } = useStepSequence(3, 950);

  return (
    <div ref={ref} className="space-y-3">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={step >= 0 ? { opacity: 1, y: 0 } : {}}
        className="rounded-lg border border-sky-100 bg-sky-50/50 p-4 font-mono text-[11px] leading-relaxed text-sky-900 dark:border-sky-500/20 dark:bg-sky-500/5 dark:text-sky-200"
      >
        <p className="mb-2 font-sans text-[11px] font-semibold uppercase tracking-wide text-sky-500 dark:text-sky-400">
          Request →
        </p>
        {REQUEST_LINES.map((l, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={step >= 0 ? { opacity: 1 } : {}}
            transition={{ delay: i * 0.06 }}
          >
            {l}
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={step >= 1 ? { opacity: 1, y: [0, 5, 0] } : {}}
        transition={{ duration: 0.7 }}
        className="flex justify-center"
      >
        <ArrowDown className="h-5 w-5 text-zinc-400 dark:text-zinc-600" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={step >= 2 ? { opacity: 1, y: 0 } : {}}
        className="rounded-lg border border-violet-100 bg-violet-50/50 p-4 font-mono text-[11px] leading-relaxed text-violet-900 dark:border-violet-500/20 dark:bg-violet-500/5 dark:text-violet-200"
      >
        <p className="mb-2 font-sans text-[11px] font-semibold uppercase tracking-wide text-violet-500 dark:text-violet-400">
          ← Response
        </p>
        {RESPONSE_LINES.map((l, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={step >= 2 ? { opacity: 1 } : {}}
            transition={{ delay: i * 0.06 }}
          >
            {l || " "}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
