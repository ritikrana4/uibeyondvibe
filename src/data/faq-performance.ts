import type { FaqItem } from "./faq";

export const performanceFaqCategories = [
  "Core Web Vitals",
  "Rendering Strategies",
  "Loading Performance",
  "Bundle & Network",
  "Runtime Performance",
  "Memory",
  "Measuring & Tools",
  "React & Rendering",
];

export const performanceFaqs: FaqItem[] = [
  // Core Web Vitals
  {
    id: "cwv-three",
    category: "Core Web Vitals",
    q: "What are the three Core Web Vitals, and what does each measure?",
    a: "LCP (Largest Contentful Paint): how long until the biggest visible element renders — a proxy for perceived load speed. INP (Interaction to Next Paint): how long the page takes to visibly respond to a user's interaction — a proxy for responsiveness. CLS (Cumulative Layout Shift): how much visible content unexpectedly moves around — a proxy for visual stability.",
  },
  {
    id: "fid-vs-inp",
    category: "Core Web Vitals",
    q: "What replaced FID, and why?",
    a: "INP replaced First Input Delay in March 2024. FID only measured the delay before the browser could start processing the first interaction — it said nothing about how long the processing itself took, or when the next frame actually painted. INP measures the full interaction, from input to the next paint, across the whole page's lifetime, not just the first click.",
  },
  {
    id: "lcp-element",
    category: "Core Web Vitals",
    q: "What actually counts as 'the LCP element'?",
    a: "The largest visible content element rendered in the viewport before the user interacts — typically a hero image, a background image, a large block of text, or a video poster frame. The browser keeps re-evaluating this as new, larger elements paint, and LCP is reported once nothing bigger shows up before the page settles.",
  },
  {
    id: "cls-formula",
    category: "Core Web Vitals",
    q: "How is CLS actually calculated?",
    a: "Each unexpected shift's score is impact fraction × distance fraction — how much of the viewport was affected, multiplied by how far it moved as a fraction of the viewport. Individual shift scores within a short time window get summed into 'session windows', and CLS is the worst session window on the page.",
  },
  {
    id: "cls-causes",
    category: "Core Web Vitals",
    q: "What are the most common causes of layout shift, and how do you prevent them?",
    a: "Images or ads without reserved dimensions (fix: always set width/height or aspect-ratio), web fonts swapping in and reflowing text (fix: font-display: optional or matching fallback metrics), and content injected above existing content, like a cookie banner or promo (fix: reserve the space up front instead of pushing content down).",
  },
  {
    id: "lab-vs-field",
    category: "Core Web Vitals",
    q: "Are Core Web Vitals measured in the lab or in the field?",
    a: "Both, and they can disagree. Lab data comes from a controlled run (Lighthouse, WebPageTest) — reproducible, great for debugging, but it's one simulated session. Field data comes from real users' browsers (Chrome's CrUX dataset) — messier, but it's what search ranking actually uses, since it reflects real devices and real networks.",
  },

  // Rendering Strategies
  {
    id: "csr-vs-ssr-vs-ssg",
    category: "Rendering Strategies",
    q: "CSR vs. SSR vs. SSG — how do you actually decide?",
    a: "SSG for content that's the same for every visitor and doesn't change often (marketing pages, blog posts) — it's pre-built once and served instantly from a CDN, which is as fast as it gets. SSR for content that's personalized or too dynamic to pre-build (a logged-in dashboard) but still benefits from arriving as real HTML. CSR for highly interactive, behind-a-login apps where SEO and first paint matter less than the app experience once it's loaded.",
  },
  {
    id: "hydration",
    category: "Rendering Strategies",
    q: "What is hydration, and why can it hurt INP?",
    a: "Hydration is the client re-running your component code against server-rendered HTML that's already on the screen — rebuilding internal state and attaching event listeners, without re-creating the DOM. The page can look fully loaded while this is happening, but clicks won't do anything yet — and a large JS bundle means a long task right when a user is most likely to try interacting, which is exactly what inflates INP.",
  },
  {
    id: "isr",
    category: "Rendering Strategies",
    q: "What is Incremental Static Regeneration (ISR)?",
    a: "A middle ground between SSR and SSG: pages are statically generated like SSG, but the framework can regenerate a page in the background after a set time or on demand — so you get SSG's speed without content being frozen forever at build time.",
  },
  {
    id: "islands-resumability",
    category: "Rendering Strategies",
    q: "What are 'islands architecture' and 'resumability'?",
    a: "Islands architecture (popularized by Astro) hydrates only the individual interactive components on a page and ships zero JS for the static rest, instead of hydrating the whole tree. Resumability (Qwik's approach) goes further — it skips the 're-run all your component logic' step of hydration entirely, by serializing enough state that the client can resume exactly where the server left off.",
  },
  {
    id: "hydration-mismatch",
    category: "Rendering Strategies",
    q: "What causes a 'hydration mismatch'?",
    a: "The HTML the server rendered doesn't match what the client renders on its own — common causes are using Date.now() or Math.random() during render, or touching a browser-only API like window while server-rendering. The framework detects the DOM doesn't match its expected output, causing warnings, a visible flash, or a forced client-side re-render that throws away the server's work.",
  },

  // Loading Performance
  {
    id: "resource-hints-recap",
    category: "Loading Performance",
    q: "preload vs. prefetch vs. preconnect vs. dns-prefetch — quick recap?",
    a: "dns-prefetch: resolve DNS early. preconnect: DNS + TCP + TLS early. preload: fetch a specific resource this page needs right now, at high priority. prefetch: fetch a resource a likely future navigation will need, at low priority. There's also a fetchpriority attribute to hint the browser's own request priority without a separate <link>.",
  },
  {
    id: "lazy-loading-caveat",
    category: "Loading Performance",
    q: "What does loading=\"lazy\" do, and when should you avoid it?",
    a: "It tells the browser not to fetch an image or iframe until it's near the viewport — great for below-the-fold content. Avoid it on your LCP candidate (usually a hero image): lazy-loading it delays the very metric you're trying to optimize, since the browser won't even start fetching it until layout tells it the image is close to view.",
  },
  {
    id: "srcset-sizes",
    category: "Loading Performance",
    q: "What do srcset and sizes actually do?",
    a: "srcset gives the browser several versions of an image at different resolutions; sizes tells it how much viewport width the image will actually occupy at different breakpoints. Together, the browser — not your JS — picks the smallest image that still looks sharp for the user's actual screen and pixel density.",
  },
  {
    id: "image-formats",
    category: "Loading Performance",
    q: "Why do WebP and AVIF matter for performance?",
    a: "They compress noticeably smaller than JPEG/PNG at equivalent visual quality — often 25-50% smaller — which directly helps LCP for image-heavy pages. Serve them with a <picture> element and a fallback for older browsers/formats.",
  },
  {
    id: "critical-css",
    category: "Loading Performance",
    q: "What is 'critical CSS'?",
    a: "The minimal CSS needed to render whatever's visible above the fold, inlined directly in <head> so the browser doesn't have to wait on a full external stylesheet round trip before it can paint anything. The rest of the CSS loads normally afterward, often via a non-blocking pattern.",
  },
  {
    id: "font-loading",
    category: "Loading Performance",
    q: "How do web fonts hurt performance, and how do you mitigate it?",
    a: "Two failure modes: FOIT (flash of invisible text — the browser hides text until the font loads) and FOUT (flash of unstyled text — a fallback shows, then swaps, which can trigger a layout shift). font-display: swap trades FOIT for FOUT; font-display: optional skips the swap entirely if the font isn't ready fast enough. Preloading the critical font file and using a variable font (one file, many weights) both help too.",
  },
  {
    id: "render-vs-parser-blocking",
    category: "Loading Performance",
    q: "Render-blocking vs. parser-blocking — what's the difference?",
    a: "A parser-blocking resource (a synchronous <script>) pauses HTML parsing itself. A render-blocking resource (CSS) doesn't stop parsing, but stops the page from painting anything until it's loaded, because the browser can't build a render tree without the CSSOM.",
  },

  // Bundle & Network
  {
    id: "code-splitting",
    category: "Bundle & Network",
    q: "What is code splitting, and how does it actually help?",
    a: "Breaking one giant JS bundle into smaller chunks loaded on demand — a route's code only downloads when a user navigates there, instead of everyone paying for the entire app upfront. Smaller initial bundles mean less JS to parse and execute before the page is interactive.",
  },
  {
    id: "tree-shaking",
    category: "Bundle & Network",
    q: "What is tree shaking, and what does it need to work?",
    a: "A build step that removes exported code nobody actually imports. It relies on static analysis of ES module import/export syntax (not CommonJS require, which is dynamic and opaque to bundlers), and on a library correctly marking itself side-effect-free in package.json so the bundler knows it's safe to drop unused pieces.",
  },
  {
    id: "gzip-vs-brotli",
    category: "Bundle & Network",
    q: "Gzip vs. Brotli — what's the practical difference?",
    a: "Brotli generally compresses 15-25% smaller than gzip for text assets (JS, CSS, HTML) at similar or better speed, because it ships with a built-in dictionary tuned for web content. Almost all modern browsers and CDNs support it — there's rarely a reason not to prefer it when both ends support it.",
  },
  {
    id: "cdn-role",
    category: "Bundle & Network",
    q: "What does a CDN actually buy you beyond 'a server that's closer'?",
    a: "Lower latency from edge locations, yes — but also: TLS termination closer to the user (fewer round trips for the handshake), HTTP/2 or HTTP/3 support even if your origin doesn't have it, built-in caching that offloads your origin entirely for static assets, and often DDoS protection.",
  },
  {
    id: "http2-fewer-requests",
    category: "Bundle & Network",
    q: "Why does 'reduce the number of requests' matter less than it used to?",
    a: "Old advice (spriting images, concatenating every JS file into one) was a workaround for HTTP/1.1's connection limits and per-request overhead. HTTP/2's multiplexing lets many requests share one connection efficiently, so aggressive bundling can actually hurt — smaller, cacheable, parallelizable chunks are often better now.",
  },

  // Runtime Performance
  {
    id: "debounce-vs-throttle",
    category: "Runtime Performance",
    q: "Debounce vs. throttle — what's the actual difference?",
    a: "Debounce waits for a pause in events and only then fires once (great for a search-as-you-type input — wait until the user stops typing). Throttle fires at most once per fixed interval no matter how many events come in (great for a scroll handler — you want regular updates, not silence until it stops).",
  },
  {
    id: "long-task",
    category: "Runtime Performance",
    q: "What is a 'long task', and why does it matter for INP?",
    a: "Any task on the main thread running longer than 50ms. While it runs, the browser can't respond to input or paint a frame — so a long task sitting between a click and the next paint directly inflates INP. Breaking up long synchronous work (e.g. with scheduler.yield() or chunking) keeps the main thread free to respond.",
  },
  {
    id: "raf-vs-settimeout",
    category: "Runtime Performance",
    q: "Why use requestAnimationFrame instead of setTimeout for animation?",
    a: "rAF schedules your callback to run right before the browser's next repaint, synced to the display's actual refresh rate — smoother, and it automatically pauses in background tabs (saving battery/CPU). setTimeout runs on a fixed timer with no awareness of the paint cycle, easily causing dropped or misaligned frames.",
  },
  {
    id: "virtualization",
    category: "Runtime Performance",
    q: "What is list virtualization, and when do you need it?",
    a: "Rendering only the DOM nodes currently visible in a scrollable list (plus a small buffer), instead of every item — a 10,000-row list becomes maybe 20 real DOM nodes at a time, recycled as the user scrolls. Reach for it once a list is long enough that full rendering causes janky scrolling or a slow initial render.",
  },
  {
    id: "web-workers",
    category: "Runtime Performance",
    q: "When would you reach for a Web Worker?",
    a: "Whenever you have real CPU-bound work — parsing a huge JSON blob, image processing, complex calculations — that would otherwise block the main thread and freeze the UI. A worker runs on a separate thread with no DOM access, communicating back via postMessage, so the main thread stays free to handle input and paint.",
  },

  // Memory
  {
    id: "memory-leak-sources",
    category: "Memory",
    q: "What are the most common sources of memory leaks in a web app?",
    a: "Forgotten event listeners or timers that keep a reference alive after a component unmounts, global variables or caches that grow unbounded, closures that unintentionally capture large objects, and detached DOM nodes still referenced from JS after being removed from the page.",
  },
  {
    id: "detached-dom",
    category: "Memory",
    q: "What's a 'detached DOM node', and how does it leak memory?",
    a: "A DOM element that's been removed from the document tree, but is still referenced somewhere in JS (a variable, a closure, an event listener registered on it). The garbage collector can't reclaim it because something still points to it, even though it's no longer visible or part of the page.",
  },
  {
    id: "diagnose-leak",
    category: "Memory",
    q: "How would you actually diagnose a memory leak in the browser?",
    a: "Chrome DevTools' Memory tab: take a heap snapshot, perform the suspected leaking action several times, take another snapshot, and compare — look for object counts (especially detached nodes) that keep growing instead of returning to baseline. The Performance tab's memory timeline can also show a sawtooth (healthy GC) vs. a steady climb (leak).",
  },

  // Measuring & Tools
  {
    id: "lighthouse-vs-rum",
    category: "Measuring & Tools",
    q: "Lighthouse vs. real user monitoring (RUM) — why do you need both?",
    a: "Lighthouse runs a single simulated session under controlled conditions — reproducible and great for catching regressions in CI, but it's not real users. RUM collects metrics from actual visitors' actual devices and networks, which is what your users really experience — but it's noisy and reactive rather than preventive. Use Lighthouse to prevent regressions, RUM to know what's really happening.",
  },
  {
    id: "performance-observer",
    category: "Measuring & Tools",
    q: "What is the PerformanceObserver API used for?",
    a: "A browser API to subscribe to performance entries as they happen — paint timing, layout shifts, long tasks, resource timing — without polling. It's what the web-vitals JS library (and most RUM tooling) is built on top of, to report real Core Web Vitals from real page loads.",
  },
  {
    id: "crux",
    category: "Measuring & Tools",
    q: "What is CrUX, and how is it different from Lighthouse?",
    a: "The Chrome User Experience Report — real, aggregated field data collected from opted-in Chrome users worldwide. Unlike Lighthouse's single lab run, CrUX reflects an actual distribution of real devices and connections, and it's the field dataset Google uses for the Core Web Vitals ranking signal.",
  },
  {
    id: "legacy-metrics",
    category: "Measuring & Tools",
    q: "What happened to Time to Interactive (TTI), Total Blocking Time (TBT), and Speed Index?",
    a: "They're still reported by Lighthouse and still useful for lab debugging — TBT in particular correlates closely with INP. But Core Web Vitals (LCP, INP, CLS) are the metrics Google actually collects as field data and uses for search ranking, so they get top billing now.",
  },

  // React & Rendering
  {
    id: "memo-usememo-usecallback",
    category: "React & Rendering",
    q: "What do React.memo, useMemo, and useCallback each actually prevent?",
    a: "React.memo skips re-rendering a component if its props haven't changed. useMemo skips recomputing an expensive value if its dependencies haven't changed. useCallback skips creating a new function reference on every render — mostly useful so a memoized child doesn't see 'changed' props just because a new function was created.",
  },
  {
    id: "key-prop-perf",
    category: "React & Rendering",
    q: "Why does the key prop matter for list rendering performance?",
    a: "React uses keys to match list items across renders and decide what to reuse vs. recreate. A stable, unique key (an ID) lets React patch just the items that changed. Using the array index as a key on a reorderable list can make React reuse the wrong DOM node for the wrong data, causing extra re-renders and subtle bugs.",
  },
];
