import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTopic, topics } from "@/data/topics";
import { ComingSoon } from "@/components/coming-soon";
import { UrlToEnterArticle } from "@/content/url-to-enter/article";
import { CommunicationPatternsArticle } from "@/content/communication-patterns/article";
import { WebPerformanceArticle } from "@/content/web-performance/article";

const CONTENT: Record<string, React.ComponentType> = {
  "url-to-enter": UrlToEnterArticle,
  "communication-patterns": CommunicationPatternsArticle,
  "web-performance": WebPerformanceArticle,
};

export function generateStaticParams() {
  // "coding-questions" has its own dedicated list + [question] routes
  // (see src/app/topics/coding-questions/) and is excluded here so this
  // catch-all doesn't try to statically generate a competing page at the
  // same URL.
  return topics.filter((t) => t.slug !== "coding-questions").map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const topic = getTopic(slug);
  if (!topic) return {};
  return { title: `${topic.title} — Frontend, Under the Hood`, description: topic.description };
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const topic = getTopic(slug);
  if (!topic) notFound();

  const Content = CONTENT[slug];
  if (!Content) return <ComingSoon topic={topic} />;

  return <Content />;
}
