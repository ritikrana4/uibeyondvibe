"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { TimelineRow, type TimelineSegment } from "@/components/ui/timeline-row";

const REQUEST = "bg-zinc-400 dark:bg-zinc-500";
const JS = "bg-amber-400 dark:bg-amber-500";
const RENDER = "bg-violet-400 dark:bg-violet-500";
const READY = "bg-emerald-400 dark:bg-emerald-500";

const CSR: TimelineSegment[] = [
  { start: 0, end: 8, className: REQUEST },
  { start: 8, end: 55, className: JS },
  { start: 55, end: 78, className: RENDER },
  { start: 78, end: 88, className: READY },
];

const SSR: TimelineSegment[] = [
  { start: 0, end: 32, className: REQUEST },
  { start: 32, end: 58, className: JS },
  { start: 58, end: 74, className: RENDER },
  { start: 74, end: 82, className: READY },
];

const SSG: TimelineSegment[] = [
  { start: 0, end: 6, className: REQUEST },
  { start: 6, end: 26, className: JS },
  { start: 26, end: 38, className: RENDER },
  { start: 38, end: 46, className: READY },
];

export function RenderingStrategies() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="space-y-5">
      <div>
        <TimelineRow label="CSR" segments={CSR} active={inView} />
        <p className="mt-1.5 text-[11px] leading-relaxed text-zinc-500 dark:text-zinc-500">
          Content only appears once JS downloads and runs — slow LCP, and a slow interactive time to match.
        </p>
      </div>
      <div>
        <TimelineRow label="SSR" segments={SSR} active={inView} />
        <p className="mt-1.5 text-[11px] leading-relaxed text-zinc-500 dark:text-zinc-500">
          The server renders real HTML per request — content shows up fast, but it still waits on hydration to become interactive.
        </p>
      </div>
      <div>
        <TimelineRow label="SSG" segments={SSG} active={inView} />
        <p className="mt-1.5 text-[11px] leading-relaxed text-zinc-500 dark:text-zinc-500">
          Pre-built at deploy time and served straight from a CDN — fastest content and fastest interactive of the three.
        </p>
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1.5 pt-1 text-[10px] text-zinc-500 dark:text-zinc-500">
        <span className="flex items-center gap-1.5">
          <span className={`h-2 w-2 rounded-sm ${REQUEST}`} /> Request / server work
        </span>
        <span className="flex items-center gap-1.5">
          <span className={`h-2 w-2 rounded-sm ${JS}`} /> Downloading JS
        </span>
        <span className="flex items-center gap-1.5">
          <span className={`h-2 w-2 rounded-sm ${RENDER}`} /> Executing / hydrating
        </span>
        <span className="flex items-center gap-1.5">
          <span className={`h-2 w-2 rounded-sm ${READY}`} /> Interactive
        </span>
      </div>
    </div>
  );
}
