import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { topics, categories } from "@/data/topics";
import { TopicCard } from "@/components/topic-card";
import { HeroUrlBar } from "@/components/animations/hero-url-bar";

export default function Home() {
  return (
    <main className="flex-1">
      <section className="mx-auto flex max-w-6xl flex-col items-start gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:flex-row lg:items-center">
        <div className="max-w-xl">
          <p className="text-sm font-medium uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            Frontend interview prep
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-50">
            Frontend, under the hood.
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            The concepts interviewers actually probe — networking, the
            browser, rendering, performance — explained with animated
            diagrams instead of walls of text.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/topics/url-to-enter"
              className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-500"
            >
              Start with topic one
              <ArrowRight className="h-4 w-4" />
            </Link>
            <span className="text-sm text-zinc-500 dark:text-zinc-500">
              What happens when you hit Enter?
            </span>
          </div>
        </div>
        <div className="flex w-full justify-center lg:justify-end">
          <HeroUrlBar />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Topics
          </h2>
          <span className="text-sm text-zinc-500 dark:text-zinc-500">
            {topics.filter((t) => t.status === "published").length} published
            &middot; {topics.length} planned
          </span>
        </div>

        <div className="mt-6 space-y-10">
          {categories.map((category) => (
            <div key={category}>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-500">
                {category}
              </h3>
              <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {topics
                  .filter((t) => t.category === category)
                  .map((topic) => (
                    <TopicCard key={topic.slug} topic={topic} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
