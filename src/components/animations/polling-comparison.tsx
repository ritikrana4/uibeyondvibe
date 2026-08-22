"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { TimelineRow, type TimelineSegment } from "@/components/ui/timeline-row";

const IDLE = "bg-zinc-300 dark:bg-zinc-600";
const DATA = "bg-emerald-400 dark:bg-emerald-500";
const PENDING = "bg-amber-400 dark:bg-amber-500";

const SHORT: TimelineSegment[] = [
  { start: 2, end: 10, className: IDLE },
  { start: 22, end: 30, className: IDLE },
  { start: 44, end: 52, className: DATA },
  { start: 66, end: 74, className: IDLE },
  { start: 88, end: 96, className: IDLE },
];

const LONG: TimelineSegment[] = [
  { start: 2, end: 68, className: PENDING },
  { start: 68, end: 78, className: DATA },
  { start: 80, end: 100, className: PENDING },
];

export function PollingComparison() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="space-y-4">
      <div className="rounded-lg border border-zinc-100 p-3 dark:border-zinc-800">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-500">
          Short polling
        </p>
        <TimelineRow label="Requests" segments={SHORT} active={inView} />
        <p className="mt-2 text-xs leading-relaxed text-zinc-500 dark:text-zinc-500">
          5 separate requests just to catch one real update — 4 of them came back with nothing new.
        </p>
      </div>
      <div className="rounded-lg border border-zinc-100 p-3 dark:border-zinc-800">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-500">
          Long polling
        </p>
        <TimelineRow label="Requests" segments={LONG} active={inView} />
        <p className="mt-2 text-xs leading-relaxed text-zinc-500 dark:text-zinc-500">
          The connection just waits. One request resolves the moment there&apos;s real data, then immediately reopens.
        </p>
      </div>
    </div>
  );
}
