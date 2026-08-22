"use client";

import Link from "next/link";
import { Check, ChevronRight } from "lucide-react";
import { codingQuestions } from "@/data/coding-questions";
import { useCompletedQuestions } from "@/hooks/use-completed-questions";

export function QuestionChecklist() {
  const { completed, toggle } = useCompletedQuestions();
  const doneCount = completed.size;

  return (
    <div>
      <div className="mb-3 flex items-center justify-between px-1">
        <p className="text-xs font-medium text-zinc-500 dark:text-zinc-500">
          Check one off once you&apos;ve solved it — your progress is saved
          on this device.
        </p>
        <p className="text-xs font-medium text-zinc-500 dark:text-zinc-500">
          {doneCount} / {codingQuestions.length} done
        </p>
      </div>
      <ul className="overflow-hidden rounded-xl border border-zinc-200 divide-y divide-zinc-100 dark:border-zinc-800 dark:divide-zinc-800">
        {codingQuestions.map((q, i) => {
          const done = completed.has(q.slug);
          return (
            <li key={q.slug} className="relative bg-white dark:bg-zinc-900">
              <div className="flex items-center gap-3 px-4 py-3.5">
                <button
                  type="button"
                  aria-pressed={done}
                  aria-label={done ? `Mark "${q.title}" as not done` : `Mark "${q.title}" as done`}
                  onClick={() => toggle(q.slug)}
                  className={`relative z-10 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                    done
                      ? "border-emerald-500 bg-emerald-500 text-white"
                      : "border-zinc-300 text-transparent hover:border-indigo-400 dark:border-zinc-600 dark:hover:border-indigo-500"
                  }`}
                >
                  <Check className="h-3.5 w-3.5" />
                </button>

                <Link
                  href={`/topics/coding-questions/${q.slug}`}
                  className="flex min-w-0 flex-1 items-center gap-3 focus:outline-none"
                >
                  <span className="absolute inset-0" aria-hidden />
                  <span className="shrink-0 font-mono text-xs text-zinc-400 dark:text-zinc-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`truncate text-sm font-medium ${
                      done
                        ? "text-zinc-400 line-through decoration-zinc-300 dark:text-zinc-600 dark:decoration-zinc-700"
                        : "text-zinc-800 dark:text-zinc-200"
                    }`}
                  >
                    {q.title}
                  </span>
                  <span className="hidden shrink-0 gap-1.5 sm:flex">
                    {q.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-zinc-100 px-2 py-0.5 text-[11px] text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </span>
                  <span className="ml-auto shrink-0 rounded-full bg-indigo-50 px-2 py-0.5 text-[11px] font-medium text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                    {q.difficulty}
                  </span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-zinc-300 dark:text-zinc-700" />
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
