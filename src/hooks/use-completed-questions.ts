"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "coding-questions-completed";

/**
 * Tracks which coding questions the visitor has checked off, persisted to
 * localStorage. Starts empty on both server and first client render (to
 * avoid a hydration mismatch), then loads the real value on mount.
 */
export function useCompletedQuestions() {
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time load from localStorage on mount
      if (raw) setCompleted(new Set(JSON.parse(raw)));
    } catch {
      // localStorage unavailable (private browsing, etc.) — just stay empty
    }
    setIsLoaded(true);
  }, []);

  const toggle = useCallback((slug: string) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) {
        next.delete(slug);
      } else {
        next.add(slug);
      }
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      } catch {
        // ignore — nothing useful to do if storage is unavailable
      }
      return next;
    });
  }, []);

  return { completed, toggle, isLoaded };
}
