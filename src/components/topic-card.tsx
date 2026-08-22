import Link from "next/link";
import { ArrowUpRight, Clock, Sparkles } from "lucide-react";
import type { Topic } from "@/data/topics";

export function TopicCard({ topic }: { topic: Topic }) {
  const isPublished = topic.status === "published";

  const content = (
    <>
      <div className="flex items-start justify-between gap-3">
        <span className="text-xs font-medium uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
          {topic.category}
        </span>
        {isPublished ? (
          <ArrowUpRight className="h-4 w-4 shrink-0 text-zinc-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-indigo-500" />
        ) : (
          <span className="flex shrink-0 items-center gap-1 rounded-full bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
            <Sparkles className="h-3 w-3" /> Soon
          </span>
        )}
      </div>
      <h3 className="mt-3 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
        {topic.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {topic.description}
      </p>
      {topic.readingTime && (
        <div className="mt-4 flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-500">
          <Clock className="h-3.5 w-3.5" />
          {topic.readingTime} read
        </div>
      )}
    </>
  );

  const baseClasses =
    "group relative flex flex-col rounded-2xl border p-5 transition-all";

  if (!isPublished) {
    return (
      <div
        className={`${baseClasses} border-dashed border-zinc-200 bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-900/30`}
        aria-disabled
      >
        {content}
      </div>
    );
  }

  return (
    <Link
      href={`/topics/${topic.slug}`}
      className={`${baseClasses} border-zinc-200 bg-white hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-500/5 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-indigo-500/40`}
    >
      {content}
    </Link>
  );
}
