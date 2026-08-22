"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles } from "lucide-react";
import { categories, topics } from "@/data/topics";

export function TopicSidebar() {
  const pathname = usePathname();

  return (
    <nav className="space-y-6">
      {categories.map((category) => (
        <div key={category}>
          <h3 className="px-2 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-500">
            {category}
          </h3>
          <ul className="mt-1.5 space-y-0.5">
            {topics
              .filter((t) => t.category === category)
              .map((topic) => {
                const href = `/topics/${topic.slug}`;
                const active = pathname === href;
                const disabled = topic.status !== "published";
                return (
                  <li key={topic.slug}>
                    {disabled ? (
                      <span className="flex items-center justify-between gap-2 rounded-md px-2 py-1.5 text-sm text-zinc-400 dark:text-zinc-600">
                        {topic.title}
                        <Sparkles className="h-3 w-3 shrink-0" />
                      </span>
                    ) : (
                      <Link
                        href={href}
                        className={`block rounded-md px-2 py-1.5 text-sm transition-colors ${
                          active
                            ? "bg-indigo-50 font-medium text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300"
                            : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/60 dark:hover:text-zinc-100"
                        }`}
                      >
                        {topic.title}
                      </Link>
                    )}
                  </li>
                );
              })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
