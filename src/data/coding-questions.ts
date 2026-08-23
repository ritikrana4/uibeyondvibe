export interface CodingQuestion {
  slug: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  tags: string[];
}

// Append here — and add a matching component under
// src/content/coding-questions/questions/ — whenever a new question is
// added. This list drives the checklist page, the per-question sidebar,
// and prev/next navigation.
export const codingQuestions: CodingQuestion[] = [
  {
    slug: "memoize",
    title: "Memoize a Function",
    difficulty: "Medium",
    tags: ["Closures", "Caching"],
  },
  {
    slug: "dom-finder",
    title: "DOM Finder",
    difficulty: "Medium",
    tags: ["DOM Traversal", "Recursion"],
  },
  {
    slug: "flatten-array",
    title: "Flatten an Array",
    difficulty: "Easy",
    tags: ["Recursion", "Arrays"],
  },
  {
    slug: "flatten-object",
    title: "Flatten a Nested Object",
    difficulty: "Medium",
    tags: ["Recursion", "Objects"],
  },
  {
    slug: "promise-all",
    title: "Implement Promise.all",
    difficulty: "Hard",
    tags: ["Promises", "Async"],
  },
];

export function getCodingQuestion(slug: string) {
  return codingQuestions.find((q) => q.slug === slug);
}
