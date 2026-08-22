import type { ReactNode } from "react";
import { MessageCircleQuestion, FileCode2 } from "lucide-react";

export function P({ children }: { children: ReactNode }) {
  return (
    <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
      {children}
    </p>
  );
}

export function Ul({ children }: { children: ReactNode }) {
  return (
    <ul className="list-disc space-y-1.5 pl-5 text-[15px] leading-relaxed text-zinc-700 marker:text-indigo-400 dark:text-zinc-300">
      {children}
    </ul>
  );
}

export function Code({ children }: { children: ReactNode }) {
  return (
    <code className="rounded-md bg-zinc-100 px-1.5 py-0.5 font-mono text-[0.85em] text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
      {children}
    </code>
  );
}

export function InterviewNote({
  children,
  question,
}: {
  children: ReactNode;
  question?: string;
}) {
  return (
    <div className="not-prose flex gap-3 rounded-xl border border-indigo-100 bg-indigo-50/60 p-4 dark:border-indigo-500/20 dark:bg-indigo-500/[0.07]">
      <MessageCircleQuestion className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500 dark:text-indigo-400" />
      <div className="space-y-1 text-sm leading-relaxed text-indigo-950 dark:text-indigo-200">
        {question && (
          <p className="font-semibold text-indigo-700 dark:text-indigo-300">
            &ldquo;{question}&rdquo;
          </p>
        )}
        {children}
      </div>
    </div>
  );
}

export function ProblemStatement({ children }: { children: ReactNode }) {
  return (
    <div className="not-prose flex gap-3 rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-900/60">
      <FileCode2 className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500 dark:text-zinc-400" />
      <div className="space-y-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <p className="text-[11px] font-semibold tracking-wide text-zinc-500 uppercase dark:text-zinc-500">
          The problem
        </p>
        {children}
      </div>
    </div>
  );
}
