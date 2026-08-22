"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { TimelineRow, type TimelineSegment } from "@/components/ui/timeline-row";

const RAW_COLOR = "bg-zinc-400 dark:bg-zinc-500";
const DEBOUNCE_COLOR = "bg-violet-500";
const THROTTLE_COLOR = "bg-amber-500";

const RAW: TimelineSegment[] = [0, 6, 12, 18, 24, 30, 36, 42, 48].map((start) => ({
  start,
  end: start + 2,
  className: RAW_COLOR,
}));

const DEBOUNCED: TimelineSegment[] = [{ start: 56, end: 60, className: DEBOUNCE_COLOR }];

const THROTTLED: TimelineSegment[] = [0, 16, 32, 48].map((start) => ({
  start,
  end: start + 2,
  className: THROTTLE_COLOR,
}));

export function DebounceThrottle() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="space-y-4">
      <div>
        <TimelineRow label="Raw events" segments={RAW} active={inView} />
        <p className="mt-1.5 text-[11px] text-zinc-500 dark:text-zinc-500">
          9 rapid events (e.g. keystrokes), then a pause.
        </p>
      </div>
      <div>
        <TimelineRow label="Debounced" segments={DEBOUNCED} active={inView} />
        <p className="mt-1.5 text-[11px] text-zinc-500 dark:text-zinc-500">
          Fires once, only after the pause — 1 call instead of 9.
        </p>
      </div>
      <div>
        <TimelineRow label="Throttled" segments={THROTTLED} active={inView} />
        <p className="mt-1.5 text-[11px] text-zinc-500 dark:text-zinc-500">
          Fires at a fixed interval regardless of the burst — 4 calls, evenly spaced.
        </p>
      </div>
    </div>
  );
}
