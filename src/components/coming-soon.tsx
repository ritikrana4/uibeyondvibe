import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import type { Topic } from "@/data/topics";

export function ComingSoon({ topic }: { topic: Topic }) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-200 bg-zinc-50/50 px-6 py-20 text-center dark:border-zinc-800 dark:bg-zinc-900/30">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
        <Sparkles className="h-5 w-5" />
      </span>
      <h1 className="mt-4 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
        {topic.title}
      </h1>
      <p className="mt-2 max-w-sm text-sm text-zinc-600 dark:text-zinc-400">
        This one is being written next. {topic.description}
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to all topics
      </Link>
    </div>
  );
}
