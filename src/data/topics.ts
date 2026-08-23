export interface Topic {
  slug: string;
  title: string;
  description: string;
  category: string;
  status: "published" | "coming-soon";
  readingTime?: string;
}

export const topics: Topic[] = [
  {
    slug: "url-to-enter",
    title: "Type a URL, Hit Enter",
    description:
      "URL parsing, DNS resolution, TCP + TLS handshakes, the HTTP round trip, and the full browser rendering pipeline — animated step by step.",
    category: "Networking & Browsers",
    status: "published",
    readingTime: "22 min",
  },
  {
    slug: "communication-patterns",
    title: "REST, WebSockets & Streams",
    description:
      "REST APIs, short/long polling, Server-Sent Events, WebSockets, webhooks, and HTTP streaming — how clients and servers actually talk, animated and compared.",
    category: "APIs & Real-Time",
    status: "published",
    readingTime: "24 min",
  },
  {
    slug: "event-loop",
    title: "The JavaScript Event Loop",
    description:
      "Call stack, task queue, microtasks, and how async code actually gets scheduled.",
    category: "JavaScript",
    status: "coming-soon",
  },
  {
    slug: "virtual-dom",
    title: "Virtual DOM & Reconciliation",
    description:
      "Why frameworks diff trees instead of touching the real DOM directly, and how keys change everything.",
    category: "Frameworks",
    status: "coming-soon",
  },
  {
    slug: "css-box-model",
    title: "The CSS Box Model & Layout",
    description:
      "Box-sizing, block formatting contexts, and why margins collapse when you least expect it.",
    category: "CSS",
    status: "coming-soon",
  },
  {
    slug: "http-caching",
    title: "HTTP Caching Strategies",
    description:
      "Cache-Control, ETags, CDNs, and the difference between a 304 and a cache hit.",
    category: "Networking & Browsers",
    status: "coming-soon",
  },
  {
    slug: "web-performance",
    title: "Core Web Vitals & Performance",
    description:
      "LCP, INP, and CLS broken down, plus loading, bundle, runtime, and memory optimization — animated, with the metrics that back each one up.",
    category: "Performance",
    status: "published",
    readingTime: "26 min",
  },
  {
    slug: "coding-questions",
    title: "Coding Interview Questions",
    description:
      "Classic hands-on JavaScript problems — implement it yourself, then walk through the approach, a working solution, and the follow-ups interviewers actually ask. A growing list, one question at a time.",
    category: "Coding Challenges",
    status: "published",
    readingTime: "40 min so far",
  },
];

export const categories = Array.from(new Set(topics.map((t) => t.category)));

export function getTopic(slug: string) {
  return topics.find((t) => t.slug === slug);
}
