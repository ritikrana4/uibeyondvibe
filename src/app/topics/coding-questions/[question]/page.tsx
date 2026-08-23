import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { codingQuestions, getCodingQuestion } from "@/data/coding-questions";
import { QuestionsRail } from "@/components/coding-questions/questions-rail";
import { MemoizeQuestion } from "@/content/coding-questions/questions/memoize";
import { DomFinderQuestion } from "@/content/coding-questions/questions/dom-finder";
import { FlattenArrayQuestion } from "@/content/coding-questions/questions/flatten-array";
import { FlattenObjectQuestion } from "@/content/coding-questions/questions/flatten-object";
import { PromiseAllQuestion } from "@/content/coding-questions/questions/promise-all";

const CONTENT: Record<string, React.ComponentType> = {
  memoize: MemoizeQuestion,
  "dom-finder": DomFinderQuestion,
  "flatten-array": FlattenArrayQuestion,
  "flatten-object": FlattenObjectQuestion,
  "promise-all": PromiseAllQuestion,
};

export function generateStaticParams() {
  return codingQuestions.map((q) => ({ question: q.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ question: string }>;
}): Promise<Metadata> {
  const { question } = await params;
  const q = getCodingQuestion(question);
  if (!q) return {};
  return {
    title: `${q.title} — Frontend, Under the Hood`,
    description: `A coding interview question: ${q.title}. Difficulty: ${q.difficulty}.`,
  };
}

export default async function CodingQuestionPage({
  params,
}: {
  params: Promise<{ question: string }>;
}) {
  const { question } = await params;
  const q = getCodingQuestion(question);
  if (!q) notFound();

  const Content = CONTENT[question];
  if (!Content) notFound();

  const index = codingQuestions.findIndex((item) => item.slug === question);
  const prev = codingQuestions[index - 1];
  const next = codingQuestions[index + 1];

  return (
    <article className="flex gap-10">
      <div className="min-w-0 flex-1">
        <Link
          href="/topics/coding-questions"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          All questions
        </Link>

        <div className="mt-6">
          <Content />
        </div>

        <div className="mt-10 flex items-center justify-between gap-4 border-t border-zinc-100 pt-6 dark:border-zinc-800">
          {prev ? (
            <Link
              href={`/topics/coding-questions/${prev.slug}`}
              className="group flex min-w-0 items-center gap-1.5 text-sm text-zinc-600 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400"
            >
              <ArrowLeft className="h-4 w-4 shrink-0" />
              <span className="truncate">{prev.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/topics/coding-questions/${next.slug}`}
              className="group flex min-w-0 items-center gap-1.5 text-right text-sm text-zinc-600 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400"
            >
              <span className="truncate">{next.title}</span>
              <ArrowRight className="h-4 w-4 shrink-0" />
            </Link>
          ) : (
            <span />
          )}
        </div>
      </div>

      <aside className="sticky top-20 hidden h-fit w-44 shrink-0 xl:block">
        <QuestionsRail />
      </aside>
    </article>
  );
}
