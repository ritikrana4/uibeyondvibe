"use client";

import { useState, type ReactNode } from "react";
import { Eye } from "lucide-react";

export function Reveal({
  label = "Show solution",
  children,
}: {
  label?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-zinc-300 px-4 py-3 text-sm font-medium text-zinc-600 transition-colors hover:border-indigo-300 hover:text-indigo-600 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-indigo-500/50 dark:hover:text-indigo-400"
      >
        <Eye className="h-4 w-4" />
        {label}
      </button>
    );
  }

  return <>{children}</>;
}
