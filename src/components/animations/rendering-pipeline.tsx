"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Layers } from "lucide-react";

const STEPS = [
  {
    key: "dom",
    label: "DOM",
    accent: "text-sky-600 dark:text-sky-400",
    dot: "bg-sky-500",
    title: "HTML → DOM",
    desc: "The HTML parser tokenizes the markup and builds the Document Object Model, node by node, in source order.",
  },
  {
    key: "cssom",
    label: "CSSOM",
    accent: "text-violet-600 dark:text-violet-400",
    dot: "bg-violet-500",
    title: "CSS → CSSOM",
    desc: "Every stylesheet — external, inline, and <style> blocks — is parsed into the CSS Object Model, a tree of computed rules.",
  },
  {
    key: "render",
    label: "Render Tree",
    accent: "text-amber-600 dark:text-amber-400",
    dot: "bg-amber-500",
    title: "DOM + CSSOM → Render Tree",
    desc: "The trees are merged into one visual tree. Nodes with display: none are dropped entirely — visibility: hidden is not.",
  },
  {
    key: "layout",
    label: "Layout",
    accent: "text-emerald-600 dark:text-emerald-400",
    dot: "bg-emerald-500",
    title: "Render Tree → Layout",
    desc: "Also called reflow. The browser walks the tree computing the exact size and (x, y) position of every box.",
  },
  {
    key: "paint",
    label: "Paint",
    accent: "text-fuchsia-600 dark:text-fuchsia-400",
    dot: "bg-fuchsia-500",
    title: "Layout → Paint",
    desc: "Pixels get filled in on one or more layers — background colors, borders, shadows, text glyphs.",
  },
  {
    key: "composite",
    label: "Composite",
    accent: "text-rose-600 dark:text-rose-400",
    dot: "bg-rose-500",
    title: "Paint → Composite",
    desc: "Layers are handed to the GPU and stacked in the correct order. transform/opacity changes can skip straight to this step.",
  },
] as const;

const DOM_LINES = [
  { text: "<html>", depth: 0 },
  { text: "<head>", depth: 1 },
  { text: "<title>", depth: 2 },
  { text: "<body>", depth: 1 },
  { text: "<header>", depth: 2 },
  { text: "<main>", depth: 2 },
  { text: "<article>", depth: 3 },
  { text: "<footer>", depth: 2 },
];

const CSSOM_LINES = [
  { text: "* { margin: 0 }", depth: 0 },
  { text: "body { font-family: Inter }", depth: 0 },
  { text: "main { display: grid }", depth: 1 },
  { text: "article { max-width: 640px }", depth: 2 },
  { text: "footer { color: #71717a }", depth: 1 },
];

const RENDER_TREE_LINES = [
  { text: "html", tag: null, removed: false },
  { text: "body", tag: "font-family: Inter", removed: false },
  { text: "header", tag: null, removed: false },
  { text: "main", tag: "display: grid", removed: false },
  { text: "aside.ad-slot", tag: "display: none", removed: true },
  { text: "footer", tag: "color: #71717a", removed: false },
];

function TreeLines({
  lines,
  colorClass,
}: {
  lines: { text: string; depth: number }[];
  colorClass: string;
}) {
  return (
    <div className="space-y-1 rounded-lg bg-zinc-50 p-3 font-mono text-[11px] dark:bg-zinc-950/40">
      {lines.map((l, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.09 }}
          style={{ paddingLeft: l.depth * 14 }}
          className={colorClass}
        >
          {l.text}
        </motion.div>
      ))}
    </div>
  );
}

function RenderTreeVisual() {
  return (
    <div className="space-y-1 rounded-lg bg-zinc-50 p-3 font-mono text-[11px] dark:bg-zinc-950/40">
      {RENDER_TREE_LINES.map((l, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className={`flex items-center gap-2 ${l.removed ? "text-zinc-400 line-through decoration-rose-400 dark:text-zinc-600" : "text-amber-700 dark:text-amber-300"}`}
        >
          <span>{l.text}</span>
          {l.tag && (
            <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-sans text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">
              {l.tag}
            </span>
          )}
          {l.removed && (
            <span className="font-sans text-[10px] text-rose-400">removed from render tree</span>
          )}
        </motion.div>
      ))}
    </div>
  );
}

type Region = { name: string; w: string; h: number };
const TOP: Region = { name: "header", w: "100%", h: 30 };
const MID: Region[] = [
  { name: "main", w: "70%", h: 90 },
  { name: "aside", w: "26%", h: 90 },
];
const BOTTOM: Region = { name: "footer", w: "100%", h: 26 };

