"use client";

import { useEffect, useState } from "react";

export interface TocSection {
  id: string;
  label: string;
}

export function TableOfContents({ sections }: { sections: readonly TocSection[] }) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav aria-label="Table of contents" className="space-y-0.5 text-sm">
      <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-zinc-400 dark:text-zinc-600">
        On this page
      </p>
      {sections.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className={`block rounded-md px-2 py-1 transition-colors ${
            activeId === s.id
              ? "bg-indigo-50 font-medium text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300"
              : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-500 dark:hover:text-zinc-300"
          }`}
        >
          {s.label}
        </a>
      ))}
    </nav>
  );
}
