"use client";

import { useState, type ReactNode } from "react";
import { RotateCcw } from "lucide-react";

export function AnimationCard({
  eyebrow,
  children,
}: {
  eyebrow?: string;
  children: ReactNode;
}) {
  const [key, setKey] = useState(0);
  return (
    <div className="not-prose overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center justify-between gap-2 border-b border-zinc-100 bg-zinc-50/60 px-4 py-2 dark:border-zinc-800 dark:bg-zinc-900/60">
        <span className="text-[11px] font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-500">
          {eyebrow ?? "Animated diagram"}
        </span>
        <button
          type="button"
          onClick={() => setKey((k) => k + 1)}
          className="flex items-center gap-1 rounded-full border border-zinc-200 px-2.5 py-1 text-[11px] font-medium text-zinc-600 transition-colors hover:border-indigo-300 hover:text-indigo-600 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-indigo-500/50 dark:hover:text-indigo-400"
        >
          <RotateCcw className="h-3 w-3" />
          Replay
        </button>
      </div>
      <div key={key} className="overflow-x-auto p-5 sm:p-6">
        {children}
      </div>
    </div>
  );
}
