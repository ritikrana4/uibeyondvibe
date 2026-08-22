# Frontend, Under the Hood

A frontend interview-prep site: each topic is explained with animated,
interactive diagrams instead of walls of text.

**Topic one:** [What happens when you type a URL and hit Enter?](src/content/url-to-enter/article.tsx)
— URL parsing, browser preflight checks, DNS resolution, the TCP and TLS
handshakes, the HTTP request/response, server-side processing, the critical
rendering path, script loading (`async`/`defer`), and 30+ related interview
questions.

## Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/) for every animation
- [next-themes](https://github.com/pacocoursey/next-themes) for dark/light mode

## Running locally

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Adding a new topic

1. Add an entry to [`src/data/topics.ts`](src/data/topics.ts) with
   `status: "published"`.
2. Create a content folder under `src/content/<slug>/` (copy the structure of
   `src/content/url-to-enter/` as a starting point: `article.tsx`,
   `sections-meta.ts`, `table-of-contents.tsx`).
3. Register the article component in the `CONTENT` map in
   [`src/app/topics/[slug]/page.tsx`](<src/app/topics/[slug]/page.tsx>).
4. Build any new animated diagrams as their own component under
   `src/components/animations/`, wrapped in `<AnimationCard>` — reuse
   `useStepSequence` (in `src/hooks/`) for scroll-triggered, replayable,
   step-by-step reveals.

Until step 2–3 are done, a topic marked `published` in the data file with no
matching entry in the `CONTENT` map automatically renders a "coming soon"
placeholder, so the sidebar/home page can list future topics ahead of time.
