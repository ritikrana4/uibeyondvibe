"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ROWS = [
  { pattern: "REST", direction: "Client ⇄ Server", connection: "New per request", use: "CRUD APIs, simple integrations" },
  { pattern: "Short polling", direction: "Client ⇄ Server (repeated)", connection: "New per check", use: "Low real-time needs, simplest to build" },
  { pattern: "Long polling", direction: "Client ⇄ Server (held open)", connection: "Reopened per resolution", use: "Near-real-time without WebSocket infra" },
  { pattern: "SSE", direction: "Server → Client only", connection: "One persistent connection", use: "Live feeds, notifications, token streaming" },
  { pattern: "WebSockets", direction: "Client ⇄ Server, simultaneous", connection: "One persistent, full-duplex", use: "Chat, games, collaborative editing" },
  { pattern: "Webhooks", direction: "Server → Server", connection: "New per event", use: "Third-party integration events" },
  { pattern: "HTTP streaming", direction: "Server → Client (one request)", connection: "One request, chunked body", use: "Large responses, progressive rendering" },
];

export function ComparisonTable() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="overflow-x-auto rounded-lg border border-zinc-100 dark:border-zinc-800">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr className="border-b border-zinc-100 text-xs uppercase tracking-wide text-zinc-500 dark:border-zinc-800 dark:text-zinc-500">
            <th className="px-3 py-2 font-semibold">Pattern</th>
            <th className="px-3 py-2 font-semibold">Direction</th>
            <th className="px-3 py-2 font-semibold">Connection</th>
            <th className="px-3 py-2 font-semibold">Best for</th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((r, i) => (
            <motion.tr
              key={r.pattern}
              initial={{ opacity: 0, x: -8 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.3 }}
              className="border-b border-zinc-50 last:border-0 dark:border-zinc-900"
            >
              <td className="px-3 py-2.5 font-medium whitespace-nowrap text-zinc-800 dark:text-zinc-200">
                {r.pattern}
              </td>
              <td className="px-3 py-2.5 whitespace-nowrap text-zinc-600 dark:text-zinc-400">{r.direction}</td>
              <td className="px-3 py-2.5 whitespace-nowrap text-zinc-600 dark:text-zinc-400">{r.connection}</td>
              <td className="px-3 py-2.5 text-zinc-600 dark:text-zinc-400">{r.use}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
