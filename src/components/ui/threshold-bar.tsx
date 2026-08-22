"use client";

import { motion } from "framer-motion";

export interface ThresholdZone {
  end: number;
  className: string;
}

export interface ThresholdSegment {
  label: string;
  value: number;
  className: string;
}

/**
 * A horizontal bar that draws graded threshold zones (e.g. good / needs
 * improvement / poor) in the background, then grows a stack of labeled
 * segments on top of it, one per step, up to a running total.
 */
export function ThresholdBar({
  zones,
  segments,
  scaleMax,
  step,
}: {
  zones: ThresholdZone[];
  segments: ThresholdSegment[];
  scaleMax: number;
  step: number;
}) {
  const positioned = segments.reduce<{ left: number; width: number; segment: ThresholdSegment }[]>(
    (acc, segment) => {
      const start = acc.length === 0 ? 0 : acc[acc.length - 1].left + acc[acc.length - 1].width;
      acc.push({ left: start, width: (segment.value / scaleMax) * 100, segment });
      return acc;
    },
    [],
  );

  return (
    <div className="relative mb-6 h-9 overflow-hidden rounded-lg">
      {zones.map((z, i) => {
        const start = i === 0 ? 0 : zones[i - 1].end;
        const left = (start / scaleMax) * 100;
        const width = ((z.end - start) / scaleMax) * 100;
        return (
          <div
            key={i}
            className={`absolute inset-y-0 ${z.className}`}
            style={{ left: `${left}%`, width: `${width}%` }}
          />
        );
      })}
      {positioned.map(({ left, width, segment: s }, i) => (
        <motion.div
          key={s.label}
          initial={{ scaleX: 0 }}
          animate={step >= i ? { scaleX: 1 } : {}}
          transition={{ duration: 0.4 }}
          style={{ left: `${left}%`, width: `${width}%`, transformOrigin: "left" }}
          className={`absolute inset-y-0 ${s.className}`}
        />
      ))}
    </div>
  );
}
