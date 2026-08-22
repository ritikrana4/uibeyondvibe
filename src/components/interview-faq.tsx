"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/data/faq";

export function InterviewFaq({
  items: allItems,
  categories,
}: {
  items: FaqItem[];
  categories: string[];
}) {
  const [filter, setFilter] = useState<string>("All");
  const [open, setOpen] = useState<Set<string>>(new Set());

  const items = useMemo(
    () => (filter === "All" ? allItems : allItems.filter((f) => f.category === filter)),
    [filter, allItems],
  );

  function toggle(id: string) {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div>
      <div className="flex flex-wrap gap-1.5">
        {["All", ...categories].map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setFilter(c)}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              filter === c
                ? "border-indigo-500 bg-indigo-500 text-white"
                : "border-zinc-200 text-zinc-600 hover:border-indigo-300 hover:text-indigo-600 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-indigo-500/50 dark:hover:text-indigo-400"
            }`}
          >
            {c}
          </button>
        ))}
        <span className="ml-auto self-center text-xs text-zinc-400 dark:text-zinc-600">
          {items.length} question{items.length === 1 ? "" : "s"}
        </span>
      </div>

      <div className="mt-4 divide-y divide-zinc-100 overflow-hidden rounded-xl border border-zinc-100 dark:divide-zinc-800 dark:border-zinc-800">
        {items.map((item) => {
          const isOpen = open.has(item.id);
          return (
            <div key={item.id} className="bg-white dark:bg-zinc-900">
              <button
                type="button"
                onClick={() => toggle(item.id)}
                className="flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left"
              >
                <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                  {item.q}
                </span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-zinc-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="px-4 pb-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
