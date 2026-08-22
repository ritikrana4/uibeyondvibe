"use client";

import { motion } from "framer-motion";

export interface TimelineSegment {
  start: number;
  end: number;
  className: string;
}

/**
 * One labeled row of a small horizontal Gantt-style timeline, with segments
 * positioned by percentage (0-100) and drawn in left-to-right order as
 * `active` flips true.
 */
export function TimelineRow({
  label,
  segments,
  active,
  height = 16,
}: {
  label: string;
  segments: TimelineSegment[];
  active: boolean;
  height?: number;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-14 shrink-0 text-[10px] font-medium text-zinc-500 dark:text-zinc-500">
        {label}
      </span>
      <div
        className="relative flex-1 rounded bg-zinc-50 dark:bg-zinc-950/40"
        style={{ height }}
      >
        {segments.map((s, i) => (
          <motion.div
            key={i}
            initial={{ scaleX: 0 }}
            animate={active ? { scaleX: 1 } : {}}
            transition={{ duration: 0.4, delay: (s.start / 100) * 0.7 }}
            style={{
              position: "absolute",
              left: `${s.start}%`,
              width: `${s.end - s.start}%`,
              transformOrigin: "left",
              height: "100%",
            }}
            className={`rounded-sm ${s.className}`}
          />
        ))}
      </div>
    </div>
  );
}
