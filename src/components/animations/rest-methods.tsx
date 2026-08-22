"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const METHODS = [
  {
    verb: "GET",
    path: "/users/42",
    status: "200 OK",
    color: "text-sky-500 dark:text-sky-400",
    ring: "bg-sky-100 dark:bg-sky-500/20",
    desc: "Read a resource. Safe and idempotent — calling it never changes anything, so browsers and CDNs are free to cache it.",
  },
  {
    verb: "POST",
    path: "/users",
    status: "201 Created",
    color: "text-emerald-500 dark:text-emerald-400",
    ring: "bg-emerald-100 dark:bg-emerald-500/20",
    desc: "Create a new resource. Not idempotent — call it twice and you typically get two resources.",
  },
  {
    verb: "PUT",
    path: "/users/42",
    status: "200 OK",
    color: "text-amber-500 dark:text-amber-400",
    ring: "bg-amber-100 dark:bg-amber-500/20",
    desc: "Replace a resource entirely. Idempotent — sending the exact same PUT twice leaves the same end state.",
  },
  {
    verb: "PATCH",
    path: "/users/42",
    status: "200 OK",
    color: "text-violet-500 dark:text-violet-400",
    ring: "bg-violet-100 dark:bg-violet-500/20",
    desc: "Partially update a resource. Idempotent or not, depending on what the patch itself says.",
  },
  {
    verb: "DELETE",
    path: "/users/42",
    status: "204 No Content",
    color: "text-rose-500 dark:text-rose-400",
    ring: "bg-rose-100 dark:bg-rose-500/20",
    desc: "Remove a resource. Idempotent — deleting an already-deleted resource is still “gone”.",
  },
];

export function RestMethods() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % METHODS.length), 2400);
    return () => clearInterval(t);
  }, []);

  const current = METHODS[active];

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-center gap-1 rounded-xl bg-zinc-50 px-4 py-5 dark:bg-zinc-950/40">
        {METHODS.map((m, i) => (
          <button
            key={m.verb}
            type="button"
            onClick={() => setActive(i)}
            className="relative rounded-lg px-3 py-2 font-mono text-sm"
          >
            {active === i && (
              <motion.span
                layoutId="rest-highlight"
                className={`absolute inset-0 rounded-lg ${m.ring}`}
                transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
              />
            )}
            <span
              className={`relative font-semibold transition-colors ${active === i ? m.color : "text-zinc-400 dark:text-zinc-600"}`}
            >
              {m.verb}
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
          <div className="flex flex-wrap items-center gap-2 font-mono text-sm">
            <span className={`font-semibold ${current.color}`}>{current.verb}</span>
            <span className="text-zinc-600 dark:text-zinc-400">{current.path}</span>
            <span className="ml-auto rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
              {current.status}
            </span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{current.desc}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
