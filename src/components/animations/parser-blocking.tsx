"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { TimelineRow, type TimelineSegment } from "@/components/ui/timeline-row";

const PARSE = "bg-zinc-300 dark:bg-zinc-600";
const FETCH = "bg-amber-400 dark:bg-amber-500";
const EXEC = "bg-rose-400 dark:bg-rose-500";
const PAUSED = "border border-dashed border-zinc-300 bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-900";

function ScenarioGantt({
  code,
  html,
  js,
  note,
  active,
}: {
  code: string;
  html: TimelineSegment[];
  js: TimelineSegment[];
  note: string;
  active: boolean;
}) {
  return (
    <div className="rounded-lg border border-zinc-100 p-3 dark:border-zinc-800">
      <code className="font-mono text-[11px] text-zinc-700 dark:text-zinc-300">{code}</code>
      <div className="mt-2.5 space-y-1.5">
        <TimelineRow label="Parser" segments={html} active={active} />
        <TimelineRow label="Script" segments={js} active={active} />
      </div>
      <p className="mt-2 text-xs leading-relaxed text-zinc-500 dark:text-zinc-500">{note}</p>
    </div>
  );
}

export function ParserBlocking() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="space-y-3">
      <ScenarioGantt
        active={inView}
        code='<script src="a.js">'
        html={[
          { start: 0, end: 30, className: PARSE },
          { start: 30, end: 70, className: PAUSED },
          { start: 70, end: 100, className: PARSE },
        ]}
        js={[
          { start: 30, end: 60, className: FETCH },
          { start: 60, end: 70, className: EXEC },
        ]}
        note="Default behaviour. The parser stops dead when it hits the tag, fetches, executes, then resumes. Worst for time-to-first-paint."
      />
      <ScenarioGantt
        active={inView}
        code='<script async src="a.js">'
        html={[
          { start: 0, end: 45, className: PARSE },
          { start: 45, end: 55, className: PAUSED },
          { start: 55, end: 100, className: PARSE },
        ]}
        js={[
          { start: 5, end: 45, className: FETCH },
          { start: 45, end: 55, className: EXEC },
        ]}
        note="Fetches in parallel with parsing, but still pauses the parser to execute the moment it arrives — order vs. other scripts isn't guaranteed."
      />
      <ScenarioGantt
        active={inView}
        code='<script defer src="a.js">'
        html={[{ start: 0, end: 100, className: PARSE }]}
        js={[
          { start: 5, end: 45, className: FETCH },
          { start: 94, end: 100, className: EXEC },
        ]}
        note="Fetches in parallel and never pauses the parser. Executes in document order, right after parsing finishes, just before DOMContentLoaded."
      />
    </div>
  );
}
