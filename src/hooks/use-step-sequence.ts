"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

/**
 * Drives a numbered sequence of animation steps (0..totalSteps-1) that
 * begins the first time the element scrolls into view. Remounting the
 * component (e.g. via a `key` change from a "Replay" button) restarts it.
 */
export function useStepSequence(totalSteps: number, stepDelay = 700) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [step, setStep] = useState(-1);

  useEffect(() => {
    if (!inView) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 0; i < totalSteps; i++) {
      timers.push(setTimeout(() => setStep(i), stepDelay * i));
    }
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return { ref, step, inView, done: step >= totalSteps - 1 };
}
