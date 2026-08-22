"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

export function ArticleSection({
  id,
  index,
  kicker,
  title,
  children,
}: {
  id: string;
  index: string;
  kicker: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="scroll-mt-24 border-t border-zinc-100 py-12 first:border-t-0 first:pt-0 dark:border-zinc-800"
    >
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-sm font-semibold text-indigo-500 dark:text-indigo-400">
          {index}
        </span>
        <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-500">
          {kicker}
        </span>
      </div>
      <h2 className="mt-1.5 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-50">
        {title}
      </h2>
      <div className="mt-5 space-y-5">{children}</div>
    </motion.section>
  );
}
