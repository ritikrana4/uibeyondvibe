"use client";

import { motion } from "framer-motion";
import { Radio } from "lucide-react";
import { HandshakeDiagram, type HandshakeFrame } from "./handshake-diagram";

const FRAMES: HandshakeFrame[] = [
  {
    dir: "right",
    label: "GET /chat — Upgrade: websocket",
    detail: "A normal-looking HTTP request that just asks to switch protocols.",
  },
  {
    dir: "left",
    label: "101 Switching Protocols",
    detail: "The server agrees — from here on, this same TCP connection speaks the WebSocket framing protocol, not HTTP.",
  },
];

const DOTS = [
  { dir: 1, top: 15, delay: 0 },
  { dir: -1, top: 40, delay: 0.6 },
  { dir: 1, top: 65, delay: 1.3 },
  { dir: -1, top: 85, delay: 0.3 },
];

function LiveConnection() {
  return (
    <div className="mt-5">
      <div className="flex justify-between text-sm font-semibold text-zinc-700 dark:text-zinc-300">
        <span>Client</span>
        <span>Server</span>
      </div>
      <div className="relative mt-2 h-28 overflow-hidden rounded-lg border border-zinc-100 bg-zinc-50/60 dark:border-zinc-800 dark:bg-zinc-950/40">
        {DOTS.map((d, i) => (
          <motion.span
            key={i}
            className="absolute h-2 w-2 -translate-x-1/2 rounded-full bg-sky-500"
            style={{ top: `${d.top}%` }}
            initial={{ left: d.dir === 1 ? "4%" : "94%" }}
            animate={{ left: d.dir === 1 ? ["4%", "94%"] : ["94%", "4%"] }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              repeatDelay: 1.2,
              delay: d.delay,
              ease: "easeInOut",
            }}
          />
        ))}
        <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-zinc-400 dark:text-zinc-600">
          messages flow both ways, whenever either side wants
        </span>
      </div>
    </div>
  );
}

export function WebSocketFlow() {
  return (
    <div>
      <HandshakeDiagram
        frames={FRAMES}
        accent="sky"
        stepDelay={800}
        footer={
          <div className="flex items-center gap-2 rounded-lg border border-sky-200 bg-sky-50 px-4 py-2.5 text-sm font-semibold text-sky-700 dark:border-sky-500/30 dark:bg-sky-500/10 dark:text-sky-400">
            <Radio className="h-4 w-4" />
            Connection open — full-duplex, either side can send at any time.
          </div>
        }
      />
      <LiveConnection />
    </div>
  );
}
