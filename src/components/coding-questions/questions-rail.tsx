"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Check } from "lucide-react";
import { codingQuestions } from "@/data/coding-questions";
import { useCompletedQuestions } from "@/hooks/use-completed-questions";

export function QuestionsRail() {
  const pathname = usePathname();
  const { completed } = useCompletedQuestions();

  return (
    <nav aria-label="All coding questions" className="space-y-0.5 text-sm">
      <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-zinc-400 dark:text-zinc-600">
        All questions
      </p>
      {codingQuestions.map((q) => {
        const href = `/topics/coding-questions/${q.slug}`;
        const active = pathname === href;
        const done = completed.has(q.slug);
        return (
          <Link
            key={q.slug}
            href={href}
            className={`flex items-center gap-2 rounded-md px-2 py-1.5 transition-colors ${
              active
                ? "bg-indigo-50 font-medium text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300"
                : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-500 dark:hover:text-zinc-300"
            }`}
          >
            <span
              className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-sm border ${
                done
                  ? "border-emerald-500 bg-emerald-500 text-white"
                  : "border-zinc-300 dark:border-zinc-600"
              }`}
            >
              {done && <Check className="h-2.5 w-2.5" />}
            </span>
            <span className="truncate">{q.title}</span>
          </Link>
        );
      })}
      <Link
        href="/topics/coding-questions"
        className="!mt-3 block rounded-md px-2 py-1.5 text-xs text-zinc-400 transition-colors hover:text-indigo-600 dark:text-zinc-600 dark:hover:text-indigo-400"
      >
        ← Back to the list
      </Link>
    </nav>
  );
}