function LayoutVisual() {
  return (
    <div className="space-y-2">
      {[TOP, ...MID, BOTTOM].map((r, i) => (
        <motion.div
          key={r.name}
          initial={{ width: 0 }}
          animate={{ width: r.w }}
          transition={{ duration: 0.5, delay: i * 0.12 }}
          className="relative flex items-center justify-end rounded border border-dashed border-emerald-400 dark:border-emerald-500"
          style={{ height: r.h, display: "inline-flex" }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 + i * 0.12 }}
            className="absolute -top-4 right-0 font-mono text-[10px] text-emerald-600 dark:text-emerald-400"
          >
            {r.name} · {r.w} × {r.h}px
          </motion.span>
        </motion.div>
      ))}
    </div>
  );
}

const REGION_COLOR: Record<string, string> = {
  header: "bg-sky-400/80 dark:bg-sky-500/70",
  main: "bg-emerald-400/80 dark:bg-emerald-500/70",
  aside: "bg-amber-400/80 dark:bg-amber-500/70",
  footer: "bg-fuchsia-400/80 dark:bg-fuchsia-500/70",
};

function PaintVisual() {
  const rows: Region[][] = [[TOP], MID, [BOTTOM]];
  let idx = -1;
  return (
    <div className="space-y-2">
      {rows.map((row, ri) => (
        <div key={ri} className="flex gap-2">
          {row.map((r) => {
            idx += 1;
            const i = idx;
            return (
              <motion.div
                key={r.name}
                initial={{ backgroundColor: "rgba(0,0,0,0)" }}
                animate={{ opacity: 1 }}
                style={{ width: r.w, height: r.h }}
                className="relative rounded border border-zinc-200 dark:border-zinc-700"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.45, delay: 0.15 + i * 0.15 }}
                  className={`absolute inset-0 rounded ${REGION_COLOR[r.name]}`}
                />
                <span className="absolute inset-0 flex items-center justify-center font-mono text-[10px] font-semibold text-white/90 mix-blend-luminosity">
                  {r.name}
                </span>
              </motion.div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function CompositeVisual() {
  const layers = [
    { name: "header (fixed)", color: REGION_COLOR.header, note: "own layer — stays put on scroll" },
    { name: "main content", color: REGION_COLOR.main, note: "base layer" },
    { name: "aside ad slot", color: REGION_COLOR.aside, note: "own layer — animates independently" },
  ];
  return (
    <div className="flex flex-col items-center gap-4 py-2">
      <div className="relative h-32 w-full max-w-xs" style={{ perspective: 700 }}>
        {layers.map((l, i) => (
          <motion.div
            key={l.name}
            initial={{ opacity: 0, x: -30 - i * 6, y: -10 }}
            animate={{ opacity: 1, x: i * 22, y: i * 14 }}
            transition={{ duration: 0.5, delay: i * 0.18 }}
            className={`absolute left-1/2 top-0 flex h-16 w-56 -translate-x-1/2 items-center justify-center rounded-lg border border-white/40 text-[11px] font-semibold text-white shadow-lg dark:border-black/20 ${l.color}`}
            style={{ zIndex: i }}
          >
            {l.name}
          </motion.div>
        ))}
      </div>
      <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-500">
        <Layers className="h-3.5 w-3.5" />
        Separate layers = the GPU can move/fade one without re-running layout or paint on the rest.
      </div>
    </div>
  );
}

export function RenderingPipeline() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);
  const [autoplaying, setAutoplaying] = useState(true);

  useEffect(() => {
    if (!inView || !autoplaying) return;
    if (active >= STEPS.length - 1) return;
    const t = setTimeout(() => setActive((a) => a + 1), 1500);
    return () => clearTimeout(t);
  }, [inView, autoplaying, active]);

  return (
    <div ref={ref} className="space-y-5">
      <div className="flex flex-wrap gap-1.5">
        {STEPS.map((s, i) => (
          <button
            key={s.key}
            type="button"
            onClick={() => {
              setAutoplaying(false);
              setActive(i);
            }}
            className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors ${
              active === i
                ? "border-zinc-300 bg-zinc-100 text-zinc-900 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-50"
                : "border-zinc-100 text-zinc-500 hover:border-zinc-200 dark:border-zinc-800 dark:text-zinc-500 dark:hover:border-zinc-700"
            }`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${active >= i ? s.dot : "bg-zinc-300 dark:bg-zinc-700"}`} />
            {s.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          <p className={`text-sm font-semibold ${STEPS[active].accent}`}>{STEPS[active].title}</p>
          <p className="mt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {STEPS[active].desc}
          </p>
          <div className="mt-4">
            {active === 0 && <TreeLines lines={DOM_LINES} colorClass="text-sky-700 dark:text-sky-300" />}
            {active === 1 && <TreeLines lines={CSSOM_LINES} colorClass="text-violet-700 dark:text-violet-300" />}
            {active === 2 && <RenderTreeVisual />}
            {active === 3 && <LayoutVisual />}
            {active === 4 && <PaintVisual />}
            {active === 5 && <CompositeVisual />}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
