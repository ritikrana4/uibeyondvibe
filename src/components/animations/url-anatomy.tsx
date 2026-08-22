"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const PARTS = [
  {
    part: "https://",
    label: "Scheme",
    color: "text-sky-500 dark:text-sky-400",
    ring: "bg-sky-100 dark:bg-sky-500/20",
    desc: "The protocol to speak. https:// tells the browser to negotiate TLS and default to port 443 instead of port 80.",
  },
  {
    part: "www.",
    label: "Subdomain",
    color: "text-violet-500 dark:text-violet-400",
    ring: "bg-violet-100 dark:bg-violet-500/20",
    desc: "An optional label in front of the registrable domain. Often just an alias for the bare domain.",
  },
  {
    part: "example.com",
    label: "Domain (host)",
    color: "text-emerald-500 dark:text-emerald-400",
    ring: "bg-emerald-100 dark:bg-emerald-500/20",
    desc: "The registrable domain — this is the part that actually gets resolved to an IP address via DNS.",
  },
  {
    part: ":8443",
    label: "Port",
    color: "text-amber-500 dark:text-amber-400",
    ring: "bg-amber-100 dark:bg-amber-500/20",
    desc: "Which “door” to knock on. Omitted, it defaults to 443 for https:// or 80 for http://.",
  },
  {
    part: "/blog/post",
    label: "Path",
    color: "text-fuchsia-500 dark:text-fuchsia-400",
    ring: "bg-fuchsia-100 dark:bg-fuchsia-500/20",
    desc: "Identifies the specific resource on the server — like a file path, or a route in a web app.",
  },
  {
    part: "?id=42&ref=tw",
    label: "Query string",
    color: "text-rose-500 dark:text-rose-400",
    ring: "bg-rose-100 dark:bg-rose-500/20",
    desc: "Key/value parameters sent to the server. Order technically matters for caching keys, not semantics.",
  },
  {
    part: "#comments",
    label: "Fragment",
    color: "text-indigo-500 dark:text-indigo-400",
    ring: "bg-indigo-100 dark:bg-indigo-500/20",
    desc: "Client-side only. It is never sent to the server — the browser uses it locally to scroll or route.",
  },
];

export function UrlAnatomy() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % PARTS.length), 2400);
    return () => clearInterval(t);
  }, []);

  const current = PARTS[active];

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-center gap-y-2 rounded-xl bg-zinc-50 px-4 py-6 font-mono text-sm dark:bg-zinc-950/40 sm:text-base">
        {PARTS.map((p, i) => (
          <button
            key={p.label}
            type="button"
            onClick={() => setActive(i)}
            className="relative rounded-md px-0.5 py-1.5"
          >
            {active === i && (
              <motion.span
                layoutId="url-highlight"
                className={`absolute inset-0 rounded-md ${p.ring}`}
                transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
              />
            )}
            <span
              className={`relative transition-colors ${active === i ? `${p.color} font-semibold` : "text-zinc-400 dark:text-zinc-600"}`}
            >
              {p.part}
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25 }}
          className="rounded-xl border border-zinc-100 p-4 dark:border-zinc-800"
        >
          <p className={`text-sm font-semibold ${current.color}`}>{current.label}</p>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{current.desc}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
