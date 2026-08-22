"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

export interface PipelineNode {
  id: string;
  label: string;
  icon: LucideIcon;
}

export function PipelineOverview({
  nodes,
  intervalMs = 1100,
}: {
  nodes: PipelineNode[];
  intervalMs?: number;
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % nodes.length), intervalMs);
    return () => clearInterval(t);
  }, [nodes.length, intervalMs]);

  return (
    <div className="overflow-x-auto pb-1">
      <div className="flex min-w-max items-start">
        {nodes.map((node, i) => {
          const Icon = node.icon;
          const isActive = i === active;
          const isPast = i < active;
          return (
            <div key={node.id} className="flex items-start">
              <a
                href={`#${node.id}`}
                className="group flex flex-col items-center gap-2 px-1.5"
              >
                <motion.span
                  animate={{ scale: isActive ? 1.15 : 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-300 ${
                    isActive
                      ? "border-indigo-400 bg-indigo-500 text-white shadow-lg shadow-indigo-500/30"
                      : isPast
                        ? "border-indigo-200 bg-indigo-50 text-indigo-500 dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-400"
                        : "border-zinc-200 bg-zinc-100 text-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-500"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </motion.span>
                <span className="w-16 text-center text-[11px] font-medium leading-tight text-zinc-500 group-hover:text-indigo-600 dark:text-zinc-500 dark:group-hover:text-indigo-400">
                  {node.label}
                </span>
              </a>
              {i < nodes.length - 1 && (
                <div className="relative mt-5 h-px w-6 shrink-0 overflow-hidden bg-zinc-200 dark:bg-zinc-700">
                  <motion.div
                    className="absolute inset-0 bg-indigo-400"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isPast ? 1 : 0 }}
                    style={{ transformOrigin: "left" }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
