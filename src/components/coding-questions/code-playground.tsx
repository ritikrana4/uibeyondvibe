"use client";

import { useEffect, useState, type KeyboardEvent } from "react";
import { CheckCircle2, Loader2, PartyPopper, Play, RotateCcw, XCircle } from "lucide-react";
import { runUserTests, type CheckResult } from "@/lib/code-runner";

export function CodePlayground({
  slug,
  starterCode,
  testCode,
}: {
  slug: string;
  starterCode: string;
  testCode: string;
}) {
  const storageKey = `coding-questions-code-${slug}`;
  const [code, setCode] = useState(starterCode);
  const [loaded, setLoaded] = useState(false);
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState<CheckResult[] | null>(null);
  const [runError, setRunError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(storageKey);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time load of a saved draft on mount
      if (saved) setCode(saved);
    } catch {
      // ignore — localStorage unavailable
    }
    setLoaded(true);
  }, [storageKey]);

  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(storageKey, code);
    } catch {
      // ignore — nothing useful to do if storage is unavailable
    }
  }, [code, loaded, storageKey]);

  async function handleRun() {
    setRunning(true);
    setResults(null);
    setRunError(null);
    const res = await runUserTests(code, testCode);
    setRunning(false);
    if (res.ok && res.results) {
      setResults(res.results);
    } else {
      setRunError(res.error ?? "Something went wrong running your code.");
    }
  }

  function handleReset() {
    setCode(starterCode);
    setResults(null);
    setRunError(null);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key !== "Tab") return;
    e.preventDefault();
    const el = e.currentTarget;
    const { selectionStart: start, selectionEnd: end } = el;
    const next = code.slice(0, start) + "  " + code.slice(end);
    setCode(next);
    requestAnimationFrame(() => {
      el.selectionStart = el.selectionEnd = start + 2;
    });
  }

  const passCount = results?.filter((r) => r.pass).length ?? 0;
  const allPassed = !!results && results.length > 0 && passCount === results.length;

  return (
    <div className="not-prose overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
      <div className="flex items-center justify-between border-b border-zinc-200 bg-zinc-50 px-4 py-2 dark:border-zinc-800 dark:bg-zinc-900/60">
        <span className="text-[11px] font-medium tracking-wide text-zinc-500 uppercase dark:text-zinc-500">
          Your code
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium text-zinc-500 transition-colors hover:text-zinc-800 dark:text-zinc-500 dark:hover:text-zinc-200"
          >
            <RotateCcw className="h-3 w-3" /> Reset
          </button>
          <button
            type="button"
            onClick={handleRun}
            disabled={running}
            className="flex items-center gap-1.5 rounded-md bg-indigo-600 px-3 py-1.5 text-[11px] font-semibold text-white transition-colors hover:bg-indigo-500 disabled:opacity-60"
          >
            {running ? <Loader2 className="h-3 w-3 animate-spin" /> : <Play className="h-3 w-3" />}
            {running ? "Running…" : "Run tests"}
          </button>
        </div>
      </div>

      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        onKeyDown={handleKeyDown}
        spellCheck={false}
        autoCapitalize="off"
        autoCorrect="off"
        rows={12}
        aria-label="Your solution"
        className="block w-full resize-y bg-zinc-50 p-4 font-mono text-[13px] leading-relaxed text-zinc-800 outline-none dark:bg-zinc-950/60 dark:text-zinc-200"
      />

      {(results || runError) && (
        <div className="border-t border-zinc-200 p-4 dark:border-zinc-800">
          {runError && (
            <p className="flex items-start gap-2 text-sm text-rose-600 dark:text-rose-400">
              <XCircle className="mt-0.5 h-4 w-4 shrink-0" />
              {runError}
            </p>
          )}

          {results && (
            <div className="space-y-2.5">
              {allPassed ? (
                <p className="flex items-center gap-1.5 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                  <PartyPopper className="h-4 w-4" /> All {results.length} checks passed
                </p>
              ) : (
                <p className="text-xs font-medium text-zinc-500 dark:text-zinc-500">
                  {passCount} / {results.length} checks passed
                </p>
              )}
              {results.map((r, i) => (
                <div key={i} className="flex items-start gap-2 text-sm">
                  {r.pass ? (
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  ) : (
                    <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />
                  )}
                  <div className="min-w-0">
                    <p
                      className={
                        r.pass
                          ? "text-zinc-700 dark:text-zinc-300"
                          : "font-medium text-rose-700 dark:text-rose-400"
                      }
                    >
                      {r.name}
                    </p>
                    {!r.pass && r.detail && (
                      <p className="font-mono text-xs text-zinc-500 dark:text-zinc-500">{r.detail}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
