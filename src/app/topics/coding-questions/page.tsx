import type { Metadata } from "next";
import { Clock, Layers3 } from "lucide-react";
import { QuestionChecklist } from "@/components/coding-questions/question-checklist";
import { codingQuestions } from "@/data/coding-questions";

export const metadata: Metadata = {
  title: "Coding Interview Questions — Frontend, Under the Hood",
  description:
    "Classic hands-on JavaScript problems — implement it yourself, then walk through the approach, a working solution, and the follow-ups interviewers actually ask.",
};

export default function CodingQuestionsIndexPage() {
  return (
    <div className="max-w-2xl">
      <header>
        <p className="text-sm font-medium uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
          Coding Challenges
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
          Coding interview questions, one at a time
        </h1>
        <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          Different format from the other topics here — no animated network
          diagrams, just the hands-on JavaScript questions that actually come
          up. Each question gets its own page: the problem as an
          interviewer would give it to you, the approach, a working solution
          you can reveal once you&apos;ve thought it through, and the
          follow-ups they&apos;ll ask once you get it working. New questions
          get added here over time.
        </p>
        <div className="mt-4 flex items-center gap-4 text-xs text-zinc-500 dark:text-zinc-500">
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" /> 24 min so far
          </span>
          <span className="flex items-center gap-1.5">
            <Layers3 className="h-3.5 w-3.5" /> {codingQuestions.length}{" "}
            question{(codingQuestions.length as number) === 1 ? "" : "s"} so
            far
          </span>
        </div>
      </header>

      <div className="mt-8">
        <QuestionChecklist />
      </div>
    </div>
  );
}
